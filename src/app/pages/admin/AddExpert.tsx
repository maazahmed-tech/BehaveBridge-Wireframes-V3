import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function AddExpert() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    expertId: '',
    title: 'Dr.',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@behaviorexperts.com',
    phone: '(555) 987-6543',
    credentials: 'BCBA, PhD',
    specializations: 'Autism Spectrum, Anxiety, ADHD',
    licenseNumber: 'BCBA-12345',
    bio: 'Board Certified Behavior Analyst with 12 years of experience working with K-5 students. Specializes in positive behavior interventions and collaborative consultation.'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate expert ID
    const expertId = `BE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const expertName = `${formData.firstName} ${formData.lastName}`;
    
    toast.success('Behavioral expert added successfully');
    navigate('/admin/experts/success', {
      state: { expertId, expertName, email: formData.email }
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <Link to="/admin/experts" className="inline-flex items-center gap-2 text-[#4A4A4A] hover:text-[#1A1A1A] mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Behavioral Experts
        </Link>

        <h1 className="text-2xl text-[#1A1A1A] mb-6">Add New Behavioral Expert</h1>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6 border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A]">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="expertId" className="text-[#4A4A4A]">Expert ID *</Label>
                <Input
                  id="expertId"
                  required
                  value={formData.expertId}
                  onChange={(e) => setFormData({ ...formData, expertId: e.target.value })}
                  className="border-[#D0D0D0] text-[#1A1A1A]"
                  placeholder="EXP-001"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="title" className="text-[#4A4A4A]">Title</Label>
                  <select
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-[#D0D0D0] rounded-md px-3 py-2 text-[#1A1A1A]"
                  >
                    <option value="Dr.">Dr.</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                  </select>
                </div>
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
            </CardContent>
          </Card>

          <Card className="mb-6 border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A]">Professional Qualifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="credentials" className="text-[#4A4A4A]">Credentials & Certifications *</Label>
                <Input
                  id="credentials"
                  required
                  value={formData.credentials}
                  onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                  className="border-[#D0D0D0] text-[#1A1A1A]"
                  placeholder="e.g., Ph.D. in School Psychology, BCBA"
                />
              </div>

              <div>
                <Label htmlFor="licenseNumber" className="text-[#4A4A4A]">License Number</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  className="border-[#D0D0D0] text-[#1A1A1A]"
                  placeholder="Professional license number"
                />
              </div>

              <div>
                <Label htmlFor="specializations" className="text-[#4A4A4A]">Areas of Specialization *</Label>
                <Input
                  id="specializations"
                  required
                  value={formData.specializations}
                  onChange={(e) => setFormData({ ...formData, specializations: e.target.value })}
                  className="border-[#D0D0D0] text-[#1A1A1A]"
                  placeholder="e.g., ADHD, Autism Spectrum, Behavioral Interventions"
                />
              </div>

              <div>
                <Label htmlFor="bio" className="text-[#4A4A4A]">Professional Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="border-[#D0D0D0] text-[#1A1A1A]"
                  placeholder="Brief professional background and expertise..."
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button
              type="submit"
              className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
            >
              Add Expert
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/experts')}
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