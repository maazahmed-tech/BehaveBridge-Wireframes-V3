import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ParentLayout } from '@/app/components/ParentLayout';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { ArrowLeft, CheckCircle, User, Clock, MapPin, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export function IncidentWithExpertNotes() {
  const { childId, incidentId } = useParams();
  const navigate = useNavigate();
  const [acknowledged, setAcknowledged] = useState(false);
  const [feedback, setFeedback] = useState('');

  const incident = {
    id: incidentId || 'ESC-2026-0234',
    date: 'January 15, 2026',
    time: '09:45 AM',
    location: 'Classroom - Math Period',
    category: 'Peer Conflict',
    description:
      'Marcus had a disagreement with a classmate during group work. The situation escalated when materials were not being shared equally within the group.',
    strategiesTried: [
      { name: 'Verbal Redirection', effectiveness: 'Partially Effective' },
      { name: 'Short Break (5 min)', effectiveness: 'Effective' },
      { name: 'One-on-One Check-in', effectiveness: 'Effective' },
    ],
    outcome:
      'Marcus was able to return to class after a 5-minute break and one-on-one check-in. He completed the group activity with a different partner and remained focused for the rest of the period.',
    loggedBy: 'Mrs. Maria Johnson',
    loggedRole: '4th Grade Lead Teacher',
  };

  const expertAssessment = {
    expertName: 'Dr. Sarah Williams',
    expertRole: 'Lead Behavioral Specialist',
    assessmentDate: 'January 15, 2026, 2:30 PM',
    notes:
      'This incident is consistent with Marcus\'s known triggers around peer interactions during collaborative work. The teacher\'s intervention strategy was appropriate and effective. I recommend continuing with short breaks and one-on-one check-ins as primary strategies.',
    recommendations: [
      'Continue monitoring peer interactions during group activities',
      'Consider pre-teaching group work expectations before collaborative tasks',
      'Maintain consistent use of short breaks when early signs of frustration appear',
    ],
    followUp: 'Scheduled follow-up check-in for next week to review progress.',
  };

  const handleAcknowledge = () => {
    setAcknowledged(true);
    toast.success('Incident acknowledged');
    if (feedback.trim()) {
      toast.success('Your feedback has been sent to the expert');
    }
    setTimeout(() => {
      navigate(`/parent/children/${childId}`);
    }, 1500);
  };

  return (
    <ParentLayout>
      <div className="p-8 max-w-4xl">
        <Link
          to={`/parent/children/${childId}`}
          className="inline-flex items-center gap-2 text-[#4A4A4A] hover:text-[#1A1A1A] mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </Link>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold text-[#1A1A1A]">{incident.date}</h1>
            <Badge className="bg-[#F5F5F5] text-[#1A1A1A] border border-[#D0D0D0]">
              {incident.category}
            </Badge>
          </div>
          <p className="text-sm text-[#757575]">Incident ID: {incident.id}</p>
        </div>

        <div className="space-y-6">
          {/* What Happened */}
          <Card className="border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-lg text-[#1A1A1A]">What Happened</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#757575]" />
                  <div>
                    <span className="text-[#757575]">Time:</span>
                    <span className="ml-2 text-[#1A1A1A]">{incident.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#757575]" />
                  <div>
                    <span className="text-[#757575]">Location:</span>
                    <span className="ml-2 text-[#1A1A1A]">{incident.location}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-[#1A1A1A] mb-2">Description</h4>
                <p className="text-sm text-[#4A4A4A]">{incident.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* What Was Tried */}
          <Card className="border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-lg text-[#1A1A1A]">What Was Tried</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {incident.strategiesTried.map((strategy, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded"
                  >
                    <span className="text-sm text-[#1A1A1A]">{strategy.name}</span>
                    <Badge
                      variant="outline"
                      className={
                        strategy.effectiveness === 'Effective'
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-[#4A4A4A] border-[#D0D0D0]'
                      }
                    >
                      {strategy.effectiveness}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Outcome */}
          <Card className="border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-lg text-[#1A1A1A]">Outcome</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#4A4A4A]">{incident.outcome}</p>
            </CardContent>
          </Card>

          {/* Expert Assessment - NEW SECTION */}
          <Card className="border-[#1A1A1A] border-2">
            <CardHeader className="bg-[#F5F5F5]">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-[#1A1A1A]" />
                <CardTitle className="text-lg text-[#1A1A1A]">
                  Expert Assessment
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-[#1A1A1A]">
                      {expertAssessment.expertName}
                    </p>
                    <p className="text-sm text-[#757575]">
                      {expertAssessment.expertRole}
                    </p>
                  </div>
                  <p className="text-xs text-[#757575]">
                    {expertAssessment.assessmentDate}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#1A1A1A] mb-2">
                  Expert Notes
                </h4>
                <p className="text-sm text-[#4A4A4A]">{expertAssessment.notes}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#1A1A1A] mb-2">
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {expertAssessment.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#4A4A4A] mt-0.5 flex-shrink-0" />
                      <span className="text-[#4A4A4A]">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-[#D0D0D0]">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[#757575] mt-0.5" />
                  <p className="text-sm text-[#757575]">{expertAssessment.followUp}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logged By */}
          <Card className="border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-lg text-[#1A1A1A]">Logged By</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E0E0E0] flex items-center justify-center">
                  <User className="w-5 h-5 text-[#757575]" />
                </div>
                <div>
                  <p className="font-medium text-[#1A1A1A]">{incident.loggedBy}</p>
                  <p className="text-sm text-[#757575]">{incident.loggedRole}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Acknowledgment */}
          <Card className="border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-lg text-[#1A1A1A]">
                Your Acknowledgment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {acknowledged ? (
                <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                  <CheckCircle className="w-5 h-5 text-[#1A1A1A]" />
                  <span>Acknowledged on {new Date().toLocaleDateString()}</span>
                </div>
              ) : (
                <>
                  <p className="text-sm text-[#757575]">
                    Status: <span className="text-[#1A1A1A]">Not yet acknowledged</span>
                  </p>
                  <div>
                    <Label htmlFor="feedback" className="text-sm text-[#1A1A1A]">
                      Optional Feedback to Expert
                    </Label>
                    <Textarea
                      id="feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Share any observations, questions, or concerns with the behavioral expert..."
                      className="mt-2 min-h-[100px]"
                    />
                  </div>
                  <Button
                    onClick={handleAcknowledge}
                    className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Acknowledged
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ParentLayout>
  );
}