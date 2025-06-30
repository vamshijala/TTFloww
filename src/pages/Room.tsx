
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Mic, MicOff, Video, VideoOff, Monitor, Hand, MessageCircle, 
  PhoneOff, Users, Settings, PenTool, Upload, Download 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import VideoGrid from '@/components/VideoGrid';
import ChatPanel from '@/components/ChatPanel';
import WhiteboardCanvas from '@/components/WhiteboardCanvas';
import FileSharePanel from '@/components/FileSharePanel';
import { toast } from '@/hooks/use-toast';

type PanelType = 'chat' | 'whiteboard' | 'files' | null;

const Room = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [participants, setParticipants] = useState([
    { id: 1, name: 'You', isMuted: false, isVideoOff: false, isHost: true },
    { id: 2, name: 'Sarah Wilson', isMuted: false, isVideoOff: false, isHost: false },
    { id: 3, name: 'Mike Chen', isMuted: true, isVideoOff: false, isHost: false },
  ]);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    toast({
      description: isMuted ? "🎤 Microphone unmuted" : "🔇 You are muted",
    });
  };

  const handleVideoToggle = () => {
    setIsVideoOff(!isVideoOff);
    toast({
      description: isVideoOff ? "📹 Camera turned on" : "📹 Camera turned off",
    });
  };

  const handleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast({
      description: isScreenSharing ? "Screen sharing stopped" : "Screen sharing started",
    });
  };

  const handleRaiseHand = () => {
    setHandRaised(!handRaised);
    toast({
      description: handRaised ? "Hand lowered" : "✋ You raised your hand",
    });
  };

  const handleLeaveRoom = () => {
    navigate('/');
    toast({
      title: "Left meeting",
      description: `You have left room ${id}`,
    });
  };

  const togglePanel = (panel: PanelType) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Room Header */}
      <div className="absolute top-4 left-4 z-10">
        <Card className="bg-black/50 backdrop-blur-md border-gray-700">
          <CardContent className="p-3">
            <div className="flex items-center text-white">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium">Room {id}</span>
              <span className="text-xs text-gray-400 ml-2">• You are the host</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Participants Counter */}
      <div className="absolute top-4 right-4 z-10">
        <Card className="bg-black/50 backdrop-blur-md border-gray-700">
          <CardContent className="p-3">
            <div className="flex items-center text-white">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">{participants.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="flex h-screen">
        {/* Video Area */}
        <div className={`flex-1 ${activePanel ? 'mr-80' : ''} transition-all duration-300`}>
          <VideoGrid 
            participants={participants} 
            isScreenSharing={isScreenSharing}
          />
        </div>

        {/* Side Panel */}
        {activePanel && (
          <div className="w-80 bg-white border-l border-gray-200 absolute right-0 top-0 h-full z-20">
            {activePanel === 'chat' && <ChatPanel roomId={id || ''} />}
            {activePanel === 'whiteboard' && <WhiteboardCanvas />}
            {activePanel === 'files' && <FileSharePanel />}
          </div>
        )}
      </div>

      {/* Bottom Control Bar */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <Card className="bg-black/80 backdrop-blur-md border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              {/* Mute/Unmute */}
              <Button
                onClick={handleMuteToggle}
                size="lg"
                className={`w-12 h-12 rounded-full ${
                  isMuted 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-gray-600 hover:bg-gray-700'
                } text-white`}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>

              {/* Video Toggle */}
              <Button
                onClick={handleVideoToggle}
                size="lg"
                className={`w-12 h-12 rounded-full ${
                  isVideoOff 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-gray-600 hover:bg-gray-700'
                } text-white`}
              >
                {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </Button>

              {/* Screen Share */}
              <Button
                onClick={handleScreenShare}
                size="lg"
                className={`w-12 h-12 rounded-full ${
                  isScreenSharing 
                    ? 'bg-[#0066FF] hover:bg-[#0066FF]/90' 
                    : 'bg-gray-600 hover:bg-gray-700'
                } text-white`}
              >
                <Monitor className="w-5 h-5" />
              </Button>

              {/* Raise Hand */}
              <Button
                onClick={handleRaiseHand}
                size="lg"
                className={`w-12 h-12 rounded-full ${
                  handRaised 
                    ? 'bg-yellow-500 hover:bg-yellow-600' 
                    : 'bg-gray-600 hover:bg-gray-700'
                } text-white`}
              >
                <Hand className="w-5 h-5" />
              </Button>

              <div className="w-px h-8 bg-gray-600 mx-2"></div>

              {/* Chat */}
              <Button
                onClick={() => togglePanel('chat')}
                size="lg"
                className={`w-12 h-12 rounded-full ${
                  activePanel === 'chat' 
                    ? 'bg-[#0066FF] hover:bg-[#0066FF]/90' 
                    : 'bg-gray-600 hover:bg-gray-700'
                } text-white`}
              >
                <MessageCircle className="w-5 h-5" />
              </Button>

              {/* Whiteboard */}
              <Button
                onClick={() => togglePanel('whiteboard')}
                size="lg"
                className={`w-12 h-12 rounded-full ${
                  activePanel === 'whiteboard' 
                    ? 'bg-[#0066FF] hover:bg-[#0066FF]/90' 
                    : 'bg-gray-600 hover:bg-gray-700'
                } text-white`}
              >
                <PenTool className="w-5 h-5" />
              </Button>

              {/* Files */}
              <Button
                onClick={() => togglePanel('files')}
                size="lg"
                className={`w-12 h-12 rounded-full ${
                  activePanel === 'files' 
                    ? 'bg-[#0066FF] hover:bg-[#0066FF]/90' 
                    : 'bg-gray-600 hover:bg-gray-700'
                } text-white`}
              >
                <Upload className="w-5 h-5" />
              </Button>

              <div className="w-px h-8 bg-gray-600 mx-2"></div>

              {/* Leave Room */}
              <Button
                onClick={handleLeaveRoom}
                size="lg"
                className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white"
              >
                <PhoneOff className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-4">
        <div className="flex justify-center space-x-4">
          <Button
            onClick={handleMuteToggle}
            size="sm"
            className={`${isMuted ? 'bg-red-500' : 'bg-gray-600'} text-white rounded-full`}
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Button
            onClick={handleVideoToggle}
            size="sm"
            className={`${isVideoOff ? 'bg-red-500' : 'bg-gray-600'} text-white rounded-full`}
          >
            {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
          </Button>
          <Button
            onClick={() => togglePanel('chat')}
            size="sm"
            className="bg-gray-600 text-white rounded-full"
          >
            <MessageCircle className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleLeaveRoom}
            size="sm"
            className="bg-red-500 text-white rounded-full"
          >
            <PhoneOff className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Room;
