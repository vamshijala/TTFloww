
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-[#0066FF]/10 rounded-2xl mx-auto mb-8 flex items-center justify-center">
          <span className="text-4xl">🤖</span>
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Room Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The meeting room you're looking for doesn't exist or has ended. 
          Let's get you back to collaborating.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="rounded-2xl border-2 border-gray-200 hover:border-[#0066FF] hover:text-[#0066FF]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="bg-[#0066FF] hover:bg-[#0066FF]/90 text-white rounded-2xl"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
