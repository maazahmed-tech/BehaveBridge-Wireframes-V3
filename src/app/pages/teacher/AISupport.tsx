import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Checkbox } from '@/app/components/ui/checkbox';
import { STUDENTS, MARCUS_PROFILE } from '@/data/constants';

export default function AISupport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [situationDescription, setSituationDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [triedActions, setTriedActions] = useState<string[]>([]);

  const student = STUDENTS.find((s) => s.id === id);

  const handleGetSuggestions = () => {
    setLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setLoading(false);
      setShowRecommendations(true);
    }, 2000);
  };

  const aiRecommendations = [
    {
      action: 'Offer a 5-minute movement break in the hallway',
      successRate: 85,
      rationale: 'Based on Marcus\'s history, movement breaks have shown 85% success rate in similar situations'
    },
    {
      action: 'Provide one-on-one redirection away from peers',
      successRate: 75,
      rationale: 'Effective in 15 of 20 peer conflict incidents'
    },
    {
      action: 'Use visual schedule to preview upcoming transitions',
      successRate: 70,
      rationale: 'Reduces transition-related incidents by 70% for this student'
    },
    {
      action: 'Offer choice between two acceptable activities',
      successRate: 65,
      rationale: 'Gives sense of control, successful in 13 of 20 similar situations'
    },
  ];

  const escalationCriteria = [
    'Behavior continues for more than 15 minutes despite interventions',
    'Student poses safety risk to self or others',
    'This is the 3rd incident this week with declining strategy effectiveness',
    'Student refuses all attempted de-escalation strategies',
  ];

  if (loading) {
    return (
      <TeacherLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-[#333333] animate-pulse" />
            <div className="text-xl text-[#1A1A1A]">Analyzing {student?.firstName}'s profile...</div>
          </div>
          <div className="text-[#757575]">Reviewing incident history and effective strategies</div>
        </div>
      </TeacherLayout>
    );
  }

  return (
    <TeacherLayout>
      <div className="p-8 max-w-5xl">
        <Link to={`/teacher/students/${id}`} className="inline-flex items-center gap-2 text-[#4A4A4A] hover:text-[#1A1A1A] mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Student Profile
        </Link>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-[#333333]" />
            <h1 className="text-2xl text-[#1A1A1A]">AI Decision Support</h1>
          </div>
          <p className="text-[#4A4A4A]">Get personalized intervention suggestions for {student?.name}</p>
        </div>

        <Card className="mb-6 border-[#D0D0D0]">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-[#1A1A1A]">Describe the Current Situation</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Describe what's happening with the student right now. Include context about the activity, environment, and observed behaviors..."
              value={situationDescription}
              onChange={(e) => setSituationDescription(e.target.value)}
              rows={6}
              className="border-[#D0D0D0] text-[#1A1A1A] placeholder:text-[#757575] mb-4"
            />
            <Button
              onClick={handleGetSuggestions}
              disabled={!situationDescription.trim() || showRecommendations}
              className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Get Intervention Suggestions
            </Button>
          </CardContent>
        </Card>

        {showRecommendations && (
          <>
            <Card className="mb-6 border-[#D0D0D0]">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-[#1A1A1A] flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5" />
                  Suggested Immediate Actions
                </CardTitle>
                <p className="text-sm text-[#757575]">Based on {student?.firstName}'s behavioral profile and incident history</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiRecommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-[#F5F5F5] rounded-lg">
                      <Checkbox
                        id={`action-${index}`}
                        checked={triedActions.includes(rec.action)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setTriedActions([...triedActions, rec.action]);
                          } else {
                            setTriedActions(triedActions.filter(a => a !== rec.action));
                          }
                        }}
                        className="mt-1 border-[#9E9E9E]"
                      />
                      <div className="flex-1">
                        <label htmlFor={`action-${index}`} className="cursor-pointer">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <p className="text-[#1A1A1A] font-medium">{index + 1}. {rec.action}</p>
                            <Badge variant="outline" className="border-[#9E9E9E] text-[#4A4A4A] shrink-0">
                              {rec.successRate}% success
                            </Badge>
                          </div>
                          <p className="text-sm text-[#757575]">{rec.rationale}</p>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6 border-[#D0D0D0] bg-[#FAFAFA]">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-[#1A1A1A] flex items-center gap-2">
                  <ThumbsDown className="w-5 h-5 text-[#4A4A4A]" />
                  Consider Escalation If:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {escalationCriteria.map((criteria, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#4A4A4A] mt-1">•</span>
                      <span className="text-[#4A4A4A]">{criteria}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-[#D0D0D0] flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/teacher/incidents/new/step1?studentId=${id}`)}
                    className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
                  >
                    Request Expert Review
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button
                onClick={() => navigate(`/teacher/incidents/new/step2?studentId=${id}`)}
                className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
              >
                Save to Incident Record
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate(`/teacher/students/${id}`)}
                className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
              >
                Return to Profile
              </Button>
            </div>
          </>
        )}
      </div>
    </TeacherLayout>
  );
}