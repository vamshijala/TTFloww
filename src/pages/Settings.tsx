
import React, { useState } from 'react';
import { User, Camera, Mic, Palette, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    avatar: ''
  });

  const [preferences, setPreferences] = useState({
    autoMute: true,
    autoVideo: false,
    darkMode: false,
    notifications: true,
    soundEffects: true
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleProfileSave = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    toast({
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "Your account will be deleted within 24 hours.",
      variant: "destructive"
    });
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Customize your workspace and preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-2xl border-2 border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <User className="w-5 h-5 mr-2 text-[#0066FF]" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-[#0066FF] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">JD</span>
                  </div>
                  <div>
                    <Button variant="outline" className="rounded-xl">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Avatar
                    </Button>
                    <p className="text-sm text-gray-500 mt-1">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={profile.fullName}
                      onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                      className="mt-1 h-12 rounded-2xl border-2 border-gray-200 focus:border-[#0066FF]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="mt-1 h-12 rounded-2xl border-2 border-gray-200 focus:border-[#0066FF]"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleProfileSave}
                  className="bg-[#0066FF] hover:bg-[#0066FF]/90 text-white rounded-2xl px-6"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Audio/Video Preferences */}
            <Card className="rounded-2xl border-2 border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Mic className="w-5 h-5 mr-2 text-[#0066FF]" />
                  Audio & Video Defaults
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Auto-mute on join</h3>
                    <p className="text-sm text-gray-500">
                      Automatically mute microphone when joining meetings
                    </p>
                  </div>
                  <Switch
                    checked={preferences.autoMute}
                    onCheckedChange={(checked) => handlePreferenceChange('autoMute', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Auto-start video</h3>
                    <p className="text-sm text-gray-500">
                      Automatically turn on camera when joining meetings
                    </p>
                  </div>
                  <Switch
                    checked={preferences.autoVideo}
                    onCheckedChange={(checked) => handlePreferenceChange('autoVideo', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Sound effects</h3>
                    <p className="text-sm text-gray-500">
                      Play sounds for notifications and actions
                    </p>
                  </div>
                  <Switch
                    checked={preferences.soundEffects}
                    onCheckedChange={(checked) => handlePreferenceChange('soundEffects', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* Theme Settings */}
            <Card className="rounded-2xl border-2 border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Palette className="w-5 h-5 mr-2 text-[#0066FF]" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Dark mode</h3>
                    <p className="text-sm text-gray-500">
                      Use dark theme
                    </p>
                  </div>
                  <Switch
                    checked={preferences.darkMode}
                    onCheckedChange={(checked) => handlePreferenceChange('darkMode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Notifications</h3>
                    <p className="text-sm text-gray-500">
                      Receive notifications
                    </p>
                  </div>
                  <Switch
                    checked={preferences.notifications}
                    onCheckedChange={(checked) => handlePreferenceChange('notifications', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="rounded-2xl border-2 border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full rounded-2xl border-2 border-gray-200 hover:border-gray-300"
                >
                  Export Data
                </Button>
                
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Permanently delete your account and all associated data.
                  </p>
                  <Button
                    onClick={() => setShowDeleteModal(true)}
                    variant="destructive"
                    className="w-full rounded-2xl"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full rounded-2xl">
              <CardHeader>
                <CardTitle className="text-red-600">Delete Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Are you sure you want to delete your account? This action cannot be undone.
                  All your data, meetings, and settings will be permanently deleted.
                </p>
                <div className="flex space-x-3">
                  <Button
                    onClick={() => setShowDeleteModal(false)}
                    variant="outline"
                    className="flex-1 rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteAccount}
                    variant="destructive"
                    className="flex-1 rounded-xl"
                  >
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
