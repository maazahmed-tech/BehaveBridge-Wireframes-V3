import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { ParentLayout } from '@/app/components/ParentLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { STUDENTS, MARCUS_PROFILE } from '@/data/constants';

export default function ChildIncidentsList() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const student = STUDENTS.find((s) => s.id === id) || STUDENTS[0];
  const profile = id === 'STU-4298' ? MARCUS_PROFILE : null;

  // Mock incident data
  const incidents = profile?.incidents || [
    {
      id: 'ESC-2026-0156',
      date: '2026-01-15',
      time: '09:45 AM',
      trigger: 'Peer conflict during group work',
      status: 'Resolved',
      severity: 'Medium',
      category: 'Social Interaction',
      parentAcknowledged: true,
    },
  ];

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      searchTerm === '' ||
      incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.trigger.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || 
      incident.status?.toLowerCase() === statusFilter ||
      (statusFilter === 'acknowledged' && incident.parentAcknowledged) ||
      (statusFilter === 'pending' && !incident.parentAcknowledged);

    const incidentDate = new Date(incident.date);
    const today = new Date('2026-01-20');
    const matchesDate =
      dateFilter === 'all' ||
      (dateFilter === 'week' &&
        incidentDate >= new Date('2026-01-14') &&
        incidentDate <= today) ||
      (dateFilter === 'month' &&
        incidentDate >= new Date('2026-01-01') &&
        incidentDate <= today);

    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-[#757575] text-white';
      case 'Escalated':
        return 'bg-[#1A1A1A] text-white';
      case 'Under Review':
        return 'bg-[#9E9E9E] text-white';
      default:
        return 'bg-[#E0E0E0] text-[#4A4A4A]';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-[#333333] text-white';
      case 'Medium':
        return 'bg-[#757575] text-white';
      case 'Low':
        return 'bg-[#E0E0E0] text-[#4A4A4A]';
      default:
        return 'bg-[#F5F5F5] text-[#4A4A4A]';
    }
  };

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
          <h1 className="text-2xl text-[#1A1A1A] mb-2">Incidents for {student.firstName}</h1>
          <p className="text-[#4A4A4A]">
            View all behavioral incidents for your child
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
            <Input
              placeholder="Search by incident ID or trigger..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#D0D0D0]"
            />
          </div>

          <div className="w-full md:w-48">
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="border-[#D0D0D0] text-[#1A1A1A]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-[#D0D0D0] text-[#1A1A1A]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
                <SelectItem value="pending">Pending Acknowledgment</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Incident Count */}
        <div className="mb-4">
          <p className="text-sm text-[#4A4A4A]">
            Showing {filteredIncidents.length} of {incidents.length} incidents
          </p>
        </div>

        {/* Incidents Table */}
        {filteredIncidents.length === 0 ? (
          <Card className="border-[#D0D0D0] p-12">
            <div className="text-center">
              <p className="text-[#757575] mb-4">
                No incidents found with the selected filters
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setDateFilter('all');
                }}
                variant="outline"
                className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
              >
                Clear Filters
              </Button>
            </div>
          </Card>
        ) : (
          <div className="bg-white border border-[#D0D0D0] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F5F5F5] border-b border-[#D0D0D0]">
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">
                    Date/Time
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">
                    Trigger
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">
                    Severity
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">
                    Status
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">
                    Acknowledgment
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredIncidents.map((incident, index) => (
                  <tr
                    key={incident.id}
                    className={`border-b border-[#E0E0E0] hover:bg-[#FAFAFA] ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                    }`}
                  >
                    <td className="p-4">
                      <div className="text-[#1A1A1A] font-medium">
                        {new Date(incident.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="text-sm text-[#757575]">
                        {incident.time}
                      </div>
                    </td>
                    <td className="p-4 text-[#4A4A4A]">{incident.trigger}</td>
                    <td className="p-4">
                      <Badge className={getSeverityColor(incident.severity)}>
                        {incident.severity}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(incident.status)}>
                        {incident.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {incident.parentAcknowledged ? (
                        <Badge className="bg-[#757575] text-white">
                          Acknowledged
                        </Badge>
                      ) : (
                        <Badge className="bg-[#E0E0E0] text-[#4A4A4A]">
                          Pending
                        </Badge>
                      )}
                    </td>
                    <td className="p-4">
                      <Link to={`/parent/children/${id}/incidents/${incident.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
                        >
                          View Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ParentLayout>
  );
}