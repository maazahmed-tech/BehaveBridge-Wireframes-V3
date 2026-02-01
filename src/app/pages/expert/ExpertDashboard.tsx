import { useNavigate } from 'react-router-dom';
import { AlertTriangle, User } from 'lucide-react';
import { ExpertLayout } from '@/app/components/ExpertLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

export default function ExpertDashboard() {
  const navigate = useNavigate();
  const today = 'Thursday, January 15, 2026';

  const caseStats = {
    pendingReview: 5,
    activeCases: 3,
    closedThisWeek: 12,
  };

  const pendingCases = [
    {
      id: 'ESC-2026-0089',
      priority: 'High',
      student: 'Marcus Thompson',
      grade: 4,
      teacher: 'Mrs. Maria Johnson',
      date: 'Jan 15, 2026',
      time: '11:05 AM',
      trigger: 'Academic frustration - 3rd incident this week',
      note: 'Pattern identified - strategy effectiveness declining. Marcus refused...',
    },
    {
      id: 'ESC-2026-0087',
      priority: 'Medium',
      student: 'Sofia Garcia',
      grade: 4,
      teacher: 'Mrs. Maria Johnson',
      date: 'Jan 14, 2026',
      time: '2:30 PM',
      trigger: 'Peer conflict during group work',
      note: 'Sofia became upset after being excluded from a group activity...',
    },
  ];

  const recentlyClosed = [
    {
      student: 'Emily Chen',
      date: 'Jan 14, 2026',
      resolution: 'Profile updated, monitoring for 2 weeks',
    },
    {
      student: 'Jordan Davis',
      date: 'Jan 13, 2026',
      resolution: 'Resolved, new strategy added',
    },
  ];

  return (
    <ExpertLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
            Good morning, Dr. Williams
          </h1>
          <p className="text-sm md:text-base text-[#757575]">{today}</p>
        </div>

        {/* Case Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 border border-[#D0D0D0] bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#757575] mb-1">Active Cases</p>
                <p className="text-3xl font-bold text-[#1A1A1A]">
                  {caseStats.activeCases}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#E0E0E0] flex items-center justify-center">
                <User className="w-6 h-6 text-[#333333]" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-[#D0D0D0] bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#757575] mb-1">Closed This Week</p>
                <p className="text-3xl font-bold text-[#1A1A1A]">
                  {caseStats.closedThisWeek}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#E0E0E0] flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#333333]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        {/* Escalated Cases Awaiting Review */}
        <Card className="p-6 border border-[#D0D0D0] bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#1A1A1A]">
              Escalated Cases Awaiting Review
            </h2>
            <Button
              variant="ghost"
              onClick={() => navigate('/expert/cases')}
              className="text-[#4A4A4A] hover:text-[#1A1A1A]"
            >
              View All →
            </Button>
          </div>

          <div className="space-y-3">
            {pendingCases.map((caseItem) => (
              <Card
                key={caseItem.id}
                className="p-4 border border-[#E0E0E0] hover:bg-[#F5F5F5] cursor-pointer"
                onClick={() => navigate(`/expert/cases/${caseItem.id}`)}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2 space-y-2 md:space-y-0">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <Badge
                      variant={caseItem.priority === 'High' ? 'default' : 'outline'}
                      className={
                        caseItem.priority === 'High'
                          ? 'bg-[#333333] text-white'
                          : 'border-[#9E9E9E] text-[#4A4A4A]'
                      }
                    >
                      {caseItem.priority} Priority
                    </Badge>
                    <span className="text-sm text-[#757575]">{caseItem.id}</span>
                  </div>
                  <span className="text-sm text-[#757575]">
                    {caseItem.date} • {caseItem.time}
                  </span>
                </div>

                <h3 className="font-semibold text-[#1A1A1A] mb-1">
                  {caseItem.student} • Grade {caseItem.grade}
                </h3>

                <p className="text-sm text-[#4A4A4A] mb-2">
                  Escalated by: {caseItem.teacher}
                </p>

                <p className="text-sm text-[#4A4A4A] mb-3">
                  <strong>Trigger:</strong> {caseItem.trigger}
                </p>

                <p className="text-sm text-[#757575] mb-3 line-clamp-2">
                  <strong>Note:</strong> {caseItem.note}
                </p>

                <Button
                  className="w-full bg-[#333333] hover:bg-[#1A1A1A] text-white rounded-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/expert/cases/${caseItem.id}`);
                  }}
                >
                  Review Case
                </Button>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </ExpertLayout>
  );
}