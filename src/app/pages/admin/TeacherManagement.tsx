import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';
import { Search, Plus, MoreVertical, UserCheck, UserX } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

interface Teacher {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  grades: string;
}

export default function TeacherManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const teachers: Teacher[] = [
    {
      id: '1',
      name: 'Maria Johnson',
      email: 'maria.johnson@lincolnelementary.edu',
      role: '4th Grade Lead Teacher',
      status: 'Active',
      grades: '4th'
    },
    {
      id: '2',
      name: 'Michael Brown',
      email: 'michael.brown@lincolnelementary.edu',
      role: '3rd Grade Teacher',
      status: 'Active',
      grades: '3rd'
    },
    {
      id: '3',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@lincolnelementary.edu',
      role: '5th Grade Teacher',
      status: 'Active',
      grades: '5th'
    },
    {
      id: '4',
      name: 'James Taylor',
      email: 'james.taylor@lincolnelementary.edu',
      role: '2nd Grade Teacher',
      status: 'Active',
      grades: '2nd'
    },
    {
      id: '5',
      name: 'Patricia Lopez',
      email: 'patricia.lopez@lincolnelementary.edu',
      role: 'PE Teacher K-5',
      status: 'Active',
      grades: 'K-5'
    },
    {
      id: '6',
      name: 'David Peters',
      email: 'david.peters@lincolnelementary.edu',
      role: 'Substitute Teacher',
      status: 'Inactive',
      grades: 'N/A'
    }
  ];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = 
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || teacher.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl mb-2">Teacher Management</h1>
          <p className="text-[#757575]">Manage teacher accounts, assignments, and access permissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-[#D0D0D0]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#757575]">Total Teachers</p>
                  <p className="text-2xl">{teachers.length}</p>
                </div>
                <UserCheck className="h-8 w-8 text-[#757575]" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#D0D0D0]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#757575]">Active</p>
                  <p className="text-2xl">{teachers.filter(t => t.status === 'Active').length}</p>
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
                  <p className="text-sm text-[#757575]">Inactive</p>
                  <p className="text-2xl">{teachers.filter(t => t.status === 'Inactive').length}</p>
                </div>
                <UserX className="h-8 w-8 text-[#757575]" />
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
              placeholder="Search by name or email..."
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
            onClick={() => navigate('/admin/teachers/new')}
            className="bg-[#333333] hover:bg-[#4A4A4A]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Teacher
          </Button>
        </div>

        {/* Teachers Table */}
        <Card className="border-[#D0D0D0]">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F5F5F5]">
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm">{teacher.name}</p>
                        <p className="text-xs text-[#757575]">{teacher.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{teacher.role}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/admin/teachers/${teacher.id}/edit`)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/admin/teachers/${teacher.id}/view`)}>
                            View Account
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/admin/teachers/${teacher.id}/students`)}>
                            Assign Students
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => alert('Reset password email sent')}>
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              if (confirm(`${teacher.status === 'Active' ? 'Deactivate' : 'Reactivate'} ${teacher.name}?`)) {
                                alert(`Teacher ${teacher.status === 'Active' ? 'deactivated' : 'reactivated'} successfully`);
                              }
                            }}
                          >
                            {teacher.status === 'Active' ? 'Deactivate' : 'Reactivate'}
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

        {filteredTeachers.length === 0 && (
          <Card className="border-[#D0D0D0] mt-4">
            <CardContent className="py-12 text-center">
              <p className="text-[#757575]">No teachers found matching your criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}