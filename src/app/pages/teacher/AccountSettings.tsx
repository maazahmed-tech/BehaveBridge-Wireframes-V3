import { useState } from 'react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/app/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function AccountSettings() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    // Simulate password update
    toast.success('Password updated successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleLogoutAll = () => {
    toast.success('Logged out from all devices');
    setTimeout(() => {
      navigate('/teacher/login');
    }, 1500);
  };

  const handleLogout = () => {
    navigate('/teacher/login');
  };

  return (
    <TeacherLayout>
      <div className="p-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl text-[#1A1A1A] mb-2">Account Settings</h1>
          <p className="text-[#4A4A4A]">Manage your account information and security</p>
        </div>

        <Card className="mb-6 border-[#D0D0D0]">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-[#1A1A1A]">Account Information</CardTitle>
            <p className="text-sm text-[#757575]">Your account details are managed by your school administrator</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#4A4A4A] text-sm mb-2 block">Full Name</Label>
                  <div className="p-3 bg-[#F5F5F5] rounded-lg text-[#1A1A1A]">
                    Maria Johnson
                  </div>
                </div>
                <div>
                  <Label className="text-[#4A4A4A] text-sm mb-2 block">Email</Label>
                  <div className="p-3 bg-[#F5F5F5] rounded-lg text-[#1A1A1A]">
                    maria.johnson@lincolnelementary.edu
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E0E0E0]">
                <p className="text-sm text-[#757575]">
                  To update your account information, please contact your school administrator.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-[#D0D0D0]">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-[#1A1A1A]">Change Password</CardTitle>
            <p className="text-sm text-[#757575]">Update your password to keep your account secure</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-password" className="text-[#4A4A4A] mb-2 block">
                  Current Password
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="border-[#D0D0D0] text-[#1A1A1A]"
                />
              </div>

              <div>
                <Label htmlFor="new-password" className="text-[#4A4A4A] mb-2 block">
                  New Password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="border-[#D0D0D0] text-[#1A1A1A]"
                />
              </div>

              <div>
                <Label htmlFor="confirm-password" className="text-[#4A4A4A] mb-2 block">
                  Confirm New Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="border-[#D0D0D0] text-[#1A1A1A]"
                />
              </div>

              <div className="pt-2">
                <p className="text-sm text-[#757575] mb-4">
                  Password requirements: At least 8 characters, include uppercase, lowercase, number, and special character
                </p>
                <Button
                  onClick={handleUpdatePassword}
                  className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
                >
                  Update Password
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#D0D0D0]">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-[#1A1A1A]">Session Management</CardTitle>
            <p className="text-sm text-[#757575]">Manage your active sessions across devices</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#1A1A1A] mb-1">Active Sessions</p>
                <p className="text-sm text-[#757575]">You are currently logged in on 2 devices</p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
                  >
                    Logout from All Devices
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white border-[#D0D0D0]">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-[#1A1A1A]">
                      Logout from All Devices?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-[#4A4A4A]">
                      This will log you out from all devices including this one. You'll need to sign in again to access your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLogoutAll}
                      className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
                    >
                      Logout All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 pt-8 border-t border-[#E0E0E0]">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
              >
                Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white border-[#D0D0D0]">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-[#1A1A1A]">
                  Confirm Logout
                </AlertDialogTitle>
                <AlertDialogDescription className="text-[#4A4A4A]">
                  Are you sure you want to logout? Any unsaved changes will be lost.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleLogout}
                  className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
                >
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </TeacherLayout>
  );
}