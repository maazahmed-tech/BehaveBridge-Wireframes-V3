import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { STUDENTS, STAFF } from '@/data/constants';
import { toast } from 'sonner';

export default function NewIncidentStep5Outcome() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('student');
  const student = STUDENTS.find((s) => s.id === studentId);

  const [notes, setNotes] = useState('');
  const [outcome, setOutcome] = useState('');
  const [expertId, setExpertId] = useState('');
  const [escalationNote, setEscalationNote] = useState('');

  const experts = Object.values(STAFF).filter(s => s.id.startsWith('BE-'));

  const handleSubmit = () => {
    if (!outcome) {
      toast.error('Please select an outcome');
      return;
    }

    const incidentId = `ESC-2026-${Math.floor(Math.random() * 9000) + 1000}`;
    
    navigate('/teacher/incidents/new/confirmation', {
      state: {
        incidentId,
        student,
        date: searchParams.get('date'),
        time: searchParams.get('time'),
        location: searchParams.get('location'),
        category: searchParams.get('category'),
        severity: searchParams.get('severity'),
        triggers: searchParams.get('triggers'),
        strategies: searchParams.get('strategies'),
        notes,
        outcome,
        expertId,
      },
    });

    toast.success('Incident submitted successfully!');
  };

  const handleBack = () => {
    navigate(`/teacher/incidents/new/step4?${searchParams.toString()}`);
  };

  if (!student) {
    return null;
  }

  return (
    <TeacherLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          to={`/teacher/incidents/new/step4?${searchParams.toString()}`}
          className="inline-flex items-center text-[#4A4A4A] hover:text-[#1A1A1A]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Log New Incident</h1>
          <p className="text-[#757575]">Step 5 of 5: Notes & Outcome</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2">
          <div className="flex-1 h-2 bg-[#333333] rounded-full"></div>
          <div className="flex-1 h-2 bg-[#333333] rounded-full"></div>
          <div className="flex-1 h-2 bg-[#333333] rounded-full"></div>
          <div className="flex-1 h-2 bg-[#333333] rounded-full"></div>
          <div className="flex-1 h-2 bg-[#333333] rounded-full"></div>
        </div>

        {/* Student Info */}
        <Card className="p-4 border border-[#D0D0D0] bg-[#F5F5F5]">
          <p className="text-sm text-[#757575]">Student:</p>
          <p className="font-semibold text-[#1A1A1A]">
            {student.name} • {student.id} • Grade {student.grade}
          </p>
        </Card>

        {/* Notes */}
        <Card className="p-6 border border-[#D0D0D0] bg-white space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="notes" className="text-[#1A1A1A]">
                Incident Notes
              </Label>
              <span className="text-sm text-[#757575]">
                {notes.length}/500
              </span>
            </div>
            <Textarea
              id="notes"
              placeholder="Describe what happened, context, and any additional details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value.slice(0, 500))}
              className="min-h-[120px] border-[#D0D0D0] focus:border-[#333333]"
            />
          </div>

          {/* Outcome */}
          <div>
            <Label className="text-[#1A1A1A] mb-3 block">
              Outcome <span className="text-red-500">*</span>
            </Label>
            <RadioGroup value={outcome} onValueChange={setOutcome}>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-3 border border-[#E0E0E0] rounded-lg">
                  <RadioGroupItem value="resolved" id="resolved" />
                  <Label htmlFor="resolved" className="flex-1 cursor-pointer">
                    <div className="font-medium text-[#1A1A1A]">Resolved</div>
                    <div className="text-sm text-[#757575]">
                      Behavior stopped, student returned to normal activities
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-[#E0E0E0] rounded-lg">
                  <RadioGroupItem value="escalated" id="escalated" />
                  <Label htmlFor="escalated" className="flex-1 cursor-pointer">
                    <div className="font-medium text-[#1A1A1A]">Escalated</div>
                    <div className="text-sm text-[#757575]">
                      Requires behavioral expert intervention
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            className="border-[#D0D0D0] text-[#333333] hover:bg-[#F5F5F5] rounded-lg"
          >
            ← Back
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#333333] hover:bg-[#1A1A1A] text-white rounded-lg"
          >
            Submit Incident
          </Button>
        </div>
      </div>
    </TeacherLayout>
  );
}