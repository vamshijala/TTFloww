
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Crown } from 'lucide-react';

interface Participant {
  id: number;
  name: string;
  isMuted: boolean;
  isVideoOff: boolean;
  isHost: boolean;
}

interface VideoGridProps {
  participants: Participant[];
  isScreenSharing: boolean;
}

const VideoGrid = ({ participants, isScreenSharing }: VideoGridProps) => {
  const gridCols = participants.length <= 1 ? 'grid-cols-1' : 
                   participants.length <= 4 ? 'grid-cols-2' : 
                   participants.length <= 9 ? 'grid-cols-3' : 'grid-cols-4';

  if (isScreenSharing) {
    return (
      <div className="h-full p-4 flex flex-col">
        {/* Screen Share View */}
        <div className="flex-1 mb-4">
          <Card className="h-full bg-gray-800 border-gray-700">
            <CardContent className="h-full p-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-24 h-24 bg-[#0066FF] rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🖥️</span>
                </div>
                <p className="text-lg font-medium">Screen sharing is active</p>
                <p className="text-gray-400">You are sharing your screen</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Small participant thumbnails */}
        <div className="flex space-x-2 h-24">
          {participants.slice(0, 6).map((participant) => (
            <Card key={participant.id} className="w-32 bg-gray-800 border-gray-700 relative overflow-hidden">
              <CardContent className="p-0 h-full">
                <div className="h-full bg-gradient-to-br from-[#0066FF]/20 to-purple-600/20 flex items-center justify-center relative">
                  <div className="w-8 h-8 bg-[#0066FF] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {participant.name.charAt(0)}
                  </div>
                  
                  {/* Mute indicator */}
                  <div className="absolute bottom-1 left-1">
                    {participant.isMuted ? (
                      <MicOff className="w-3 h-3 text-red-400" />
                    ) : (
                      <Mic className="w-3 h-3 text-green-400" />
                    )}
                  </div>

                  {/* Host crown */}
                  {participant.isHost && (
                    <div className="absolute top-1 right-1">
                      <Crown className="w-3 h-3 text-yellow-400" />
                    </div>
                  )}

                  {/* Name label */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs px-1 py-0.5 truncate">
                    {participant.name}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-4">
      <div className={`grid ${gridCols} gap-4 h-full`}>
        {participants.map((participant) => (
          <Card key={participant.id} className="bg-gray-800 border-gray-700 relative overflow-hidden group hover:scale-105 transition-transform duration-200">
            <CardContent className="p-0 h-full">
              <div className="h-full bg-gradient-to-br from-[#0066FF]/20 to-purple-600/20 flex items-center justify-center relative">
                {/* Avatar */}
                <div className="w-16 h-16 md:w-24 md:h-24 bg-[#0066FF] rounded-full flex items-center justify-center text-white text-xl md:text-3xl font-bold">
                  {participant.name.charAt(0)}
                </div>
                
                {/* Speaking indicator */}
                <div className="absolute inset-0 border-4 border-green-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 animate-pulse"></div>
                
                {/* Mute indicator */}
                <div className="absolute bottom-4 left-4">
                  {participant.isMuted ? (
                    <div className="bg-red-500 rounded-full p-2">
                      <MicOff className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="bg-green-500 rounded-full p-2">
                      <Mic className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Host crown */}
                {participant.isHost && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-yellow-500 rounded-full p-2">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}

                {/* Name label */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white px-4 py-2">
                  <p className="font-medium truncate">{participant.name}</p>
                </div>

                {/* Camera off overlay */}
                {participant.isVideoOff && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-12 h-12 bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-2xl">📹</span>
                      </div>
                      <p className="text-sm">Camera off</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Waiting message */}
      {participants.length === 1 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-[#0066FF]/20 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
              <span className="text-2xl">👥</span>
            </div>
            <p className="text-xl font-medium mb-2">Waiting for others to join...</p>
            <p className="text-gray-400">Share the room code with your team</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
