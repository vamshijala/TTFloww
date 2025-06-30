
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Calendar, Users, Clock, HelpCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const Home = () => {
  const [meetingCode, setMeetingCode] = useState('');
  const navigate = useNavigate();

  const handleCreateMeeting = () => {
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    navigate(`/room/${roomId}`);
    toast({
      title: "Meeting Created",
      description: `Room ${roomId} is ready for collaboration`,
    });
  };

  const handleJoinMeeting = () => {
    if (!meetingCode.trim()) {
      toast({
        title: "Invalid meeting code",
        description: "Please enter a valid meeting code",
        variant: "destructive"
      });
      return;
    }
    
    if (meetingCode.length < 6 || meetingCode.length > 10) {
      toast({
        title: "Invalid meeting code",
        description: "Meeting code must be 6-10 characters",
        variant: "destructive"
      });
      return;
    }

    navigate(`/room/${meetingCode.toUpperCase()}`);
  };

  const upcomingMeetings = [
    {
      id: 1,
      title: "Product Strategy Review",
      time: "2:00 PM - 3:00 PM",
      participants: ["John", "Sarah", "Mike"],
      roomId: "ABC123"
    },
    {
      id: 2,
      title: "Design System Workshop",
      time: "4:30 PM - 5:30 PM",
      participants: ["Alex", "Emma"],
      roomId: "DEF456"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Start collaborating in seconds.
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Video calls, screen sharing, whiteboarding, and real-time messaging. 
            Everything your team needs to work together, beautifully designed.
          </p>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              onClick={handleCreateMeeting}
              size="lg"
              className="bg-[#0066FF] hover:bg-[#0066FF]/90 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Meeting
            </Button>
            
            <div className="flex gap-2 items-center">
              <Input
                placeholder="Enter meeting code"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
                className="w-48 h-12 rounded-2xl border-2 border-gray-200 focus:border-[#0066FF] text-center uppercase"
                maxLength={10}
              />
              <Button
                onClick={handleJoinMeeting}
                variant="outline"
                size="lg"
                className="h-12 px-6 rounded-2xl border-2 border-gray-200 hover:border-[#0066FF] hover:text-[#0066FF] transition-all duration-200"
              >
                Join
              </Button>
            </div>
          </div>

          <p className="text-gray-500 text-sm">
            Have a code? Join a room instantly.
          </p>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Upcoming Meetings */}
            <div className="lg:col-span-2">
              <Card className="rounded-2xl border-2 border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Calendar className="w-5 h-5 mr-2 text-[#0066FF]" />
                    Upcoming Meetings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingMeetings.map((meeting) => (
                    <div key={meeting.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{meeting.title}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {meeting.time}
                        </div>
                        <div className="flex items-center mt-2">
                          <Users className="w-4 h-4 mr-1 text-gray-500" />
                          <div className="flex -space-x-2">
                            {meeting.participants.map((participant, index) => (
                              <div
                                key={index}
                                className="w-6 h-6 bg-[#0066FF] text-white text-xs rounded-full flex items-center justify-center border-2 border-white"
                              >
                                {participant[0]}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => navigate(`/room/${meeting.roomId}`)}
                        size="sm"
                        className="bg-[#0066FF] hover:bg-[#0066FF]/90 text-white rounded-xl"
                      >
                        <Video className="w-4 h-4 mr-1" />
                        Join
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* User Profile Card */}
            <div className="space-y-6">
              <Card className="rounded-2xl border-2 border-gray-100 shadow-sm">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#0066FF] rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">JD</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">John Doe</h3>
                    <p className="text-gray-600 text-sm">john@example.com</p>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/settings')}
                        className="flex-1 rounded-xl"
                      >
                        Settings
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/auth')}
                        className="flex-1 rounded-xl"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="rounded-2xl border-2 border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">This Week</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Meetings</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hours</span>
                    <span className="font-semibold">8.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Recordings</span>
                    <span className="font-semibold">3</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Help Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          size="lg"
          className="w-14 h-14 bg-[#0066FF] hover:bg-[#0066FF]/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
        >
          <HelpCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Home;
