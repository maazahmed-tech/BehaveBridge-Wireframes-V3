import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Badge } from '@/app/components/ui/badge';
import { ArrowLeft, Users } from 'lucide-react';
import { toast } from 'sonner';

export default function EditParent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    parentId: 'PAR-001',
    firstName: 'Lisa',
    lastName: 'Thompson',
    email: 'lisa.thompson@email.com',
    phone: '(555) 234-5678',
    relationship: 'Mother',
    address: '456 Oak Street',
    city: 'Springfield',
    state: 'CA',
    zipCode: '12345',
    linkedStudents: ['STU-123'],
    emergencyContact: true,
    portalAccess: true,
    status: 'Active'
  });

  const [availableStudents] = useState([
    { id: 'STU-123', name: 'Marcus Williams', currentlyLinked: true },
    { id: 'STU-124', name: 'Emma Rodriguez', currentlyLinked: false },
    { id: 'STU-125', name: 'Jayden Smith', currentlyLinked: false }
  ]);

  const parentStats = {
    totalIncidents: 12,
    unacknowledged: 2,
    lastLogin: '2 days ago',
    messagesSent: 8
  };

  const handleStudentToggle = (studentId: string) => {
    setFormData(prev => ({
      ...prev,
      linkedStudents: prev.linkedStudents.includes(studentId)
        ? prev.linkedStudents.filter(id => id !== studentId)
        : [...prev.linkedStudents, studentId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.linkedStudents.length === 0) {
      toast.error('Please link at least one student');
      return;
    }
    toast.success('Parent information updated successfully');
    navigate('/admin/parents');
  };

  const handleDeactivate = () => {
    if (window.confirm('Are you sure you want to deactivate this parent account?')) {
      toast.success('Parent account deactivated');
      navigate('/admin/parents');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <Link to="/admin/parents" className="inline-flex items-center gap-2 text-[#4A4A4A] hover:text-[#1A1A1A] mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Parents/Guardians
        </Link>

        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl text-[#1A1A1A] mb-2">Edit Parent/Guardian</h1>
            <p className="text-[#757575]">{formData.parentId}</p>
          </div>
          <Badge className="bg-[#333333] text-white">
            {formData.status}
          </Badge>
        </div>

        {/* Parent Activity Overview */}
        <Card className="mb-6 border-[#333333] bg-[#FAFAFA]">
          <CardHeader>
            <CardTitle className="text-lg text-[#1A1A1A] flex items-center gap-2">
              <Users className="w-5 h-5" />
              Activity Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-[#757575] mb-1">Total Incidents</div>
                <div className="text-2xl font-semibold text-[#1A1A1A]">
                  {parentStats.totalIncidents}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#757575] mb-1">Unacknowledged</div>
                <div className="text-2xl font-semibold text-[#1A1A1A]">
                  {parentStats.unacknowledged}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#757575] mb-1">Last Login</div>
                <div className="text-lg text-[#1A1A1A]">
                  {parentStats.lastLogin}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#757575] mb-1">Messages Sent</div>
                <div className="text-2xl font-semibold text-[#1A1A1A]">
                  {parentStats.messagesSent}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6 border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A]">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="parentId" className="text-[#4A4A4A]">Parent ID</Label>
                <Input
                  id="parentId"
                  value={formData.parentId}
                  disabled
                  className="border-[#D0D0D0] text-[#757575] bg-[#F5F5F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-[#4A4A4A]">First Name *</Label>
                  <Input
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="border-[#D0D0D0] text-[#1A1A1A]"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-[#4A4A4A]">Last Name *</Label>
                  <Input
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="border-[#D0D0D0] text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="relationship" className="text-[#4A4A4A]">Relationship to Student *</Label>
                  <select
                    id="relationship"
                    required
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    className="w-full border border-[#D0D0D0] rounded-md px-3 py-2 text-[#1A1A1A]"
                  >
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Guardian">Guardian</option>
                    <option value="Grandparent">Grandparent</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="status" className="text-[#4A4A4A]">Status *</Label>
                  <select
                    id="status"
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full border border-[#D0D0D0] rounded-md px-3 py-2 text-[#1A1A1A]"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A]">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-[#4A4A4A]">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-[#D0D0D0] text-[#1A1A1A]"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-[#4A4A4A]">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="border-[#D0D0D0] text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-[#4A4A4A]">Street Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="border-[#D0D0D0] text-[#1A1A1A]"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city" className="text-[#4A4A4A]">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="border-[#D0D0D0] text-[#1A1A1A]"
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-[#4A4A4A]">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="border-[#D0D0D0] text-[#1A1A1A]"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode" className="text-[#4A4A4A]">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="border-[#D0D0D0] text-[#1A1A1A]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A]">Linked Students *</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-[#757575] mb-3">
                Select all students this parent/guardian is responsible for
              </p>
              {availableStudents.map((student) => (
                <div key={student.id} className="flex items-center gap-3 p-3 bg-[#F5F5F5] rounded-lg">
                  <input
                    type="checkbox"
                    id={`student-${student.id}`}
                    checked={formData.linkedStudents.includes(student.id)}
                    onChange={() => handleStudentToggle(student.id)}
                    className="w-4 h-4 text-[#333333] border-[#D0D0D0] rounded"
                  />
                  <Label htmlFor={`student-${student.id}`} className="text-[#1A1A1A] cursor-pointer flex-1">
                    {student.name} ({student.id})
                  </Label>
                  {student.currentlyLinked && (
                    <Badge variant="outline" className="border-[#9E9E9E] text-[#4A4A4A]">
                      Currently Linked
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mb-6 border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A]">Permissions & Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[#F5F5F5] rounded-lg">
                <input
                  type="checkbox"
                  id="emergencyContact"
                  checked={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.checked })}
                  className="w-4 h-4 text-[#333333] border-[#D0D0D0] rounded"
                />
                <div>
                  <Label htmlFor="emergencyContact" className="text-[#1A1A1A] cursor-pointer">
                    Emergency Contact
                  </Label>
                  <p className="text-sm text-[#757575]">Authorized to be contacted in emergencies</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#F5F5F5] rounded-lg">
                <input
                  type="checkbox"
                  id="portalAccess"
                  checked={formData.portalAccess}
                  onChange={(e) => setFormData({ ...formData, portalAccess: e.target.checked })}
                  className="w-4 h-4 text-[#333333] border-[#D0D0D0] rounded"
                />
                <div>
                  <Label htmlFor="portalAccess" className="text-[#1A1A1A] cursor-pointer">
                    Parent Portal Access
                  </Label>
                  <p className="text-sm text-[#757575]">Grant access to the parent portal</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <div className="flex gap-3">
              <Button
                type="submit"
                className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
              >
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/parents')}
                className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
              >
                Cancel
              </Button>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleDeactivate}
              className="border-[#9E9E9E] text-[#757575] hover:bg-[#F5F5F5] hover:text-[#1A1A1A]"
            >
              Deactivate Account
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
