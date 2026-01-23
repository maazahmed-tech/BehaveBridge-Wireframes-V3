import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Link } from 'react-router-dom';
import { User, Mail, Calendar, FileText, CheckCircle2, XCircle } from 'lucide-react';

export default function ViewExpertAccount() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data
  const expert = {
    id: id || 'BE-2024-001',
    name: 'Dr. Sarah Mitchell',
    email: 'sarah.mitchell@lincolnelementary.edu',
    phone: '(555) 345-6789',
    expertId: 'BE-2024-001',
    status: 'Active',
    specialization: 'Behavioral Psychology',
    credentials: 'Ph.D. in Clinical Psychology, BCBA Certified',
    yearsExperience: 12,
    caseloadLimit: 15,
    currentCaseload: 8,
    createdDate: 'August 15, 2024',
    lastLogin: 'January 14, 2026 at 3:15 PM',
    accountActivated: true,
    passwordLastChanged: 'December 10, 2025',
    casesReviewed: 34,
    assessmentsCompleted: 28,
    parentContacts: 67,
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <header className="bg-white border-b border-[#D0D0D0] px-8 py-4 mb-8">
        <div>
          <Link to="/admin/experts" className="text-[#4A4A4A] hover:text-[#1A1A1A] text-sm mb-2 block">
            ← Back to Expert Management
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl text-[#1A1A1A]">{expert.name}</h1>
              <p className="text-sm text-[#757575] mt-1">Behavioral Expert Account Details</p>
            </div>
            <Badge className={`${
              expert.status === 'Active' ? 'bg-[#333333]' : 'bg-[#757575]'
            } text-white`}>
              {expert.status}
            </Badge>
          </div>
        </div>
      </header>

      <div className="px-8 pb-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Account Information */}
          <Card className="border-[#D0D0D0] p-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-[#333333]" />
              <h2 className="text-lg font-medium text-[#1A1A1A]">Account Information</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-[#757575]">Full Name</p>
                <p className="text-[#1A1A1A] font-medium">{expert.name}</p>
              </div>
              <div>
                <p className="text-sm text-[#757575]">Expert ID</p>
                <p className="text-[#1A1A1A] font-medium">{expert.expertId}</p>
              </div>
              <div>
                <p className="text-sm text-[#757575]">Specialization</p>
                <p className="text-[#1A1A1A]">{expert.specialization}</p>
              </div>
              <div>
                <p className="text-sm text-[#757575]">Credentials</p>
                <p className="text-[#1A1A1A]">{expert.credentials}</p>
              </div>
              <div>
                <p className="text-sm text-[#757575]">Years of Experience</p>
                <p className="text-[#1A1A1A]">{expert.yearsExperience} years</p>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="border-[#D0D0D0] p-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-[#333333]" />
              <h2 className="text-lg font-medium text-[#1A1A1A]">Contact Information</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-[#757575]">Email Address</p>
                <p className="text-[#1A1A1A] break-all">{expert.email}</p>
              </div>
              <div>
                <p className="text-sm text-[#757575]">Phone Number</p>
                <p className="text-[#1A1A1A]">{expert.phone}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Caseload Information */}
        <Card className="border-[#D0D0D0] p-6 mb-6">
          <h2 className="text-lg font-medium text-[#1A1A1A] mb-4">Caseload Information</h2>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-[#757575] mb-1">Current Caseload</p>
              <p className="text-3xl font-medium text-[#1A1A1A]">{expert.currentCaseload}</p>
            </div>
            <div>
              <p className="text-sm text-[#757575] mb-1">Maximum Capacity</p>
              <p className="text-3xl font-medium text-[#1A1A1A]">{expert.caseloadLimit}</p>
            </div>
            <div>
              <p className="text-sm text-[#757575] mb-1">Available Slots</p>
              <p className="text-3xl font-medium text-[#1A1A1A]">
                {expert.caseloadLimit - expert.currentCaseload}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-[#757575] mb-2">
              <span>Capacity Utilization</span>
              <span>{Math.round((expert.currentCaseload / expert.caseloadLimit) * 100)}%</span>
            </div>
            <div className="w-full h-3 bg-[#E0E0E0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#333333]"
                style={{ width: `${(expert.currentCaseload / expert.caseloadLimit) * 100}%` }}
              />
            </div>
          </div>
          <div className="mt-4">
            <Button
              variant="outline"
              onClick={() => navigate(`/admin/experts/${id}/caseload`)}
              className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
            >
              View Full Caseload
            </Button>
          </div>
        </Card>

        {/* Account Status */}
        <Card className="border-[#D0D0D0] p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-5 h-5 text-[#333333]" />
            <h2 className="text-lg font-medium text-[#1A1A1A]">Account Status</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              {expert.accountActivated ? (
                <CheckCircle2 className="w-5 h-5 text-[#333333] mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-[#757575] mt-0.5" />
              )}
              <div>
                <p className="text-sm text-[#757575]">Account Activation</p>
                <p className="text-[#1A1A1A] font-medium">
                  {expert.accountActivated ? 'Activated' : 'Not Activated'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#333333] mt-0.5" />
              <div>
                <p className="text-sm text-[#757575]">Account Created</p>
                <p className="text-[#1A1A1A]">{expert.createdDate}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-[#757575]">Last Login</p>
              <p className="text-[#1A1A1A]">{expert.lastLogin}</p>
            </div>
            <div>
              <p className="text-sm text-[#757575]">Password Last Changed</p>
              <p className="text-[#1A1A1A]">{expert.passwordLastChanged}</p>
            </div>
          </div>
        </Card>

        {/* Activity Summary */}
        <Card className="border-[#D0D0D0] p-6 mb-6">
          <h2 className="text-lg font-medium text-[#1A1A1A] mb-4">Activity Summary</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-4 bg-[#F5F5F5] rounded-lg">
              <p className="text-3xl font-medium text-[#1A1A1A] mb-1">{expert.casesReviewed}</p>
              <p className="text-sm text-[#757575]">Cases Reviewed</p>
            </div>
            <div className="text-center p-4 bg-[#F5F5F5] rounded-lg">
              <p className="text-3xl font-medium text-[#1A1A1A] mb-1">{expert.assessmentsCompleted}</p>
              <p className="text-sm text-[#757575]">Assessments Completed</p>
            </div>
            <div className="text-center p-4 bg-[#F5F5F5] rounded-lg">
              <p className="text-3xl font-medium text-[#1A1A1A] mb-1">{expert.parentContacts}</p>
              <p className="text-sm text-[#757575]">Parent Contacts</p>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/experts')}
            className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
          >
            Back to List
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/experts/${id}/edit`)}
            className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
          >
            Edit Expert
          </Button>
          <Button
            onClick={() => navigate(`/admin/experts/${id}/caseload`)}
            className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
          >
            Manage Caseload
          </Button>
        </div>
      </div>
    </div>
  );
}
