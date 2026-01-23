import { Link, useParams } from 'react-router-dom';
import { ParentLayout } from '@/app/components/ParentLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { ArrowLeft, MessageSquare, CheckCircle2 } from 'lucide-react';
import { STUDENTS } from '@/data/constants';

export function NoIncidentsState() {
  const { id } = useParams();
  const student = STUDENTS.find((s) => s.id === id) || STUDENTS[0];

  return (
    <ParentLayout>
      <div className="p-8 max-w-5xl">
        <Link
          to="/parent/dashboard"
          className="inline-flex items-center gap-2 text-[#4A4A4A] hover:text-[#1A1A1A] mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#E0E0E0] flex items-center justify-center">
                <span className="text-2xl text-[#4A4A4A]">
                  {student.firstName[0]}{student.lastName[0]}
                </span>
              </div>
              <div>
                <h1 className="text-2xl text-[#1A1A1A] mb-1">{student.name}</h1>
                <p className="text-[#4A4A4A]">
                  Grade {student.grade} • {student.primaryTeacher}
                </p>
                <p className="text-sm text-[#757575]">
                  Behavioral Expert: {student.behavioralExpert}
                </p>
              </div>
            </div>
            <Link to={`/parent/messages?childId=${id}`}>
              <Button className="bg-[#333333] hover:bg-[#1A1A1A] text-white">
                <MessageSquare className="w-4 h-4 mr-2" />
                Message Expert
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="border-[#D0D0D0] p-6">
            <div className="text-3xl text-[#1A1A1A] font-bold mb-1">0</div>
            <div className="text-sm text-[#757575]">Incidents This Month</div>
          </Card>

          <Card className="border-[#D0D0D0] p-6">
            <div className="text-3xl text-[#1A1A1A] font-bold mb-1">0</div>
            <div className="text-sm text-[#757575]">Open Cases</div>
          </Card>

          <Card className="border-[#D0D0D0] p-6">
            <div className="text-3xl text-[#1A1A1A] font-bold mb-1">—</div>
            <div className="text-sm text-[#757575]">Last Activity</div>
          </Card>
        </div>

        <Card className="border-[#D0D0D0] p-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F5F5F5] mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#4A4A4A]" />
            </div>
            <h2 className="text-xl text-[#1A1A1A] font-semibold mb-2">
              No Incidents Recorded
            </h2>
            <p className="text-[#4A4A4A] mb-6 max-w-md mx-auto">
              This is great news! {student.firstName} has no behavioral incidents on record.
              Keep up the excellent work!
            </p>
            <div className="bg-[#F5F5F5] rounded-lg p-4 max-w-lg mx-auto text-left">
              <p className="text-sm text-[#1A1A1A] font-medium mb-2">
                What this means:
              </p>
              <ul className="text-sm text-[#4A4A4A] space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    {student.firstName} is meeting behavioral expectations in the classroom
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    Teachers have not identified any patterns requiring documentation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    You'll be notified immediately if any incidents are logged
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-6 flex gap-3 justify-center">
              <Link to="/parent/dashboard">
                <Button variant="outline" className="border-[#9E9E9E] text-[#333333]">
                  Back to Dashboard
                </Button>
              </Link>
              <Link to={`/parent/messages?childId=${id}`}>
                <Button className="bg-[#333333] hover:bg-[#1A1A1A] text-white">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message Expert
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </ParentLayout>
  );
}
