import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Textarea } from '@/app/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { STUDENTS, STAFF, MARCUS_PROFILE } from '@/data/constants';
import { toast } from 'sonner';

export default function IncidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [followUpNote, setFollowUpNote] = useState('');
  const [notes, setNotes] = useState<Array<{ text: string; author: string; date: string; role: 'teacher' | 'expert' }>>([ 
    { text: 'I\'ve tried the visual timer strategy you recommended. Marcus responds well to it during independent work, but still struggles with timed assessments.', author: 'Sarah Johnson', date: 'Jan 15, 2026 at 2:30 PM', role: 'teacher' },
    { text: 'That\'s good progress! For timed assessments, let\'s try providing a check-in at the halfway point. Also consider giving him a choice between two assessment formats.', author: 'Dr. Patricia Martinez', date: 'Jan 16, 2026 at 9:15 AM', role: 'expert' },
  ]);

  // Find the incident from Marcus's profile or use placeholder
  const incident = MARCUS_PROFILE.incidents.find(inc => inc.id === id) || MARCUS_PROFILE.incidents[0];
  const student = STUDENTS.find(s => s.id === 'STU-4298');

  const caseData = {
    id: 'ESC-2026-0045',
    student: student || STUDENTS[0],
    teacher: STAFF['T-2024-0847'],
    submittedDate: incident.date,
    linkedIncident: incident.id,
    teacherNote: incident.notes || '',
  };

  const incidentDetails = {
    date: incident.date,
    time: incident.time,
    location: incident.location,
    category: incident.category,
    severity: incident.severity,
    triggers: incident.trigger.split(',').map(t => t.trim()),
    strategies: incident.strategies,
    notes: incident.notes,
    outcome: incident.outcome,
  };

  const handleAddNote = () => {
    if (!followUpNote.trim()) return;

    const newNote = {
      text: followUpNote,
      author: 'Sarah Johnson',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' at ' + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      role: 'teacher' as const
    };

    setNotes([...notes, newNote]);
    setFollowUpNote('');
    toast.success('Follow-up note added successfully');
  };

  return (
    <TeacherLayout>
      <div className="p-8 max-w-5xl">
        <Link to="/teacher/incidents" className="inline-flex items-center gap-2 text-[#4A4A4A] hover:text-[#1A1A1A] mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to My Incidents
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl text-[#1A1A1A] mb-2">Incident Detail</h1>
            <p className="text-[#4A4A4A]">{caseData.id}</p>
          </div>
        </div>

        <Card className="mb-6 border-[#D0D0D0]">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-[#1A1A1A]">Student</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[#1A1A1A] font-medium mb-1">{caseData.student.name}</div>
                <div className="text-sm text-[#757575]">
                  {caseData.student.id} • Grade {caseData.student.grade} • {caseData.student.primaryTeacher}
                </div>
              </div>
              <Link to={`/teacher/students/${caseData.student.id}`}>
                <Button variant="outline" className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]">
                  View Full Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card className="border-[#D0D0D0]">
            <CardContent className="pt-6">
              <div className="text-sm text-[#757575] mb-1">Submitted By</div>
              <div className="text-[#1A1A1A] font-medium">{caseData.teacher.name}</div>
            </CardContent>
          </Card>

          <Card className="border-[#D0D0D0]">
            <CardContent className="pt-6">
              <div className="text-sm text-[#757575] mb-1">Submitted Date</div>
              <div className="text-[#1A1A1A] font-medium">
                {new Date(caseData.submittedDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 border-[#D0D0D0]">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-[#1A1A1A]">Parent Acknowledgment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="bg-[#757575] text-white">
              Acknowledged
            </Badge>
            <p className="text-sm text-[#757575] mt-2">
              Parent acknowledged this incident on Jan 15, 2026 at 3:45 PM
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6 border-[#D0D0D0]">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-[#1A1A1A]">Incident Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-[#757575] mb-1">Date & Time</div>
                <div className="text-[#1A1A1A] font-medium">{incidentDetails.date} at {incidentDetails.time}</div>
              </div>
              <div>
                <div className="text-sm text-[#757575] mb-1">Location</div>
                <div className="text-[#1A1A1A] font-medium">{incidentDetails.location}</div>
              </div>
              <div>
                <div className="text-sm text-[#757575] mb-1">Category</div>
                <div className="text-[#1A1A1A] font-medium">{incidentDetails.category}</div>
              </div>
              <div>
                <div className="text-sm text-[#757575] mb-1">Severity</div>
                <Badge className={
                  incidentDetails.severity === 'High' ? 'bg-[#333333] text-white' :
                  incidentDetails.severity === 'Medium' ? 'bg-[#757575] text-white' :
                  'bg-[#E0E0E0] text-[#4A4A4A]'
                }>
                  {incidentDetails.severity}
                </Badge>
              </div>
            </div>
            {incidentDetails.notes && (
              <div className="mt-4 pt-4 border-t border-[#E0E0E0]">
                <div className="text-sm text-[#757575] mb-2">Incident Notes</div>
                <p className="text-[#1A1A1A] text-sm">{incidentDetails.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card className="border-[#D0D0D0]">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-[#1A1A1A]">Antecedent Triggers</CardTitle>
              <p className="text-sm text-[#757575]">Triggers identified by teacher for this incident</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {incidentDetails.triggers.map((trigger, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-[#F5F5F5] rounded-lg">
                    <div className="text-[#1A1A1A]">{trigger}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#D0D0D0]">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-[#1A1A1A]">Intervention Strategies Used</CardTitle>
              <p className="text-sm text-[#757575]">Strategies attempted by teacher during this incident</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {incidentDetails.strategies.map((strategy, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-[#F5F5F5] rounded-lg">
                    <div className="text-[#1A1A1A]">{strategy}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 border-[#D0D0D0]">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-[#1A1A1A]">Incident Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="text-sm text-[#757575] mb-2">AI-Generated Summary</div>
              <div className="p-4 bg-[#F5F5F5] rounded-lg border border-[#E0E0E0]">
                <p className="text-[#1A1A1A] text-sm leading-relaxed">
                  Student exhibited escalating frustration during timed math assessment, resulting in property destruction (crumpled paper, thrown pencil) and elopement from classroom. This represents the third similar incident within 5 days, indicating a clear pattern of academic task avoidance with increasing severity. Antecedent: time pressure on math tasks. Behavior: verbal outburst followed by physical actions. Current interventions (verbal redirection, short breaks) showing declining effectiveness.
                </p>
              </div>
            </div>
            <div>
              <div className="text-sm text-[#757575] mb-2">Teacher's Note</div>
              <p className="text-[#1A1A1A]">{caseData.teacherNote}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-[#D0D0D0]">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-[#1A1A1A]">Expert Feedback</CardTitle>
            <p className="text-sm text-[#757575]">Expert will provide analysis and recommendations</p>
          </CardHeader>
          <CardContent>
            {incident.expertNotes ? (
              <p className="text-[#1A1A1A]">{incident.expertNotes}</p>
            ) : (
              <div className="p-4 bg-[#F5F5F5] rounded-lg border border-[#E0E0E0]">
                <p className="text-sm text-[#757575]">
                  Waiting for expert feedback...
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-6 border-[#D0D0D0]">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-[#1A1A1A]">Follow-up Notes</CardTitle>
            <p className="text-sm text-[#757575]">Add updates or observations related to this case</p>
          </CardHeader>
          <CardContent>
            {notes.length > 0 && (
              <div className="mb-4 space-y-3">
                {notes.map((note, index) => (
                  <div key={index} className={`p-4 rounded-lg ${note.role === 'teacher' ? 'bg-[#F5F5F5]' : 'bg-[#E8E8E8]'}`}>
                    <p className="text-[#1A1A1A] mb-2">{note.text}</p>
                    <div className="flex items-center gap-2 text-xs text-[#757575]">
                      <span className="font-medium">{note.author}</span>
                      <span>•</span>
                      <span>{note.date}</span>
                      <span>•</span>
                      <span className="capitalize">{note.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Textarea
              placeholder="Add a follow-up note..."
              value={followUpNote}
              onChange={(e) => setFollowUpNote(e.target.value)}
              rows={3}
              className="border-[#D0D0D0] text-[#1A1A1A] placeholder:text-[#757575] mb-3"
            />
            <Button
              onClick={handleAddNote}
              disabled={!followUpNote.trim()}
              className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
            >
              Add Follow-up Note
            </Button>
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  );
}