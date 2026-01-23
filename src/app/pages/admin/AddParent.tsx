import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function AddParent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    parentId: '',
    firstName: 'Angela',
    lastName: 'Martinez',
    email: 'angela.martinez@email.com',
    phone: '(555) 456-7890',
    relationship: 'Mother',
    address: '456 Oak Street',
    city: 'Springfield',
    state: 'CA',
    zipCode: '94105',
    linkedStudents: ['STU-124'] as string[],
    emergencyContact: true,
    portalAccess: true
  });

  const [availableStudents] = useState([
    { id: 'STU-123', name: 'Marcus Williams' },
    { id: 'STU-124', name: 'Emma Rodriguez' },
    { id: 'STU-125', name: 'Jayden Smith' }
  ]);

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
    
    // Generate parent ID and activation code
    const parentId = `P-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const activationCode = `${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const parentName = `${formData.firstName} ${formData.lastName}`;
    
    toast.success('Parent/guardian added successfully');
    navigate('/admin/parents/success', {
      state: {
        parentId,
        parentName,
        email: formData.email,
        activationCode
      }
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <Link to="/admin/parents" className="inline-flex items-center gap-2 text-[#4A4A4A] hover:text-[#1A1A1A] mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Parents/Guardians
        </Link>

        <h1 className="text-2xl text-[#1A1A1A] mb-6">Add New Parent/Guardian</h1>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6 border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A]">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="parentId" className="text-[#4A4A4A]">Parent ID *</Label>
                <Input
                  id="parentId"
                  required
                  value={formData.parentId}
                  onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                  className="border-[#D0D0D0] text-[#1A1A1A]"
                  placeholder="PAR-001"
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
                    placeholder="(555) 123-4567"
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
                    placeholder="CA"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode" className="text-[#4A4A4A]">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="border-[#D0D0D0] text-[#1A1A1A]"
                    placeholder="12345"
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

          <div className="flex gap-3">
            <Button
              type="submit"
              className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
            >
              Add Parent/Guardian
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
        </form>
      </div>
    </AdminLayout>
  );
}