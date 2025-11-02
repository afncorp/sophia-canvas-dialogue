import { supabase } from "@/integrations/supabase/client";

export class AudioRecorder {
  private stream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private processor: ScriptProcessorNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;

  constructor(private onAudioData: (audioData: Float32Array) => void) {}

  async start() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      this.audioContext = new AudioContext({
        sampleRate: 24000,
      });
      
      this.source = this.audioContext.createMediaStreamSource(this.stream);
      this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);
      
      this.processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        this.onAudioData(new Float32Array(inputData));
      };
      
      this.source.connect(this.processor);
      this.processor.connect(this.audioContext.destination);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      throw error;
    }
  }

  stop() {
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

export class RealtimeChat {
  private pc: RTCPeerConnection | null = null;
  private dc: RTCDataChannel | null = null;
  private audioEl: HTMLAudioElement;

  constructor(private onMessage: (message: any) => void) {
    this.audioEl = document.createElement("audio");
    this.audioEl.autoplay = true;
    this.audioEl.setAttribute("playsinline", "true");
    this.audioEl.style.display = "none";
    document.body.appendChild(this.audioEl);
  }

  async init() {
    try {
      // Get ephemeral token from our Supabase Edge Function
      console.log("Getting ephemeral token...");
      const { data, error } = await supabase.functions.invoke("realtime-chat");
      
      if (error) {
        console.error("Edge function error:", error);
        throw error;
      }
      
      console.log("Edge function response:", data);
      
      if (!data?.client_secret?.value) {
        throw new Error("Failed to get ephemeral token from response");
      }

      const EPHEMERAL_KEY = data.client_secret.value;
      console.log("Ephemeral token received successfully");

      // Create peer connection
      this.pc = new RTCPeerConnection({
        iceServers: [
          { urls: ["stun:stun.l.google.com:19302", "stun:global.stun.twilio.com:3478"] }
        ]
      });

      // Set up remote audio - this is how we'll hear Sophia
      this.pc.ontrack = (e) => {
        console.log("Received remote audio track");
        this.audioEl.srcObject = e.streams[0];
        this.audioEl.play().catch(err => console.error("Error playing audio:", err));
      };

      // Add local audio track for microphone
      console.log("Requesting microphone access...");
      const ms = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        } 
      });
      this.pc.addTrack(ms.getTracks()[0]);
      console.log("Microphone track added");

      // Set up data channel for events
      this.dc = this.pc.createDataChannel("oai-events");
      
      this.dc.onopen = () => {
        console.log("Data channel opened");
      };
      
      this.dc.onmessage = (e) => {
        try {
          const event = JSON.parse(e.data);
          console.log("Received event:", event.type);
          this.onMessage(event);

          // After session is created, update session config to ensure correct audio formats & VAD
          if (event.type === "session.created") {
            const update = {
              type: "session.update",
              session: {
                modalities: ["audio", "text"],
                voice: "alloy",
                input_audio_format: "pcm16",
                output_audio_format: "pcm16",
                turn_detection: {
                  type: "server_vad",
                  threshold: 0.5,
                  prefix_padding_ms: 300,
                  silence_duration_ms: 1000,
                },
              },
            };
            try {
              this.dc?.send(JSON.stringify(update));
              console.log("Sent session.update");
            } catch (sendErr) {
              console.error("Failed to send session.update:", sendErr);
            }
          }
        } catch (err) {
          console.error("Error parsing data channel message:", err);
        }
      };

      this.dc.onerror = (err) => {
        console.error("Data channel error:", err);
      };

      // Create and set local description, then wait for ICE gathering to complete
      console.log("Creating offer...");
      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);
      console.log("Local description set, waiting for ICE gathering to complete...");

      // Wait for ICE gathering to complete, but fall back after 2 seconds
      const waitForIce = new Promise<void>((resolve) => {
        if (!this.pc) return resolve();

        const finish = () => {
          this.pc?.removeEventListener("icegatheringstatechange", onStateChange);
          resolve();
        };

        const onStateChange = () => {
          if (!this.pc) return finish();
          console.log("ICE state:", this.pc.iceGatheringState);
          if (this.pc.iceGatheringState === "complete") finish();
        };

        // Also resolve when the last candidate (null) is fired
        this.pc.onicecandidate = (e) => {
          if (!e.candidate) {
            console.log("ICE candidate gathering finished (null candidate)");
            finish();
          }
        };

        this.pc.addEventListener("icegatheringstatechange", onStateChange);

        // Fallback timeout: proceed with whatever we have
        setTimeout(() => {
          console.warn("ICE gathering timed out, proceeding with current localDescription");
          finish();
        }, 2000);
      });

      await waitForIce;
      
      const localDescription = this.pc.localDescription;
      if (!localDescription?.sdp) {
        throw new Error("Failed to gather ICE candidates");
      }

      // Connect to OpenAI's Realtime API
      const baseUrl = "https://api.openai.com/v1/realtime";
      const candidateModels = [
        "gpt-4o-realtime-preview",
        "gpt-4o-realtime-preview-2024-12-17",
      ];
      
      console.log("Connecting to OpenAI with ephemeral key...");
      let sdpResponse: Response | null = null;
      let selectedModel = "";
      
      for (const model of candidateModels) {
        try {
          console.log("Attempting realtime connect with model:", model);
          const resp = await fetch(`${baseUrl}?model=${model}`, {
            method: "POST",
            body: localDescription.sdp,
            headers: {
              Authorization: `Bearer ${EPHEMERAL_KEY}`,
              "Content-Type": "application/sdp"
            },
          });
          
          if (!resp.ok) {
            const errorText = await resp.text();
            console.warn("Realtime connect error:", resp.status, errorText);
            if (errorText.includes("model_not_found") || errorText.includes("does not exist")) {
              continue;
            }
            throw new Error(`OpenAI connection failed: ${resp.status} - ${errorText}`);
          }
          
          sdpResponse = resp;
          selectedModel = model;
          break;
        } catch (e) {
          console.warn("Realtime connect attempt failed for model:", model, e);
          continue;
        }
      }
      
      if (!sdpResponse) {
        throw new Error("Failed to connect to any realtime model candidate.");
      }
      
      const answerSdp = await sdpResponse.text();
      console.log("Received answer from OpenAI with model:", selectedModel);
      
      const answer: RTCSessionDescriptionInit = {
        type: "answer",
        sdp: answerSdp,
      };
      
      await this.pc.setRemoteDescription(answer);
      console.log("WebRTC connection established successfully!");

    } catch (error) {
      console.error("Error initializing chat:", error);
      throw error;
    }
  }

  async sendMessage(text: string) {
    if (!this.dc || this.dc.readyState !== 'open') {
      throw new Error('Data channel not ready');
    }

    const event = {
      type: 'conversation.item.create',
      item: {
        type: 'message',
        role: 'user',
        content: [
          {
            type: 'input_text',
            text
          }
        ]
      }
    };

    this.dc.send(JSON.stringify(event));
    this.dc.send(JSON.stringify({type: 'response.create'}));
  }

  disconnect() {
    console.log("Disconnecting...");
    if (this.dc) {
      this.dc.close();
      this.dc = null;
    }
    if (this.pc) {
      this.pc.close();
      this.pc = null;
    }
    if (this.audioEl.srcObject) {
      const tracks = (this.audioEl.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      this.audioEl.srcObject = null;
    }
  }
}
