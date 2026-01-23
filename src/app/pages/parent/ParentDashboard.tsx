import { useNavigate } from 'react-router-dom';
import { User, AlertCircle } from 'lucide-react';
import { ParentLayout } from '@/app/components/ParentLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { MARCUS_PROFILE } from '@/data/constants';

export default function ParentDashboard() {
  const navigate = useNavigate();
  const today = 'Thursday, January 15, 2026';

  const marcusChild = MARCUS_PROFILE.student;
  const emmaChild = {
    id: 'emma-thompson',
    name: 'Emma Thompson',
    grade: '5th Grade',
    teacher: 'Mr. David Chen'
  };
  const expert = 'Dr. Sarah Williams';

  const marcusCases = [
    {
      id: 'ESC-2026-0045',
      submittedDate: '2026-01-12',
      trigger: 'Academic frustration',
      severity: 'High',
      status: 'Under Review',
      notePreview: 'Marcus has had 3 incidents this week, all related to academic frustration during math...',
      linkedIncident: 'ESC-2026-0198',
      parentAcknowledged: false,
    },
  ];

  const emmaCases = [
    {
      id: 'ESC-2026-0089',
      submittedDate: '2026-01-14',
      trigger: 'Peer conflict',
      severity: 'Medium',
      status: 'Under Review',
      notePreview: 'Emma had a disagreement with classmates during group work. She became upset and refused to participate...',
      linkedIncident: 'ESC-2026-0201',
      parentAcknowledged: false,
    },
    {
      id: 'ESC-2026-0067',
      submittedDate: '2026-01-10',
      trigger: 'Transition difficulties',
      severity: 'Low',
      status: 'Completed',
      notePreview: 'Emma showed resistance when transitioning from recess to classroom. Intervention was successful...',
      linkedIncident: 'ESC-2026-0189',
      parentAcknowledged: true,
    },
    {
      id: 'ESC-2026-0052',
      submittedDate: '2026-01-08',
      trigger: 'Social anxiety',
      severity: 'Medium',
      status: 'Completed',
      notePreview: 'Emma expressed discomfort during lunch period. She preferred to stay near the teacher instead of joining peers...',
      linkedIncident: 'ESC-2026-0175',
      parentAcknowledged: true,
    },
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High':
        return <Badge className="bg-[#4A4A4A] text-white">{severity}</Badge>;
      case 'Medium':
        return <Badge className="bg-[#9E9E9E] text-white">{severity}</Badge>;
      case 'Low':
        return <Badge className="bg-[#E0E0E0] text-[#4A4A4A]">{severity}</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  return (
    <ParentLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">
            Welcome, Lisa
          </h1>
          <p className="text-[#757575]">{today}</p>
        </div>

        {/* Child Card */}
        <Card className="p-6 border border-[#D0D0D0] bg-white">
          {/* Recent Cases */}
          <div>
            <h3 className="font-semibold text-[#1A1A1A] mb-3">Recent Cases</h3>
            <div className="space-y-3">
              {marcusCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className={`p-4 border rounded-lg hover:bg-[#F5F5F5] cursor-pointer transition-colors ${
                    !caseItem.parentAcknowledged ? 'border-[#4A4A4A] bg-[#FAFAFA]' : 'border-[#E0E0E0]'
                  }`}
                  onClick={() => navigate(`/parent/children/${marcusChild.id}/cases/${caseItem.id}`)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {getSeverityBadge(caseItem.severity)}
                      <Badge className={caseItem.status === 'Under Review' ? 'bg-[#9E9E9E] text-white' : 'bg-[#757575] text-white'}>
                        {caseItem.status}
                      </Badge>
                      {!caseItem.parentAcknowledged && (
                        <div className="flex items-center gap-1 text-sm text-[#333333] font-medium">
                          <AlertCircle className="w-4 h-4" />
                          Needs Acknowledgment
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-[#757575] whitespace-nowrap ml-2">
                      {new Date(caseItem.submittedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <h4 className="font-semibold text-[#1A1A1A] mb-2">{marcusChild.name}</h4>
                    <div className="text-sm text-[#757575] mb-1">Trigger</div>
                    <div className="font-medium text-[#1A1A1A]">{caseItem.trigger}</div>
                  </div>
                  
                  <p className="text-sm text-[#4A4A4A] line-clamp-2 mb-3">
                    {caseItem.notePreview}
                  </p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-[#E0E0E0]">
                    <span className="text-xs text-[#757575]">Case ID: {caseItem.id}</span>
                    <Badge className={caseItem.parentAcknowledged ? 'bg-[#757575] text-white' : 'bg-[#E0E0E0] text-[#4A4A4A]'}>
                      {caseItem.parentAcknowledged ? 'Acknowledged' : 'Not yet acknowledged'}
                    </Badge>
                  </div>
                </div>
              ))}
              {emmaCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className={`p-4 border rounded-lg hover:bg-[#F5F5F5] cursor-pointer transition-colors ${
                    !caseItem.parentAcknowledged ? 'border-[#4A4A4A] bg-[#FAFAFA]' : 'border-[#E0E0E0]'
                  }`}
                  onClick={() => navigate(`/parent/children/${emmaChild.id}/cases/${caseItem.id}`)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {getSeverityBadge(caseItem.severity)}
                      <Badge className={caseItem.status === 'Under Review' ? 'bg-[#9E9E9E] text-white' : 'bg-[#757575] text-white'}>
                        {caseItem.status}
                      </Badge>
                      {!caseItem.parentAcknowledged && (
                        <div className="flex items-center gap-1 text-sm text-[#333333] font-medium">
                          <AlertCircle className="w-4 h-4" />
                          Needs Acknowledgment
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-[#757575] whitespace-nowrap ml-2">
                      {new Date(caseItem.submittedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <h4 className="font-semibold text-[#1A1A1A] mb-2">{emmaChild.name}</h4>
                    <div className="text-sm text-[#757575] mb-1">Trigger</div>
                    <div className="font-medium text-[#1A1A1A]">{caseItem.trigger}</div>
                  </div>
                  
                  <p className="text-sm text-[#4A4A4A] line-clamp-2 mb-3">
                    {caseItem.notePreview}
                  </p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-[#E0E0E0]">
                    <span className="text-xs text-[#757575]">Case ID: {caseItem.id}</span>
                    <Badge className={caseItem.parentAcknowledged ? 'bg-[#757575] text-white' : 'bg-[#E0E0E0] text-[#4A4A4A]'}>
                      {caseItem.parentAcknowledged ? 'Acknowledged' : 'Not yet acknowledged'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full mt-3 border-[#D0D0D0] text-[#333333] hover:bg-[#F5F5F5] rounded-lg"
              onClick={() => navigate(`/parent/children/${marcusChild.id}/cases`)}
            >
              View All Cases
            </Button>
          </div>
        </Card>
      </div>
    </ParentLayout>
  );
}