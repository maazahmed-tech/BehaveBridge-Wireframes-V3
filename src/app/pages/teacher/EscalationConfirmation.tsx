import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { STAFF } from '@/data/constants';

export default function EscalationConfirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { incidentId, expertId, note } = location.state || {};

  const expert = expertId ? STAFF[expertId as keyof typeof STAFF] : null;

  return (
    <TeacherLayout>
      <div className="p-8 max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#E0E0E0] flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10 text-[#333333]" />
          </div>
          <h1 className="text-2xl text-[#1A1A1A] mb-2">Escalation Submitted</h1>
          <p className="text-[#4A4A4A]">{expert?.name} has been notified and will review this case</p>
        </div>

        <Card className="mb-6 border-[#D0D0D0]">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-[#E0E0E0]">
              <div>
                <div className="text-sm text-[#757575] mb-1">Escalation ID</div>
                <div className="text-[#1A1A1A] font-medium">{id}</div>
              </div>
              <div>
                <div className="text-sm text-[#757575] mb-1">Status</div>
                <div className="text-[#1A1A1A] font-medium">Pending Review</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-[#757575] mb-1">Linked Incident</div>
                <div className="text-[#1A1A1A]">{incidentId}</div>
              </div>
              <div>
                <div className="text-sm text-[#757575] mb-1">Assigned Expert</div>
                <div className="text-[#1A1A1A]">{expert?.name}</div>
              </div>
            </div>

            <div>
              <div className="text-sm text-[#757575] mb-1">Submitted</div>
              <div className="text-[#1A1A1A]">{new Date().toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 border-[#D0D0D0] bg-[#FAFAFA]">
          <CardContent className="pt-6">
            <p className="text-sm text-[#4A4A4A]">
              The behavioral expert will review this escalation and provide feedback typically within 24 hours. 
              You'll receive a notification when they respond. You can track the status in your Escalation Status list.
            </p>
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => navigate(`/teacher/escalations/${id}`)}
            className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
          >
            View Escalation Status
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/teacher/dashboard')}
            className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </TeacherLayout>
  );
}