import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ParentLayout } from '@/app/components/ParentLayout';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { STUDENTS, STAFF } from '@/data/constants';

export default function ChildCasesList() {
  const { id } = useParams();
  const [statusFilter, setStatusFilter] = useState('all');

  const student = STUDENTS.find((s) => s.id === id) || STUDENTS[0];

  const cases = [
    {
      id: 'ESC-2026-0045',
      submittedDate: '2026-01-12',
      trigger: 'Academic frustration',
      severity: 'High',
      status: 'Under Review',
      notePreview: 'Marcus has had 3 incidents this week, all related to academic frustration during math...',
      linkedIncident: 'ESC-2026-0198',
      parentAcknowledged: true,
      teacher: STAFF['T-2024-0847'],
      expert: STAFF['BE-2024-0023'],
    },
    {
      id: 'ESC-2026-0198',
      student: student,
      submittedDate: '2026-01-08',
      status: 'Closed',
      notePreview: 'Follow-up on testing accommodations...',
      linkedIncident: 'ESC-2026-0176',
    },
  ];

  const filteredCases = cases.filter(c => 
    statusFilter === 'all' || c.status.toLowerCase().replace(' ', '-') === statusFilter
  );

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

  const CaseCard = ({ case: caseItem }: { case: typeof cases[0] }) => (
    <Card className="border-[#D0D0D0] hover:bg-[#FAFAFA] transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {getSeverityBadge(caseItem.severity)}
              <Badge className={caseItem.status === 'Under Review' ? 'bg-[#9E9E9E] text-white' : 'bg-[#757575] text-white'}>
                {caseItem.status}
              </Badge>
            </div>
            <h3 className="text-lg font-medium text-[#1A1A1A] mb-1">
              Case for {student.firstName}
            </h3>
            <p className="text-sm text-[#757575]">
              Submitted on {new Date(caseItem.submittedDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-[#757575] mb-1">Trigger</div>
          <div className="text-[#1A1A1A]">{caseItem.trigger}</div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-[#757575] mb-1">Teacher's Note</div>
          <p className="text-[#4A4A4A] text-sm line-clamp-2">{caseItem.notePreview}</p>
        </div>

        <div className="mb-4">
          <div className="text-sm text-[#757575] mb-1">Linked Incident</div>
          <Link 
            to={`/parent/children/${id}/incidents/${caseItem.linkedIncident}`}
            className="text-[#333333] hover:underline text-sm font-medium"
          >
            {caseItem.linkedIncident}
          </Link>
        </div>

        <div className="mb-4">
          <div className="text-sm text-[#757575] mb-1">Acknowledgment Status</div>
          {caseItem.parentAcknowledged ? (
            <Badge className="bg-[#757575] text-white">
              Acknowledged
            </Badge>
          ) : (
            <Badge className="bg-[#E0E0E0] text-[#4A4A4A]">
              Not yet acknowledged
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-[#757575]">Case ID: {caseItem.id}</span>
          <Link to={`/parent/children/${id}/cases/${caseItem.id}`}>
            <Button className="bg-[#333333] hover:bg-[#1A1A1A] text-white">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <ParentLayout>
      <div className="p-8">
        <Link 
          to={`/parent/children/${id}`}
          className="inline-flex items-center gap-2 text-[#4A4A4A] hover:text-[#1A1A1A] mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {student.firstName}'s Profile
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl text-[#1A1A1A] mb-2">Cases for {student.firstName}</h1>
          <p className="text-[#4A4A4A]">Expert reviews and intervention plans</p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-64">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-[#D0D0D0] text-[#1A1A1A]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="flex-1 border-[#D0D0D0] p-4">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#9E9E9E]"></div>
                <span className="text-[#4A4A4A]">Under Review</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#757575]"></div>
                <span className="text-[#4A4A4A]">Closed</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-4">
          <p className="text-sm text-[#4A4A4A]">
            Showing {filteredCases.length} of {cases.length} cases
          </p>
        </div>

        {filteredCases.length === 0 ? (
          <Card className="border-[#D0D0D0] p-12">
            <div className="text-center">
              <p className="text-[#757575] mb-4">No cases found with the selected filter</p>
              <Button
                onClick={() => setStatusFilter('all')}
                variant="outline"
                className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
              >
                Clear Filter
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredCases.map((caseItem) => (
              <CaseCard key={caseItem.id} case={caseItem} />
            ))}
          </div>
        )}
      </div>
    </ParentLayout>
  );
}