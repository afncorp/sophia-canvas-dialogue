import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { RealtimeChat } from '@/utils/RealtimeAudioWebRTC';
import { Mic, MicOff } from 'lucide-react';

interface VoiceInterfaceProps {
  onSpeakingChange: (speaking: boolean) => void;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ onSpeakingChange }) => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<RealtimeChat | null>(null);

  const handleMessage = (event: any) => {
    console.log('Received message:', event);

    // Speaking indicators
    if (
      event.type === 'response.audio.delta' ||
      event.type === 'response.audio_transcript.delta' ||
      event.type === 'input_audio_buffer.speech_started'
    ) {
      onSpeakingChange(true);
      return;
    }
    if (
      event.type === 'response.audio.done' ||
      event.type === 'input_audio_buffer.speech_stopped' ||
      event.type === 'response.done'
    ) {
      onSpeakingChange(false);
    }

    // Error handling
    if (event.type === 'conversation.item.input_audio_transcription.failed') {
      const msg =
        event?.error?.message?.includes('429')
          ? 'Rate limited. Please wait a few seconds and try again.'
          : event?.error?.message || 'Transcription failed.';
      toast({
        title: 'Voice not captured',
        description: msg,
        variant: 'destructive',
      });
      return;
    }

    if (event.type === 'response.done' && event?.response?.status === 'failed') {
      const code = event?.response?.status_details?.error?.code;
      const message = event?.response?.status_details?.error?.message || 'The assistant could not respond.';
      toast({
        title: code === 'model_not_found' ? 'Voice model unavailable' : 'Voice response failed',
        description: code === 'model_not_found'
          ? 'Model not available. Please try again in a moment.'
          : message,
        variant: 'destructive',
      });
    }
  };

  const startConversation = async () => {
    try {
      setIsLoading(true);
      
      chatRef.current = new RealtimeChat(handleMessage);
      await chatRef.current.init();
      
      setIsConnected(true);
      setIsLoading(false);
      
      toast({
        title: "Connected",
        description: "You can now speak with Sophia",
      });
    } catch (error) {
      console.error('Error starting conversation:', error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to start conversation',
        variant: "destructive",
      });
    }
  };

  const endConversation = () => {
    chatRef.current?.disconnect();
    setIsConnected(false);
    onSpeakingChange(false);
    
    toast({
      title: "Disconnected",
      description: "Voice conversation ended",
    });
  };

  useEffect(() => {
    return () => {
      chatRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {!isConnected ? (
        <Button 
          onClick={startConversation}
          disabled={isLoading}
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg"
        >
          <Mic className="h-6 w-6" />
        </Button>
      ) : (
        <Button 
          onClick={endConversation}
          size="lg"
          variant="destructive"
          className="rounded-full w-16 h-16 shadow-lg animate-pulse"
        >
          <MicOff className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default VoiceInterface;
