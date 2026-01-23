import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';
import { Search, Plus, MoreVertical, UserCheck, UserX, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

interface Expert {
  id: string;
  name: string;
  expertId: string;
  email: string;
  role: string;
  assignedStudents: number;
  activeCases: number;
  status: 'Active' | 'Inactive';
}

export default function ExpertManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const experts: Expert[] = [
    {
      id: '1',
      name: 'Dr. Sarah Williams',
      expertId: 'BE-2024-0023',
      email: 'sarah.williams@lincolnelementary.edu',
      role: 'Lead Behavioral Specialist',
      assignedStudents: 45,
      activeCases: 3,
      status: 'Active'
    },
    {
      id: '2',
      name: 'Robert Chen',
      expertId: 'BE-2024-0024',
      email: 'robert.chen@lincolnelementary.edu',
      role: 'Behavioral Specialist - SpEd',
      assignedStudents: 28,
      activeCases: 2,
      status: 'Active'
    },
    {
      id: '3',
      name: 'Jennifer Adams',
      expertId: 'BE-2024-0025',
      email: 'jennifer.adams@lincolnelementary.edu',
      role: 'Behavioral Specialist',
      assignedStudents: 32,
      activeCases: 4,
      status: 'Active'
    }
  ];

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = 
      expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.expertId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || expert.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalStudents = experts.reduce((sum, e) => sum + e.assignedStudents, 0);
  const totalActiveCases = experts.reduce((sum, e) => sum + e.activeCases, 0);

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl mb-2">Behavioral Expert Management</h1>
          <p className="text-[#757575]">Manage behavioral expert accounts and student assignments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-[#D0D0D0]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#757575]">Total Experts</p>
                  <p className="text-2xl">{experts.length}</p>
                </div>
                <UserCheck className="h-8 w-8 text-[#757575]" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#D0D0D0]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#757575]">Active Experts</p>
                  <p className="text-2xl">{experts.filter(e => e.status === 'Active').length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#D0D0D0]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#757575]">Assigned Students</p>
                  <p className="text-2xl">{totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-[#757575]" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#D0D0D0]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#757575]">Active Cases</p>
                  <p className="text-2xl">{totalActiveCases}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                  <span className="text-lg">📋</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#757575]" />
            <Input
              type="text"
              placeholder="Search by name, Expert ID, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => navigate('/admin/experts/new')}
            className="bg-[#333333] hover:bg-[#4A4A4A]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Expert
          </Button>
        </div>

        {/* Experts Table */}
        <Card className="border-[#D0D0D0]">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F5F5F5]">
                  <TableHead>Name</TableHead>
                  <TableHead>Expert ID</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Assigned Students</TableHead>
                  <TableHead>Active Cases</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExperts.map((expert) => (
                  <TableRow key={expert.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm">{expert.name}</p>
                        <p className="text-xs text-[#757575]">{expert.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{expert.expertId}</TableCell>
                    <TableCell className="text-sm">{expert.role}</TableCell>
                    <TableCell>
                      <Button
                        variant="link"
                        className="text-sm p-0 h-auto"
                        onClick={() => navigate(`/admin/experts/${expert.id}/caseload`)}
                      >
                        {expert.assignedStudents} students
                      </Button>
                    </TableCell>
                    <TableCell className="text-sm">{expert.activeCases}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`${
                          expert.status === 'Active'
                            ? 'bg-[#1A1A1A] text-white'
                            : 'bg-[#D0D0D0] text-[#4A4A4A]'
                        }`}
                      >
                        {expert.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/admin/experts/${expert.id}/edit`)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/admin/experts/${expert.id}/caseload`)}>
                            View Caseload
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/admin/experts/${expert.id}/view`)}>
                            Account Status
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => alert('Reset password email sent')}>
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              if (confirm(`${expert.status === 'Active' ? 'Deactivate' : 'Reactivate'} ${expert.name}?`)) {
                                alert(`Expert ${expert.status === 'Active' ? 'deactivated' : 'reactivated'} successfully`);
                              }
                            }}
                          >
                            {expert.status === 'Active' ? 'Deactivate' : 'Reactivate'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {filteredExperts.length === 0 && (
          <Card className="border-[#D0D0D0] mt-4">
            <CardContent className="py-12 text-center">
              <p className="text-[#757575]">No behavioral experts found matching your criteria</p>
            </CardContent>
          </Card>
        )}

        {/* Info Card */}
        <Card className="mt-6 border-[#D0D0D0] bg-[#F5F5F5]">
          <CardContent className="py-4">
            <p className="text-sm text-[#4A4A4A]">
              <strong>Caseload Management:</strong> Behavioral experts can be assigned to
              specific students to provide specialized support and intervention strategies.
              View individual caseloads to manage student assignments and workload distribution.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}