import { useState } from 'react';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Badge } from '@/app/components/ui/badge';
import { toast } from 'sonner';
import { 
  Settings, 
  Database, 
  Mail, 
  Bell, 
  Shield,
  Download,
  Upload 
} from 'lucide-react';

export default function SystemSettings() {
  const [schoolInfo, setSchoolInfo] = useState({
    schoolName: 'Lincoln Elementary School',
    district: 'Unified School District',
    address: '123 Education Way',
    city: 'Springfield',
    state: 'CA',
    zipCode: '12345',
    phone: '(555) 123-4567',
    email: 'admin@lincolnelementary.edu'
  });

  const [emailSettings, setEmailSettings] = useState({
    notifyParentsOnIncident: true,
    notifyExpertsOnEscalation: true,
    dailyDigestEnabled: true,
    digestTime: '07:00'
  });

  const [systemSettings, setSystemSettings] = useState({
    autoEscalationThreshold: '3',
    expertResponseDeadline: '24',
    dataRetentionPeriod: '7',
    maintenanceMode: false
  });

  const handleSaveSchoolInfo = () => {
    toast.success('School information updated');
  };

  const handleSaveEmailSettings = () => {
    toast.success('Email settings updated');
  };

  const handleSaveSystemSettings = () => {
    toast.success('System settings updated');
  };

  const handleExportData = () => {
    toast.success('Data export initiated - Download will begin shortly');
  };

  const handleBackup = () => {
    toast.success('System backup initiated');
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <h1 className="text-2xl text-[#1A1A1A] mb-6">System Settings</h1>

        {/* School Information */}
        <Card className="mb-6 border-[#D0D0D0]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1A1A1A]">
              <Settings className="w-5 h-5" />
              School Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="schoolName" className="text-[#4A4A4A]">School Name</Label>
                <Input
                  id="schoolName"
                  value={schoolInfo.schoolName}
                  onChange={(e) => setSchoolInfo({ ...schoolInfo, schoolName: e.target.value })}
                  className="border-[#D0D0D0] text-[#1A1A1A]"
                />
              </div>
              <div>
                <Label htmlFor="district" className="text-[#4A4A4A]">District</Label>
                <Input
                  id="district"
                  value={schoolInfo.district}
                  onChange={(e) => setSchoolInfo({ ...schoolInfo, district: e.target.value })}
                  className="border-[#D0D0D0] text-[#1A1A1A]"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="text-[#4A4A4A]">Address</Label>
              <Input
                id="address"
                value={schoolInfo.address}
                onChange={(e) => setSchoolInfo({ ...schoolInfo, address: e.target.value })}
                className="border-[#D0D0D0] text-[#1A1A1A]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city" className="text-[#4A4A4A]">City</Label>
                <Input
                  id="city"
                  value={schoolInfo.city}
                  onChange={(e) => setSchoolInfo({ ...schoolInfo, city: e.target.value })}
                  className="border-[#D0D0D0] text-[#1A1A1A]"
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-[#4A4A4A]">State</Label>
                <Input
                  id="state"
                  value={schoolInfo.state}
                  onChange={(e) => setSchoolInfo({ ...schoolInfo, state: e.target.value })}
                  className="border-[#D0D0D0] text-[#1A1A1A]"
                />
              </div>
              <div>
                <Label htmlFor="zipCode" className="text-[#4A4A4A]">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={schoolInfo.zipCode}
                  onChange={(e) => setSchoolInfo({ ...schoolInfo, zipCode: e.target.value })}
                  className="border-[#D0D0D0] text-[#1A1A1A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-[#4A4A4A]">Phone</Label>
                <Input
                  id="phone"
                  value={schoolInfo.phone}
                  onChange={(e) => setSchoolInfo({ ...schoolInfo, phone: e.target.value })}
                  className="border-[#D0D0D0] text-[#1A1A1A]"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-[#4A4A4A]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={schoolInfo.email}
                  onChange={(e) => setSchoolInfo({ ...schoolInfo, email: e.target.value })}
                  className="border-[#D0D0D0] text-[#1A1A1A]"
                />
              </div>
            </div>

            <Button
              onClick={handleSaveSchoolInfo}
              className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
            >
              Save School Information
            </Button>
          </CardContent>
        </Card>

        {/* Email & Notification Settings */}
        <Card className="mb-6 border-[#D0D0D0]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1A1A1A]">
              <Mail className="w-5 h-5" />
              Email & Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded-lg">
              <div>
                <div className="font-medium text-[#1A1A1A]">Parent Incident Notifications</div>
                <div className="text-sm text-[#757575]">Automatically email parents when incidents are logged</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailSettings.notifyParentsOnIncident}
                  onChange={(e) => setEmailSettings({ ...emailSettings, notifyParentsOnIncident: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#D0D0D0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#D0D0D0] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#333333]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded-lg">
              <div>
                <div className="font-medium text-[#1A1A1A]">Expert Escalation Alerts</div>
                <div className="text-sm text-[#757575]">Notify experts when cases are escalated to them</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailSettings.notifyExpertsOnEscalation}
                  onChange={(e) => setEmailSettings({ ...emailSettings, notifyExpertsOnEscalation: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#D0D0D0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#D0D0D0] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#333333]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded-lg">
              <div>
                <div className="font-medium text-[#1A1A1A]">Daily Digest</div>
                <div className="text-sm text-[#757575]">Send daily summary to administrators</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailSettings.dailyDigestEnabled}
                  onChange={(e) => setEmailSettings({ ...emailSettings, dailyDigestEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#D0D0D0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#D0D0D0] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#333333]"></div>
              </label>
            </div>

            {emailSettings.dailyDigestEnabled && (
              <div className="ml-4">
                <Label htmlFor="digestTime" className="text-[#4A4A4A]">Daily Digest Time</Label>
                <Input
                  id="digestTime"
                  type="time"
                  value={emailSettings.digestTime}
                  onChange={(e) => setEmailSettings({ ...emailSettings, digestTime: e.target.value })}
                  className="border-[#D0D0D0] text-[#1A1A1A] max-w-xs"
                />
              </div>
            )}

            <Button
              onClick={handleSaveEmailSettings}
              className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
            >
              Save Email Settings
            </Button>
          </CardContent>
        </Card>

        {/* System Configuration */}
        <Card className="mb-6 border-[#D0D0D0]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1A1A1A]">
              <Shield className="w-5 h-5" />
              System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="autoEscalationThreshold" className="text-[#4A4A4A]">
                  Auto-Escalation Threshold
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="autoEscalationThreshold"
                    type="number"
                    value={systemSettings.autoEscalationThreshold}
                    onChange={(e) => setSystemSettings({ ...systemSettings, autoEscalationThreshold: e.target.value })}
                    className="border-[#D0D0D0] text-[#1A1A1A]"
                  />
                  <span className="text-sm text-[#757575]">incidents</span>
                </div>
                <p className="text-sm text-[#757575] mt-1">
                  Suggest escalation after this many incidents
                </p>
              </div>

              <div>
                <Label htmlFor="expertResponseDeadline" className="text-[#4A4A4A]">
                  Expert Response Deadline
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="expertResponseDeadline"
                    type="number"
                    value={systemSettings.expertResponseDeadline}
                    onChange={(e) => setSystemSettings({ ...systemSettings, expertResponseDeadline: e.target.value })}
                    className="border-[#D0D0D0] text-[#1A1A1A]"
                  />
                  <span className="text-sm text-[#757575]">hours</span>
                </div>
                <p className="text-sm text-[#757575] mt-1">
                  Expected response time for escalated cases
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="dataRetentionPeriod" className="text-[#4A4A4A]">
                Data Retention Period
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="dataRetentionPeriod"
                  type="number"
                  value={systemSettings.dataRetentionPeriod}
                  onChange={(e) => setSystemSettings({ ...systemSettings, dataRetentionPeriod: e.target.value })}
                  className="border-[#D0D0D0] text-[#1A1A1A] max-w-xs"
                />
                <span className="text-sm text-[#757575]">years</span>
              </div>
              <p className="text-sm text-[#757575] mt-1">
                How long to retain archived incident data
              </p>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded-lg border border-[#D0D0D0]">
              <div>
                <div className="font-medium text-[#1A1A1A]">Maintenance Mode</div>
                <div className="text-sm text-[#757575]">Temporarily disable system for all users except admins</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={systemSettings.maintenanceMode}
                  onChange={(e) => setSystemSettings({ ...systemSettings, maintenanceMode: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#D0D0D0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#D0D0D0] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#333333]"></div>
              </label>
            </div>

            <Button
              onClick={handleSaveSystemSettings}
              className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
            >
              Save System Configuration
            </Button>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="border-[#D0D0D0]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1A1A1A]">
              <Database className="w-5 h-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#F5F5F5] rounded-lg">
              <div>
                <div className="font-medium text-[#1A1A1A] mb-1">Export All Data</div>
                <p className="text-sm text-[#757575]">
                  Download complete system data as CSV files
                </p>
              </div>
              <Button
                onClick={handleExportData}
                variant="outline"
                className="border-[#9E9E9E] text-[#333333] hover:bg-[#E0E0E0]"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F5F5F5] rounded-lg">
              <div>
                <div className="font-medium text-[#1A1A1A] mb-1">System Backup</div>
                <p className="text-sm text-[#757575]">
                  Create a full system backup (database + files)
                </p>
              </div>
              <Button
                onClick={handleBackup}
                variant="outline"
                className="border-[#9E9E9E] text-[#333333] hover:bg-[#E0E0E0]"
              >
                <Upload className="w-4 h-4 mr-2" />
                Create Backup
              </Button>
            </div>

            <div className="p-4 bg-[#FAFAFA] rounded-lg border border-[#D0D0D0]">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-[#4A4A4A]" />
                <span className="font-medium text-[#1A1A1A]">Last Backup</span>
              </div>
              <p className="text-sm text-[#757575]">January 14, 2026 at 11:30 PM</p>
              <Badge variant="outline" className="border-[#9E9E9E] text-[#4A4A4A] mt-2">
                Automatic backups enabled
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
