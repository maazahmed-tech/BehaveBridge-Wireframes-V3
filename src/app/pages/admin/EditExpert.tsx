import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Badge } from '@/app/components/ui/badge';
import { ArrowLeft, Award } from 'lucide-react';
import { toast } from 'sonner';

export default function EditExpert() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    expertId: 'EXP-001',
    title: 'Dr.',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.williams@behaviorexpert.com',
    phone: '(555) 234-5678',
    credentials: 'Ph.D. in School Psychology, BCBA',
    specializations: 'Behavioral Interventions, Autism Spectrum, ADHD',
    licenseNumber: 'PSY-12345',
    bio: 'Board Certified Behavior Analyst with 15 years of experience supporting students with behavioral challenges in educational settings.',
    maxCaseload: '15',
    availability: 'Full-time',
    status: 'Active'
  });

  const expertStats = {
    activeCases: 12,
    totalCases: 47,
    avgResponseTime: '18 min',
    successRate: 84
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Expert information updated successfully');
    navigate('/admin/experts');
  };

  const handleDeactivate = () => {
    if (window.confirm('Are you sure you want to deactivate this expert? Active cases will need to be reassigned.')) {
      toast.success('Expert deactivated');
      navigate('/admin/experts');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <Link to="/admin/experts" className="inline-flex items-center gap-2 text-[#4A4A4A] hover:text-[#1A1A1A] mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Behavioral Experts
        </Link>

        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl text-[#1A1A1A] mb-2">Edit Behavioral Expert</h1>
            <p className="text-[#757575]">{formData.expertId}</p>
          </div>
          <Badge className="bg-[#333333] text-white">
            {formData.status}
          </Badge>
        </div>

        {/* Expert Performance Overview */}
        <Card className="mb-6 border-[#333333] bg-[#FAFAFA]">
          <CardHeader>
            <CardTitle className="text-lg text-[#1A1A1A] flex items-center gap-2">
              <Award className="w-5 h-5" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-[#757575] mb-1">Active Cases</div>
                <div className="text-2xl font-semibold text-[#1A1A1A]">
                  {expertStats.activeCases}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#757575] mb-1">Total Cases</div>
                <div className="text-2xl font-semibold text-[#1A1A1A]">
                  {expertStats.totalCases}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#757575] mb-1">Avg Response</div>
                <div className="text-2xl font-semibold text-[#1A1A1A]">
                  {expertStats.avgResponseTime}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#757575] mb-1">Success Rate</div>
                <div className="text-2xl font-semibold text-[#1A1A1A]">
                  {expertStats.successRate}%
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
                <Label htmlFor="expertId" className="text-[#4A4A4A]">Expert ID</Label>
                <Input
                  id="expertId"
                  value={formData.expertId}
                  disabled
                  className="border-[#D0D0D0] text-[#757575] bg-[#F5F5F5]"
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
                  />
                </div>
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
                  <option value="On Leave">On Leave</option>
                </select>
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
                />
              </div>

              <div>
                <Label htmlFor="licenseNumber" className="text-[#4A4A4A]">License Number</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  className="border-[#D0D0D0] text-[#1A1A1A]"
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
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A]">Availability & Caseload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="availability" className="text-[#4A4A4A]">Availability *</Label>
                  <select
                    id="availability"
                    required
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full border border-[#D0D0D0] rounded-md px-3 py-2 text-[#1A1A1A]"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="On-call">On-call</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="maxCaseload" className="text-[#4A4A4A]">Maximum Caseload *</Label>
                  <Input
                    id="maxCaseload"
                    type="number"
                    required
                    value={formData.maxCaseload}
                    onChange={(e) => setFormData({ ...formData, maxCaseload: e.target.value })}
                    className="border-[#D0D0D0] text-[#1A1A1A]"
                  />
                  <p className="text-sm text-[#757575] mt-1">
                    Currently assigned: {expertStats.activeCases} / {formData.maxCaseload}
                  </p>
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
                onClick={() => navigate('/admin/experts')}
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
              Deactivate Expert
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
