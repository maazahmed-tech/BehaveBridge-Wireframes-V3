import { Link, useParams } from 'react-router-dom';
import { ParentLayout } from '@/app/components/ParentLayout';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { ArrowLeft, MessageSquare, CheckCircle2 } from 'lucide-react';
import { STUDENTS, MARCUS_PROFILE } from '@/data/constants';

export default function ChildProfile() {
  const { id } = useParams();
  const student = STUDENTS.find((s) => s.id === id) || STUDENTS[0];

  const recentIncidents = [
    {
      id: 'ESC-2026-0234',
      date: '2026-01-15',
      time: '09:45 AM',
      trigger: 'Peer conflict during group work',
      status: 'new',
    },
    {
      id: 'ESC-2026-0198',
      date: '2026-01-12',
      time: '11:00 AM',
      trigger: 'Academic frustration during math quiz',
      status: 'seen',
      hasExpertNotes: true,
    },
    {
      id: 'ESC-2026-0176',
      date: '2026-01-10',
      time: '02:15 PM',
      trigger: 'Transition between activities',
      status: 'acknowledged',
    },
  ];

  return (
    <ParentLayout>
      <div className="p-8 max-w-5xl">
        <Link to="/parent/dashboard" className="inline-flex items-center gap-2 text-[#4A4A4A] hover:text-[#1A1A1A] mb-6">
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
          <Card className="border-[#D0D0D0]">
            <CardContent className="pt-6">
              <div className="text-3xl text-[#1A1A1A] font-bold mb-1">3</div>
              <div className="text-sm text-[#757575]">Incidents This Month</div>
            </CardContent>
          </Card>

          <Card className="border-[#D0D0D0]">
            <CardContent className="pt-6">
              <div className="text-3xl text-[#1A1A1A] font-bold mb-1">1</div>
              <div className="text-sm text-[#757575]">Open Cases</div>
            </CardContent>
          </Card>

          <Card className="border-[#D0D0D0]">
            <CardContent className="pt-6">
              <div className="text-3xl text-[#1A1A1A] font-bold mb-1">2 days</div>
              <div className="text-sm text-[#757575]">Last Activity</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 border-[#D0D0D0]">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-[#1A1A1A]">Recent Incidents</CardTitle>
              <Link to={`/parent/children/${id}/incidents`}>
                <Button variant="outline" size="sm" className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentIncidents.map((incident) => (
                <div
                  key={incident.id}
                  className={`p-4 border rounded-lg hover:bg-[#FAFAFA] ${
                    incident.status === 'new' 
                      ? 'border-[#333333] bg-[#F5F5F5]' 
                      : 'border-[#E0E0E0] bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#1A1A1A] font-medium">
                          {new Date(incident.date).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                        {incident.status === 'new' && (
                          <Badge className="bg-[#333333] text-white">New</Badge>
                        )}
                        {incident.hasExpertNotes && (
                          <Badge variant="outline" className="border-[#9E9E9E] text-[#4A4A4A]">
                            Expert Review
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-[#757575]">{incident.time}</div>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/parent/children/${id}/incidents/${incident.id}`}>
                        <Button size="sm" variant="outline" className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]">
                          View Details
                        </Button>
                      </Link>
                      {incident.status === 'new' && (
                        <Button size="sm" variant="outline" className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]">
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Mark as Seen
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-[#4A4A4A]">{incident.trigger}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#D0D0D0] bg-[#FAFAFA]">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="text-[#4A4A4A] text-sm">
                <p className="mb-2">
                  <strong>What you're seeing:</strong> These incident reports help us work together to support {student.firstName}. 
                  They include what happened, what strategies were used, and the outcome.
                </p>
                <p>
                  <strong>Questions or concerns?</strong> Use the "Message Expert" button to connect directly with 
                  {student.behavioralExpert} who oversees {student.firstName}'s behavioral support plan.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}