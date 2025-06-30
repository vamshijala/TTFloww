
import React, { useState } from 'react';
import { Send, Smile, Hand, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: number;
  sender: string;
  message: string;
  timestamp: string;
  type: 'message' | 'system' | 'reaction';
}

interface ChatPanelProps {
  roomId: string;
}

const ChatPanel = ({ roomId }: ChatPanelProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'System',
      message: 'Welcome to TeamFlow! Start collaborating.',
      timestamp: '2:00 PM',
      type: 'system'
    },
    {
      id: 2,
      sender: 'Sarah Wilson',
      message: 'Hey everyone! Ready for the design review?',
      timestamp: '2:01 PM',
      type: 'message'
    },
    {
      id: 3,
      sender: 'Mike Chen',
      message: 'Yes! I have the mockups ready to share.',
      timestamp: '2:02 PM',
      type: 'message'
    },
    {
      id: 4,
      sender: 'You',
      message: 'Perfect! Let me share my screen.',
      timestamp: '2:02 PM',
      type: 'message'
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    if (message.length > 500) {
      toast({
        title: "Message too long",
        description: "Maximum 500 characters allowed",
        variant: "destructive"
      });
      return;
    }

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'You',
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'message'
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRaiseHand = () => {
    const handMessage: Message = {
      id: messages.length + 1,
      sender: 'You',
      message: '✋ raised their hand',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'reaction'
    };
    setMessages([...messages, handMessage]);
    toast({
      description: "✋ You raised your hand",
    });
  };

  const reactions = ['👍', '❤️', '😂', '👏', '🔥'];

  const handleReaction = (emoji: string) => {
    const reactionMessage: Message = {
      id: messages.length + 1,
      sender: 'You',
      message: `${emoji} reacted`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'reaction'
    };
    setMessages([...messages, reactionMessage]);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Chat</h2>
        <p className="text-sm text-gray-500">Room {roomId}</p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`${msg.type === 'system' ? 'text-center' : ''}`}>
              {msg.type === 'system' ? (
                <div className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1 inline-block">
                  {msg.message}
                </div>
              ) : (
                <div className={`${msg.sender === 'You' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    msg.sender === 'You' 
                      ? 'bg-[#0066FF] text-white' 
                      : msg.type === 'reaction'
                      ? 'bg-yellow-100 text-gray-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {msg.sender !== 'You' && msg.type === 'message' && (
                      <p className="text-xs font-medium mb-1 opacity-75">{msg.sender}</p>
                    )}
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Quick Reactions */}
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex space-x-2 justify-center">
          {reactions.map((emoji) => (
            <Button
              key={emoji}
              variant="ghost"
              size="sm"
              onClick={() => handleReaction(emoji)}
              className="text-lg hover:scale-110 transition-transform duration-200"
            >
              {emoji}
            </Button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2 mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRaiseHand}
            className="text-gray-600 hover:text-[#0066FF]"
          >
            <Hand className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-[#0066FF]"
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-[#0066FF]"
          >
            <Smile className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Input
            placeholder="Say hello 👋 or share a file..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 rounded-2xl border-2 border-gray-200 focus:border-[#0066FF]"
            maxLength={500}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="bg-[#0066FF] hover:bg-[#0066FF]/90 text-white rounded-2xl px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 mt-1 text-right">
          {message.length}/500
        </p>
      </div>
    </div>
  );
};

export default ChatPanel;
