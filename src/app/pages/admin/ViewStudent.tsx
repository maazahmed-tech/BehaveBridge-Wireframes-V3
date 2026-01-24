import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import {
  ArrowLeft,
  User,
  Calendar,
  Mail,
  Phone,
  AlertCircle,
  TrendingUp,
  FileText,
  Edit,
  Users,
  X
} from 'lucide-react';
import { toast } from 'sonner';

export default function ViewStudent() {
  const { id } = useParams();

  // Unlink Modal State
  const [unlinkOpen, setUnlinkOpen] = useState(false);
  const [itemToUnlink, setItemToUnlink] = useState<{ id: string; name: string; type: 'teacher' | 'expert' | 'parent' } | null>(null);

  const student = {
    id: 'STU-123',
    firstName: 'Marcus',
    lastName: 'Williams',
    fullName: 'Marcus Williams',
    dateOfBirth: '03/15/2016',
    age: 9,
    grade: '4th Grade',
    teacher: 'Mrs. Maria Johnson',
    classroom: 'Room 204',
    status: 'Active',
    enrollmentDate: 'Aug 20, 2021',
    guardian: {
      name: 'Lisa Thompson',
      relationship: 'Mother',
      email: 'lisa.thompson@email.com',
      phone: '(555) 234-5678',
      address: '456 Oak Street, Springfield, CA 12345'
    },
    emergency: {
      name: 'Robert Thompson',
      relationship: 'Father',
      phone: '(555) 234-5679'
    },
    medical: {
      conditions: 'ADHD',
      medications: 'Medication administered daily at 8:00 AM',
      iepStatus: 'Active',
      section504: false,
      accommodations: 'Extended time on assessments, preferential seating, frequent breaks'
    }
  };

  const behaviorStats = {
    totalIncidents: 12,
    last30Days: 3,
    last7Days: 1,
    mostCommonType: 'Classroom Disruption',
    expertSupport: true,
    expertName: 'Dr. Sarah Williams',
    caseId: 'CS-2026-003',
    trend: -40
  };

  const recentIncidents = [
    { id: 'ESC-2026-042', date: 'Jan 14, 2026', type: 'Classroom Disruption', severity: 'Medium' },
    { id: 'ESC-2026-038', date: 'Jan 12, 2026', type: 'Academic Avoidance', severity: 'Medium' },
    { id: 'ESC-2026-034', date: 'Jan 10, 2026', type: 'Verbal Outburst', severity: 'High' }
  ];

  // Assigned personnel
  const assignedTeachers = [
    { id: 'T-001', name: 'Mrs. Maria Johnson', role: 'Primary Teacher', assignedDate: 'Aug 20, 2021' },
    { id: 'T-002', name: 'Mr. James Wilson', role: 'Math Teacher', assignedDate: 'Sep 5, 2024' },
  ];

  const assignedExperts = [
    { id: 'E-001', name: 'Dr. Sarah Williams', role: 'Lead Behavioral Specialist', assignedDate: 'Oct 15, 2024' },
  ];

  const linkedParents = [
    { id: 'P-001', name: 'Lisa Thompson', relationship: 'Mother', linkedDate: 'Aug 20, 2021' },
    { id: 'P-002', name: 'Robert Thompson', relationship: 'Father', linkedDate: 'Aug 20, 2021' },
  ];

  const handleUnlink = (item: { id: string; name: string }, type: 'teacher' | 'expert' | 'parent') => {
    setItemToUnlink({ ...item, type });
    setUnlinkOpen(true);
  };

  const handleConfirmUnlink = () => {
    if (itemToUnlink) {
      const typeLabel = itemToUnlink.type === 'teacher' ? 'Teacher' : itemToUnlink.type === 'expert' ? 'Expert' : 'Parent';
      toast.success(`${typeLabel} ${itemToUnlink.name} has been unlinked from ${student.fullName}`);
      setUnlinkOpen(false);
      setItemToUnlink(null);
    }
  };

  const getUnlinkMessage = () => {
    if (!itemToUnlink) return '';
    switch (itemToUnlink.type) {
      case 'teacher':
        return 'This teacher will no longer be assigned to this student.';
      case 'expert':
        return 'This behavioral expert will no longer be assigned to this student.';
      case 'parent':
        return 'This parent will no longer have access to this student\'s information.';
      default:
        return '';
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <Link to="/admin/students" className="inline-flex items-center gap-2 text-[#4A4A4A] hover:text-[#1A1A1A] mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Students
        </Link>

        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl text-[#1A1A1A] mb-2">{student.fullName}</h1>
            <p className="text-[#757575]">{student.id} • {student.grade}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-[#333333] text-white">
              {student.status}
            </Badge>
            <Link to={`/admin/students/edit/${id}`}>
              <Button className="bg-[#333333] hover:bg-[#1A1A1A] text-white">
                <Edit className="w-4 h-4 mr-2" />
                Edit Student
              </Button>
            </Link>
          </div>
        </div>

        {/* Behavior Summary */}
        <Card className="mb-6 border-[#333333] bg-[#FAFAFA]">
          <CardHeader>
            <CardTitle className="text-lg text-[#1A1A1A] flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Behavior Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-sm text-[#757575] mb-1">Total Incidents</div>
                <div className="text-2xl font-semibold text-[#1A1A1A]">
                  {behaviorStats.totalIncidents}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#757575] mb-1">Last 30 Days</div>
                <div className="text-2xl font-semibold text-[#1A1A1A]">
                  {behaviorStats.last30Days}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#757575] mb-1">Last 7 Days</div>
                <div className="text-2xl font-semibold text-[#1A1A1A]">
                  {behaviorStats.last7Days}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#757575] mb-1">Trend</div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-5 h-5 text-[#4A4A4A] rotate-180" />
                  <span className="text-2xl font-semibold text-[#1A1A1A]">
                    {Math.abs(behaviorStats.trend)}%
                  </span>
                </div>
              </div>
            </div>

            {behaviorStats.expertSupport && (
              <div className="pt-4 border-t border-[#D0D0D0]">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#D0D0D0]">
                  <div>
                    <div className="text-sm font-medium text-[#1A1A1A] mb-1">
                      Active Expert Support
                    </div>
                    <div className="text-sm text-[#757575]">
                      {behaviorStats.expertName} • Case {behaviorStats.caseId}
                    </div>
                  </div>
                  <Badge className="bg-[#333333] text-white">
                    In Progress
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6">
          {/* Student Information */}
          <Card className="border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-lg text-[#1A1A1A] flex items-center gap-2">
                <User className="w-5 h-5" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start justify-between py-2 border-b border-[#E0E0E0]">
                <span className="text-sm text-[#757575]">Full Name</span>
                <span className="text-sm font-medium text-[#1A1A1A]">{student.fullName}</span>
              </div>
              <div className="flex items-start justify-between py-2 border-b border-[#E0E0E0]">
                <span className="text-sm text-[#757575]">Student ID</span>
                <span className="text-sm font-medium text-[#1A1A1A]">{student.id}</span>
              </div>
              <div className="flex items-start justify-between py-2 border-b border-[#E0E0E0]">
                <span className="text-sm text-[#757575]">Date of Birth</span>
                <span className="text-sm font-medium text-[#1A1A1A]">{student.dateOfBirth} (Age {student.age})</span>
              </div>
              <div className="flex items-start justify-between py-2 border-b border-[#E0E0E0]">
                <span className="text-sm text-[#757575]">Grade Level</span>
                <span className="text-sm font-medium text-[#1A1A1A]">{student.grade}</span>
              </div>
              <div className="flex items-start justify-between py-2 border-b border-[#E0E0E0]">
                <span className="text-sm text-[#757575]">Primary Teacher</span>
                <span className="text-sm font-medium text-[#1A1A1A]">{student.teacher}</span>
              </div>
              <div className="flex items-start justify-between py-2 border-b border-[#E0E0E0]">
                <span className="text-sm text-[#757575]">Classroom</span>
                <span className="text-sm font-medium text-[#1A1A1A]">{student.classroom}</span>
              </div>
              <div className="flex items-start justify-between py-2">
                <span className="text-sm text-[#757575]">Enrollment Date</span>
                <span className="text-sm font-medium text-[#1A1A1A]">{student.enrollmentDate}</span>
              </div>
            </CardContent>
          </Card>

          {/* Guardian Information */}
          <Card className="border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-lg text-[#1A1A1A] flex items-center gap-2">
                <User className="w-5 h-5" />
                Guardian Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start justify-between py-2 border-b border-[#E0E0E0]">
                <span className="text-sm text-[#757575]">Primary Guardian</span>
                <span className="text-sm font-medium text-[#1A1A1A]">{student.guardian.name}</span>
              </div>
              <div className="flex items-start justify-between py-2 border-b border-[#E0E0E0]">
                <span className="text-sm text-[#757575]">Relationship</span>
                <span className="text-sm font-medium text-[#1A1A1A]">{student.guardian.relationship}</span>
              </div>
              <div className="flex items-start justify-between py-2 border-b border-[#E0E0E0]">
                <span className="text-sm text-[#757575] flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  Email
                </span>
                <span className="text-sm font-medium text-[#1A1A1A]">{student.guardian.email}</span>
              </div>
              <div className="flex items-start justify-between py-2 border-b border-[#E0E0E0]">
                <span className="text-sm text-[#757575] flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  Phone
                </span>
                <span className="text-sm font-medium text-[#1A1A1A]">{student.guardian.phone}</span>
              </div>
              <div className="flex items-start justify-between py-2 border-b border-[#E0E0E0]">
                <span className="text-sm text-[#757575]">Address</span>
                <span className="text-sm font-medium text-[#1A1A1A] text-right">{student.guardian.address}</span>
              </div>
              <div className="pt-3 mt-3 border-t border-[#D0D0D0]">
                <div className="text-sm font-medium text-[#1A1A1A] mb-2">Emergency Contact</div>
                <div className="space-y-1">
                  <div className="text-sm text-[#4A4A4A]">{student.emergency.name} ({student.emergency.relationship})</div>
                  <div className="text-sm text-[#757575]">{student.emergency.phone}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical & Special Education */}
          <Card className="border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-lg text-[#1A1A1A] flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Medical & Special Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start justify-between py-2 border-b border-[#E0E0E0]">
                <span className="text-sm text-[#757575]">Medical Conditions</span>
                <span className="text-sm font-medium text-[#1A1A1A]">{student.medical.conditions}</span>
              </div>
              <div className="flex items-start justify-between py-2 border-b border-[#E0E0E0]">
                <span className="text-sm text-[#757575]">Medications</span>
                <span className="text-sm font-medium text-[#1A1A1A] text-right max-w-xs">
                  {student.medical.medications}
                </span>
              </div>
              <div className="flex items-start justify-between py-2 border-b border-[#E0E0E0]">
                <span className="text-sm text-[#757575]">IEP Status</span>
                <Badge variant="outline" className="border-[#333333] text-[#333333]">
                  {student.medical.iepStatus}
                </Badge>
              </div>
              <div className="flex items-start justify-between py-2 border-b border-[#E0E0E0]">
                <span className="text-sm text-[#757575]">504 Plan</span>
                <span className="text-sm font-medium text-[#1A1A1A]">
                  {student.medical.section504 ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="pt-2">
                <div className="text-sm text-[#757575] mb-1">Accommodations</div>
                <p className="text-sm text-[#1A1A1A]">{student.medical.accommodations}</p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Incidents */}
          <Card className="border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-lg text-[#1A1A1A] flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Recent Incidents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentIncidents.map((incident) => (
                  <div
                    key={incident.id}
                    className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded-lg border border-[#E0E0E0]"
                  >
                    <div>
                      <div className="text-sm font-medium text-[#1A1A1A] mb-1">
                        {incident.type}
                      </div>
                      <div className="text-xs text-[#757575]">
                        {incident.date} • {incident.id}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        incident.severity === 'High'
                          ? 'border-[#333333] text-[#333333]'
                          : 'border-[#9E9E9E] text-[#757575]'
                      }
                    >
                      {incident.severity}
                    </Badge>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
                >
                  View All Incidents
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments Section */}
        <Card className="mt-6 border-[#D0D0D0]">
          <CardHeader>
            <CardTitle className="text-lg text-[#1A1A1A] flex items-center gap-2">
              <Users className="w-5 h-5" />
              Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Assigned Teachers */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-[#4A4A4A] mb-3">Assigned Teachers</h3>
              {assignedTeachers.length === 0 ? (
                <p className="text-sm text-[#757575]">No teachers assigned</p>
              ) : (
                <div className="bg-white border border-[#D0D0D0] rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-[#F5F5F5] border-b border-[#D0D0D0]">
                      <tr>
                        <th className="text-left p-3 text-sm font-medium text-[#4A4A4A]">Name</th>
                        <th className="text-left p-3 text-sm font-medium text-[#4A4A4A]">Role</th>
                        <th className="text-left p-3 text-sm font-medium text-[#4A4A4A]">Assigned Date</th>
                        <th className="text-left p-3 text-sm font-medium text-[#4A4A4A]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignedTeachers.map((teacher, index) => (
                        <tr key={teacher.id} className={`border-b border-[#E0E0E0] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                          <td className="p-3 text-sm text-[#1A1A1A] font-medium">{teacher.name}</td>
                          <td className="p-3 text-sm text-[#4A4A4A]">{teacher.role}</td>
                          <td className="p-3 text-sm text-[#757575]">{teacher.assignedDate}</td>
                          <td className="p-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUnlink({ id: teacher.id, name: teacher.name }, 'teacher')}
                              className="text-[#757575] hover:text-[#333333] hover:bg-[#F5F5F5]"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Unlink
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Assigned Experts */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-[#4A4A4A] mb-3">Assigned Behavioral Experts</h3>
              {assignedExperts.length === 0 ? (
                <p className="text-sm text-[#757575]">No experts assigned</p>
              ) : (
                <div className="bg-white border border-[#D0D0D0] rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-[#F5F5F5] border-b border-[#D0D0D0]">
                      <tr>
                        <th className="text-left p-3 text-sm font-medium text-[#4A4A4A]">Name</th>
                        <th className="text-left p-3 text-sm font-medium text-[#4A4A4A]">Role</th>
                        <th className="text-left p-3 text-sm font-medium text-[#4A4A4A]">Assigned Date</th>
                        <th className="text-left p-3 text-sm font-medium text-[#4A4A4A]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignedExperts.map((expert, index) => (
                        <tr key={expert.id} className={`border-b border-[#E0E0E0] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                          <td className="p-3 text-sm text-[#1A1A1A] font-medium">{expert.name}</td>
                          <td className="p-3 text-sm text-[#4A4A4A]">{expert.role}</td>
                          <td className="p-3 text-sm text-[#757575]">{expert.assignedDate}</td>
                          <td className="p-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUnlink({ id: expert.id, name: expert.name }, 'expert')}
                              className="text-[#757575] hover:text-[#333333] hover:bg-[#F5F5F5]"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Unlink
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Linked Parents */}
            <div>
              <h3 className="text-sm font-medium text-[#4A4A4A] mb-3">Linked Parents/Guardians</h3>
              {linkedParents.length === 0 ? (
                <p className="text-sm text-[#757575]">No parents linked</p>
              ) : (
                <div className="bg-white border border-[#D0D0D0] rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-[#F5F5F5] border-b border-[#D0D0D0]">
                      <tr>
                        <th className="text-left p-3 text-sm font-medium text-[#4A4A4A]">Name</th>
                        <th className="text-left p-3 text-sm font-medium text-[#4A4A4A]">Relationship</th>
                        <th className="text-left p-3 text-sm font-medium text-[#4A4A4A]">Linked Date</th>
                        <th className="text-left p-3 text-sm font-medium text-[#4A4A4A]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {linkedParents.map((parent, index) => (
                        <tr key={parent.id} className={`border-b border-[#E0E0E0] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                          <td className="p-3 text-sm text-[#1A1A1A] font-medium">{parent.name}</td>
                          <td className="p-3 text-sm text-[#4A4A4A]">{parent.relationship}</td>
                          <td className="p-3 text-sm text-[#757575]">{parent.linkedDate}</td>
                          <td className="p-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUnlink({ id: parent.id, name: parent.name }, 'parent')}
                              className="text-[#757575] hover:text-[#333333] hover:bg-[#F5F5F5]"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Unlink
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Unlink Confirmation Modal */}
      <Dialog open={unlinkOpen} onOpenChange={setUnlinkOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#1A1A1A]">
              Unlink {itemToUnlink?.type === 'teacher' ? 'Teacher' : itemToUnlink?.type === 'expert' ? 'Expert' : 'Parent'}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-[#4A4A4A]">
              Are you sure you want to unlink <span className="font-medium">{itemToUnlink?.name}</span> from <span className="font-medium">{student.fullName}</span>?
            </p>
            <p className="text-sm text-[#757575] mt-2">
              {getUnlinkMessage()}
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setUnlinkOpen(false)}
              className="border-[#9E9E9E] text-[#333333]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmUnlink}
              className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
            >
              Unlink
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}