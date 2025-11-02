import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { headers } = req;
  const upgradeHeader = headers.get("upgrade") || "";

  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket connection", { status: 400 });
  }

  console.log("Upgrading to WebSocket connection...");
  const { socket, response } = Deno.upgradeWebSocket(req);
  
  let openAISocket: WebSocket | null = null;

  socket.onopen = async () => {
    console.log("Client connected");
    
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY not found");
      socket.send(JSON.stringify({ type: "error", error: "Server configuration error" }));
      socket.close();
      return;
    }

    try {
      const model = "gpt-4o-realtime-preview-2024-10-01";
      console.log("Connecting to OpenAI Realtime API...");
      
      openAISocket = new WebSocket(
        `wss://api.openai.com/v1/realtime?model=${model}`,
        {
          headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
            "OpenAI-Beta": "realtime=v1",
          },
        }
      );

      openAISocket.onopen = () => {
        console.log("Connected to OpenAI Realtime API");
      };

      openAISocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("OpenAI event:", data.type);
          
          // Send session update after receiving session.created
          if (data.type === "session.created") {
            console.log("Session created, sending configuration...");
            const sessionUpdate = {
              type: "session.update",
              session: {
                modalities: ["text", "audio"],
                instructions: "You are Sophia, a friendly and knowledgeable mortgage loan officer assistant. Help users understand different loan types, calculate affordability, and guide them through the mortgage process. Be warm, professional, and clear in your explanations.",
                voice: "alloy",
                input_audio_format: "pcm16",
                output_audio_format: "pcm16",
                input_audio_transcription: {
                  model: "whisper-1"
                },
                turn_detection: {
                  type: "server_vad",
                  threshold: 0.5,
                  prefix_padding_ms: 300,
                  silence_duration_ms: 1000
                },
                temperature: 0.8,
                max_response_output_tokens: "inf"
              }
            };
            openAISocket?.send(JSON.stringify(sessionUpdate));
            console.log("Session update sent");
          }
          
          // Forward all events to client
          socket.send(JSON.stringify(data));
        } catch (error) {
          console.error("Error processing OpenAI message:", error);
        }
      };

      openAISocket.onerror = (error) => {
        console.error("OpenAI WebSocket error:", error);
        socket.send(JSON.stringify({ type: "error", error: "OpenAI connection error" }));
      };

      openAISocket.onclose = () => {
        console.log("OpenAI connection closed");
        socket.close();
      };

    } catch (error) {
      console.error("Error connecting to OpenAI:", error);
      socket.send(JSON.stringify({ type: "error", error: "Failed to connect to OpenAI" }));
      socket.close();
    }
  };

  socket.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      console.log("Client message:", message.type);
      
      if (openAISocket && openAISocket.readyState === WebSocket.OPEN) {
        openAISocket.send(JSON.stringify(message));
      } else {
        console.error("OpenAI socket not ready");
      }
    } catch (error) {
      console.error("Error processing client message:", error);
    }
  };

  socket.onerror = (error) => {
    console.error("Client WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("Client disconnected");
    if (openAISocket) {
      openAISocket.close();
    }
  };

  return response;
});
