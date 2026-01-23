import { useLocation, useNavigate } from 'react-router-dom';
import { Check, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

export default function IncidentConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};

  return (
    <TeacherLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-8 border border-[#D0D0D0] bg-white text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#E0E0E0] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-[#333333]" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">
              Incident Submitted Successfully
            </h1>
            <p className="text-[#757575]">
              Your incident report has been recorded and saved.
            </p>
          </div>

          <Card className="p-6 border border-[#E0E0E0] bg-[#F5F5F5] text-left space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#1A1A1A]">Incident Summary</h3>
              <Badge variant="outline" className="border-[#9E9E9E] text-[#4A4A4A]">
                {data.incidentId}
              </Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#757575]">Student:</span>
                <span className="text-[#1A1A1A] font-medium">
                  {data.student?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#757575]">Date/Time:</span>
                <span className="text-[#1A1A1A]">
                  {data.date} at {data.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#757575]">Location:</span>
                <span className="text-[#1A1A1A] capitalize">{data.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#757575]">Category:</span>
                <span className="text-[#1A1A1A] capitalize">{data.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#757575]">Severity:</span>
                <span className="text-[#1A1A1A] capitalize">{data.severity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#757575]">Outcome:</span>
                <span className="text-[#1A1A1A] capitalize">{data.outcome}</span>
              </div>
            </div>
          </Card>

          {data.outcome === 'escalated' && (
            <Card className="p-4 border border-[#333333] bg-[#F5F5F5] text-left">
              <p className="text-sm text-[#4A4A4A]">
                <strong className="text-[#1A1A1A]">Escalation submitted:</strong> This incident has been escalated to a behavioral expert for review. You will receive a notification when the expert provides feedback.
              </p>
            </Card>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button
              onClick={() => navigate(`/teacher/incidents/${data.incidentId}`)}
              variant="outline"
              className="border-[#D0D0D0] text-[#333333] hover:bg-[#F5F5F5] rounded-lg"
            >
              View Incident Details
            </Button>
            <Button
              onClick={() => navigate('/teacher/incidents/new')}
              variant="outline"
              className="border-[#D0D0D0] text-[#333333] hover:bg-[#F5F5F5] rounded-lg"
            >
              Log Another Incident
            </Button>
            <Button
              onClick={() => navigate('/teacher/dashboard')}
              className="bg-[#333333] hover:bg-[#1A1A1A] text-white rounded-lg"
            >
              Return to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    </TeacherLayout>
  );
}