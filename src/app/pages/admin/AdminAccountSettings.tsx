import { useState } from 'react';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Shield, LogOut, Key, User } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export function AdminAccountSettings() {
  const navigate = useNavigate();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showLogoutAllDialog, setShowLogoutAllDialog] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const adminInfo = {
    name: 'Admin User',
    email: 'admin@lincolnelementary.edu',
    adminId: 'ADM-2024-0001',
    role: 'School Administrator',
    lastLogin: 'Today at 9:32 AM',
    accountCreated: 'August 15, 2024',
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    toast.success('Password changed successfully');
    setShowPasswordDialog(false);
    setPasswordForm({ current: '', new: '', confirm: '' });
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const handleLogoutAll = () => {
    toast.success('Logged out from all devices');
    navigate('/admin/login');
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-2">
            Account Settings
          </h1>
          <p className="text-[#4A4A4A]">Manage your administrator account</p>
        </div>

        <div className="space-y-6">
          <Card className="border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-lg text-[#1A1A1A] flex items-center gap-2">
                <User className="w-5 h-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm text-[#757575]">Name</Label>
                  <p className="text-[#1A1A1A] mt-1">{adminInfo.name}</p>
                </div>
                <div>
                  <Label className="text-sm text-[#757575]">Admin ID</Label>
                  <p className="text-[#1A1A1A] mt-1">{adminInfo.adminId}</p>
                </div>
                <div>
                  <Label className="text-sm text-[#757575]">Email</Label>
                  <p className="text-[#1A1A1A] mt-1">{adminInfo.email}</p>
                </div>
                <div>
                  <Label className="text-sm text-[#757575]">Role</Label>
                  <p className="text-[#1A1A1A] mt-1">{adminInfo.role}</p>
                </div>
                <div>
                  <Label className="text-sm text-[#757575]">Last Login</Label>
                  <p className="text-[#1A1A1A] mt-1">{adminInfo.lastLogin}</p>
                </div>
                <div>
                  <Label className="text-sm text-[#757575]">Account Created</Label>
                  <p className="text-[#1A1A1A] mt-1">{adminInfo.accountCreated}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-[#D0D0D0]">
                <p className="text-sm text-[#757575]">
                  To update your name or email, contact your system administrator.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-lg text-[#1A1A1A] flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#F5F5F5] rounded">
                <div>
                  <p className="font-medium text-[#1A1A1A] mb-1">Password</p>
                  <p className="text-sm text-[#757575]">
                    Last changed 30 days ago
                  </p>
                </div>
                <Button
                  onClick={() => setShowPasswordDialog(true)}
                  variant="outline"
                  className="gap-2"
                >
                  <Key className="w-4 h-4" />
                  Change Password
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#F5F5F5] rounded">
                <div>
                  <p className="font-medium text-[#1A1A1A] mb-1">Active Sessions</p>
                  <p className="text-sm text-[#757575]">
                    Currently logged in on 1 device
                  </p>
                </div>
                <Button
                  onClick={() => setShowLogoutAllDialog(true)}
                  variant="outline"
                >
                  Logout from All Devices
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-lg text-[#1A1A1A] flex items-center gap-2">
                <LogOut className="w-5 h-5" />
                Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => setShowLogoutDialog(true)}
                variant="outline"
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new one.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleChangePassword}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwordForm.current}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, current: e.target.value })
                  }
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwordForm.new}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, new: e.target.value })
                  }
                  required
                  className="mt-2"
                />
                <p className="text-xs text-[#757575] mt-1">
                  Must be at least 8 characters with uppercase, lowercase, and number
                </p>
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwordForm.confirm}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, confirm: e.target.value })
                  }
                  required
                  className="mt-2"
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPasswordDialog(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
              >
                Change Password
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout from this session?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Logout All Devices Dialog */}
      <Dialog open={showLogoutAllDialog} onOpenChange={setShowLogoutAllDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Logout from All Devices</DialogTitle>
            <DialogDescription>
              This will end all active sessions on all devices. You'll need to login
              again on each device.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowLogoutAllDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleLogoutAll}
              className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
            >
              Logout from All Devices
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
