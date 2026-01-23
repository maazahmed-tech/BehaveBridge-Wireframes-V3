import { useState } from 'react';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { 
  FileText, 
  Search, 
  Download,
  Filter,
  User,
  AlertCircle,
  Shield,
  Settings
} from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  userRole: 'admin' | 'teacher' | 'expert' | 'parent';
  action: string;
  category: 'incident' | 'user_management' | 'system' | 'access' | 'data';
  details: string;
  ipAddress: string;
  status: 'success' | 'failed' | 'warning';
}

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const auditLogs: AuditLog[] = [
    {
      id: '1',
      timestamp: 'Jan 15, 2026 10:23 AM',
      user: 'Admin User',
      userRole: 'admin',
      action: 'Added new teacher',
      category: 'user_management',
      details: 'Created teacher account for John Smith (TCH-005)',
      ipAddress: '192.168.1.100',
      status: 'success'
    },
    {
      id: '2',
      timestamp: 'Jan 15, 2026 09:45 AM',
      user: 'Dr. Sarah Williams',
      userRole: 'expert',
      action: 'Updated case assessment',
      category: 'incident',
      details: 'Modified assessment for case CS-2026-003',
      ipAddress: '192.168.1.105',
      status: 'success'
    },
    {
      id: '3',
      timestamp: 'Jan 15, 2026 09:12 AM',
      user: 'Mrs. Maria Johnson',
      userRole: 'teacher',
      action: 'Failed login attempt',
      category: 'access',
      details: 'Incorrect password - 3rd attempt',
      ipAddress: '192.168.1.102',
      status: 'failed'
    },
    {
      id: '4',
      timestamp: 'Jan 15, 2026 08:30 AM',
      user: 'Admin User',
      userRole: 'admin',
      action: 'Updated system settings',
      category: 'system',
      details: 'Changed auto-escalation threshold from 2 to 3 incidents',
      ipAddress: '192.168.1.100',
      status: 'success'
    },
    {
      id: '5',
      timestamp: 'Jan 15, 2026 07:55 AM',
      user: 'Lisa Thompson',
      userRole: 'parent',
      action: 'Viewed incident report',
      category: 'data',
      details: 'Accessed incident ESC-2026-042 for Marcus Williams',
      ipAddress: '72.45.123.89',
      status: 'success'
    },
    {
      id: '6',
      timestamp: 'Jan 14, 2026 11:30 PM',
      user: 'System',
      userRole: 'admin',
      action: 'Automated backup',
      category: 'system',
      details: 'Scheduled system backup completed successfully',
      ipAddress: 'localhost',
      status: 'success'
    },
    {
      id: '7',
      timestamp: 'Jan 14, 2026 04:15 PM',
      user: 'Admin User',
      userRole: 'admin',
      action: 'Exported data',
      category: 'data',
      details: 'Downloaded incident report CSV for Q4 2025',
      ipAddress: '192.168.1.100',
      status: 'success'
    },
    {
      id: '8',
      timestamp: 'Jan 14, 2026 02:30 PM',
      user: 'Unknown User',
      userRole: 'admin',
      action: 'Unauthorized access attempt',
      category: 'access',
      details: 'Attempted to access admin panel without authentication',
      ipAddress: '185.220.100.241',
      status: 'failed'
    }
  ];

  const getCategoryIcon = (category: AuditLog['category']) => {
    switch (category) {
      case 'incident':
        return <AlertCircle className="w-4 h-4" />;
      case 'user_management':
        return <User className="w-4 h-4" />;
      case 'system':
        return <Settings className="w-4 h-4" />;
      case 'access':
        return <Shield className="w-4 h-4" />;
      case 'data':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: AuditLog['status']) => {
    const styles = {
      success: 'border-[#4A4A4A] text-[#1A1A1A]',
      failed: 'border-[#333333] text-[#333333] bg-[#F5F5F5]',
      warning: 'border-[#757575] text-[#757575]'
    };
    return (
      <Badge variant="outline" className={styles[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = filterRole === 'all' || log.userRole === filterRole;
    const matchesCategory = filterCategory === 'all' || log.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;

    return matchesSearch && matchesRole && matchesCategory && matchesStatus;
  });

  const handleExport = () => {
    console.log('Exporting audit logs...');
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-[#1A1A1A] mb-2">Audit Logs</h1>
            <p className="text-[#757575]">System activity and security monitoring</p>
          </div>
          <Button
            onClick={handleExport}
            className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6 border-[#D0D0D0]">
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#757575]" />
                <Input
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-[#D0D0D0] text-[#1A1A1A]"
                />
              </div>

              <div>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full border border-[#D0D0D0] rounded-md px-3 py-2 text-[#1A1A1A]"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="teacher">Teacher</option>
                  <option value="expert">Expert</option>
                  <option value="parent">Parent</option>
                </select>
              </div>

              <div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full border border-[#D0D0D0] rounded-md px-3 py-2 text-[#1A1A1A]"
                >
                  <option value="all">All Categories</option>
                  <option value="incident">Incidents</option>
                  <option value="user_management">User Management</option>
                  <option value="system">System</option>
                  <option value="access">Access</option>
                  <option value="data">Data</option>
                </select>
              </div>

              <div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full border border-[#D0D0D0] rounded-md px-3 py-2 text-[#1A1A1A]"
                >
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                  <option value="warning">Warning</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="border-[#D0D0D0]">
            <CardContent className="p-4">
              <div className="text-sm text-[#757575] mb-1">Total Events</div>
              <div className="text-2xl font-semibold text-[#1A1A1A]">
                {auditLogs.length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#D0D0D0]">
            <CardContent className="p-4">
              <div className="text-sm text-[#757575] mb-1">Success Rate</div>
              <div className="text-2xl font-semibold text-[#1A1A1A]">
                {Math.round((auditLogs.filter(l => l.status === 'success').length / auditLogs.length) * 100)}%
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#D0D0D0]">
            <CardContent className="p-4">
              <div className="text-sm text-[#757575] mb-1">Failed Attempts</div>
              <div className="text-2xl font-semibold text-[#1A1A1A]">
                {auditLogs.filter(l => l.status === 'failed').length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#D0D0D0]">
            <CardContent className="p-4">
              <div className="text-sm text-[#757575] mb-1">Filtered Results</div>
              <div className="text-2xl font-semibold text-[#1A1A1A]">
                {filteredLogs.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Audit Logs Table */}
        <Card className="border-[#D0D0D0]">
          <CardHeader>
            <CardTitle className="text-lg text-[#1A1A1A] flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Activity Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-12">
                  <Filter className="w-12 h-12 text-[#D0D0D0] mx-auto mb-4" />
                  <p className="text-[#757575]">No logs match your filters</p>
                </div>
              ) : (
                filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 bg-[#F5F5F5] rounded-lg border border-[#E0E0E0]"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-white rounded border border-[#D0D0D0]">
                          {getCategoryIcon(log.category)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-[#1A1A1A]">{log.action}</h3>
                            {getStatusBadge(log.status)}
                          </div>
                          <p className="text-sm text-[#4A4A4A] mb-2">{log.details}</p>
                          <div className="flex items-center gap-4 text-xs text-[#757575]">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {log.user} ({log.userRole})
                            </span>
                            <span>•</span>
                            <span>{log.timestamp}</span>
                            <span>•</span>
                            <span>IP: {log.ipAddress}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}