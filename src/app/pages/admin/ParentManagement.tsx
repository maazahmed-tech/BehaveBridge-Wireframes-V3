import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';
import { Search, Plus, MoreVertical, UserCheck, UserX, Users, MailCheck } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  linkedStudents: string[];
  isActivated: boolean;
  status: 'Active' | 'Inactive';
}

export default function ParentManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activationFilter, setActivationFilter] = useState<string>('all');

  const parents: Parent[] = [
    {
      id: '1',
      name: 'Lisa & Robert Thompson',
      email: 'thompson.family@email.com',
      phone: '(555) 123-4567',
      linkedStudents: ['Marcus Thompson'],
      isActivated: true,
      status: 'Active'
    },
    {
      id: '2',
      name: 'David & May Chen',
      email: 'chen.family@email.com',
      phone: '(555) 234-5678',
      linkedStudents: ['Emily Chen', 'Jason Chen'],
      isActivated: true,
      status: 'Active'
    },
    {
      id: '3',
      name: 'Maria Rodriguez',
      email: 'mrodriguez@email.com',
      phone: '(555) 345-6789',
      linkedStudents: ['David Rodriguez'],
      isActivated: true,
      status: 'Active'
    },
    {
      id: '4',
      name: 'Carlos & Ana Garcia',
      email: 'garcia.family@email.com',
      phone: '(555) 456-7890',
      linkedStudents: ['Sofia Garcia'],
      isActivated: false,
      status: 'Active'
    },
    {
      id: '5',
      name: 'Elena Martinez',
      email: 'emartinez@email.com',
      phone: '(555) 567-8901',
      linkedStudents: ['Alex Martinez'],
      isActivated: true,
      status: 'Active'
    },
    {
      id: '6',
      name: 'John & Susan Adams',
      email: 'adams.family@email.com',
      phone: '(555) 678-9012',
      linkedStudents: ['Tyler Adams'],
      isActivated: false,
      status: 'Active'
    }
  ];

  const filteredParents = parents.filter(parent => {
    const matchesSearch = 
      parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.linkedStudents.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || parent.status.toLowerCase() === statusFilter;
    const matchesActivation = 
      activationFilter === 'all' ||
      (activationFilter === 'activated' && parent.isActivated) ||
      (activationFilter === 'pending' && !parent.isActivated);
    return matchesSearch && matchesStatus && matchesActivation;
  });

  const activatedCount = parents.filter(p => p.isActivated).length;
  const pendingCount = parents.filter(p => !p.isActivated).length;

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl mb-2">Parent Account Management</h1>
          <p className="text-[#757575]">Manage parent accounts, activations, and student linkages</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-[#D0D0D0]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#757575]">Total Parents</p>
                  <p className="text-2xl">{parents.length}</p>
                </div>
                <Users className="h-8 w-8 text-[#757575]" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#D0D0D0]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#757575]">Activated</p>
                  <p className="text-2xl">{activatedCount}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                  <MailCheck className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#D0D0D0]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#757575]">Pending Activation</p>
                  <p className="text-2xl">{pendingCount}</p>
                </div>
                <MailCheck className="h-8 w-8 text-[#757575]" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#D0D0D0]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#757575]">Active</p>
                  <p className="text-2xl">{parents.filter(p => p.status === 'Active').length}</p>
                </div>
                <UserCheck className="h-8 w-8 text-[#757575]" />
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
              placeholder="Search by name, email, or linked student..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select value={activationFilter} onValueChange={setActivationFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Activation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Accounts</SelectItem>
              <SelectItem value="activated">Activated</SelectItem>
              <SelectItem value="pending">Pending Activation</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => navigate('/admin/parents/new')}
            className="bg-[#333333] hover:bg-[#4A4A4A]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Parent
          </Button>
        </div>

        {/* Parents Table */}
        <Card className="border-[#D0D0D0]">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F5F5F5]">
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Linked Students</TableHead>
                  <TableHead>Activated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParents.map((parent) => (
                  <TableRow key={parent.id}>
                    <TableCell>
                      <p className="text-sm">{parent.name}</p>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="text-[#4A4A4A]">{parent.email}</p>
                        <p className="text-[#757575] text-xs">{parent.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {parent.linkedStudents.map((student, idx) => (
                          <p key={idx} className="text-[#4A4A4A]">
                            {student}
                          </p>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`${
                          parent.isActivated
                            ? 'bg-[#1A1A1A] text-white'
                            : 'bg-[#D0D0D0] text-[#4A4A4A]'
                        }`}
                      >
                        {parent.isActivated ? 'Yes' : 'Pending'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`${
                          parent.status === 'Active'
                            ? 'bg-[#1A1A1A] text-white'
                            : 'bg-[#D0D0D0] text-[#4A4A4A]'
                        }`}
                      >
                        {parent.status}
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
                          <DropdownMenuItem onClick={() => navigate(`/admin/parents/${parent.id}/edit`)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/admin/parents/${parent.id}/view`)}>
                            View Account
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/admin/parents/${parent.id}/link`)}>
                            Link to Student
                          </DropdownMenuItem>
                          {!parent.isActivated && (
                            <DropdownMenuItem onClick={() => alert('Activation email resent successfully')}>
                              Resend Activation
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => alert('Reset password email sent')}>
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              if (confirm(`${parent.status === 'Active' ? 'Deactivate' : 'Reactivate'} ${parent.name}'s account?`)) {
                                alert(`Parent account ${parent.status === 'Active' ? 'deactivated' : 'reactivated'} successfully`);
                              }
                            }}
                          >
                            {parent.status === 'Active' ? 'Deactivate' : 'Reactivate'}
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

        {filteredParents.length === 0 && (
          <Card className="border-[#D0D0D0] mt-4">
            <CardContent className="py-12 text-center">
              <p className="text-[#757575]">No parent accounts found matching your criteria</p>
            </CardContent>
          </Card>
        )}

        {/* Info Card */}
        <Card className="mt-6 border-[#D0D0D0] bg-[#F5F5F5]">
          <CardContent className="py-4">
            <p className="text-sm text-[#4A4A4A]">
              <strong>Parent Activation:</strong> New parent accounts require activation via email.
              Parents must set their password and complete activation before accessing the portal.
              You can resend activation emails for accounts that haven't been activated yet.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}