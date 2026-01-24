import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { AlertTriangle, Users, UserCheck, Link2, ChevronRight } from 'lucide-react';
import { STUDENTS } from '@/data/constants';

// Mock data for demonstration
const ASSIGNMENT_DATA = {
  unassignedToTeacher: [
    { id: 'STU-007', name: 'New Student A', grade: 3 },
    { id: 'STU-008', name: 'New Student B', grade: 4 },
  ],
  unassignedToExpert: [
    { id: 'STU-001', name: 'Marcus Thompson', grade: 4, teacher: 'Mrs. Maria Johnson' },
    { id: 'STU-003', name: 'Emily Chen', grade: 3, teacher: 'Mr. Michael Brown' },
    { id: 'STU-005', name: 'Sofia Garcia', grade: 5, teacher: 'Mrs. Sarah Wilson' },
  ],
  noParentLinked: [
    { id: 'STU-002', name: 'David Rodriguez', grade: 4, teacher: 'Mrs. Maria Johnson' },
    { id: 'STU-006', name: 'Alex Martinez', grade: 2, teacher: 'Mr. James Taylor' },
  ],
  orphanParents: [
    { id: 'P-001', name: 'John Smith', email: 'jsmith@email.com', status: 'Active' },
    { id: 'P-002', name: 'Jane Doe', email: 'jdoe@email.com', status: 'Pending' },
  ],
};

type CategoryType = 'all' | 'unassignedTeacher' | 'unassignedExpert' | 'noParent' | 'orphanParent';

export default function AssignmentSummary() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryType>('all');

  const totalIssues =
    ASSIGNMENT_DATA.unassignedToTeacher.length +
    ASSIGNMENT_DATA.unassignedToExpert.length +
    ASSIGNMENT_DATA.noParentLinked.length +
    ASSIGNMENT_DATA.orphanParents.length;

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl mb-2">Assignment Summary</h1>
          <p className="text-[#757575]">
            Overview of students and parents requiring attention
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card
            className={`border-[#D0D0D0] cursor-pointer transition-colors ${
              category === 'unassignedTeacher' ? 'border-[#333333] bg-[#F5F5F5]' : 'hover:border-[#9E9E9E]'
            }`}
            onClick={() => setCategory(category === 'unassignedTeacher' ? 'all' : 'unassignedTeacher')}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#757575]">No Teacher Assigned</p>
                  <p className="text-2xl font-semibold text-[#1A1A1A]">
                    {ASSIGNMENT_DATA.unassignedToTeacher.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#FFE0B2] flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#E65100]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`border-[#D0D0D0] cursor-pointer transition-colors ${
              category === 'unassignedExpert' ? 'border-[#333333] bg-[#F5F5F5]' : 'hover:border-[#9E9E9E]'
            }`}
            onClick={() => setCategory(category === 'unassignedExpert' ? 'all' : 'unassignedExpert')}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#757575]">No Expert Assigned</p>
                  <p className="text-2xl font-semibold text-[#1A1A1A]">
                    {ASSIGNMENT_DATA.unassignedToExpert.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#E3F2FD] flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-[#1565C0]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`border-[#D0D0D0] cursor-pointer transition-colors ${
              category === 'noParent' ? 'border-[#333333] bg-[#F5F5F5]' : 'hover:border-[#9E9E9E]'
            }`}
            onClick={() => setCategory(category === 'noParent' ? 'all' : 'noParent')}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#757575]">No Parent Linked</p>
                  <p className="text-2xl font-semibold text-[#1A1A1A]">
                    {ASSIGNMENT_DATA.noParentLinked.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#FCE4EC] flex items-center justify-center">
                  <Link2 className="w-6 h-6 text-[#C2185B]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`border-[#D0D0D0] cursor-pointer transition-colors ${
              category === 'orphanParent' ? 'border-[#333333] bg-[#F5F5F5]' : 'hover:border-[#9E9E9E]'
            }`}
            onClick={() => setCategory(category === 'orphanParent' ? 'all' : 'orphanParent')}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#757575]">Unlinked Parents</p>
                  <p className="text-2xl font-semibold text-[#1A1A1A]">
                    {ASSIGNMENT_DATA.orphanParents.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#FFF3E0] flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-[#EF6C00]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-[#757575]">
            {category === 'all'
              ? `Showing all ${totalIssues} items requiring attention`
              : `Filtered view`}
          </p>
          {category !== 'all' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCategory('all')}
              className="text-[#757575]"
            >
              Show All
            </Button>
          )}
        </div>

        {/* Students Without Teacher */}
        {(category === 'all' || category === 'unassignedTeacher') &&
          ASSIGNMENT_DATA.unassignedToTeacher.length > 0 && (
            <Card className="border-[#D0D0D0] mb-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#E65100]" />
                    Students Without Teacher
                  </CardTitle>
                  <Badge variant="secondary" className="bg-[#FFE0B2] text-[#E65100]">
                    {ASSIGNMENT_DATA.unassignedToTeacher.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ASSIGNMENT_DATA.unassignedToTeacher.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 border border-[#E0E0E0] rounded-lg hover:bg-[#FAFAFA]"
                    >
                      <div>
                        <p className="font-medium text-[#1A1A1A]">{student.name}</p>
                        <p className="text-sm text-[#757575]">
                          {student.id} - Grade {student.grade}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/students/${student.id}/assign-teacher`)}
                        className="border-[#D0D0D0]"
                      >
                        Assign Teacher
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        {/* Students Without Expert */}
        {(category === 'all' || category === 'unassignedExpert') &&
          ASSIGNMENT_DATA.unassignedToExpert.length > 0 && (
            <Card className="border-[#D0D0D0] mb-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-[#1565C0]" />
                    Students Without Behavioral Expert
                  </CardTitle>
                  <Badge variant="secondary" className="bg-[#E3F2FD] text-[#1565C0]">
                    {ASSIGNMENT_DATA.unassignedToExpert.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ASSIGNMENT_DATA.unassignedToExpert.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 border border-[#E0E0E0] rounded-lg hover:bg-[#FAFAFA]"
                    >
                      <div>
                        <p className="font-medium text-[#1A1A1A]">{student.name}</p>
                        <p className="text-sm text-[#757575]">
                          {student.id} - Grade {student.grade} - Teacher: {student.teacher}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/students/${student.id}/assign-expert`)}
                        className="border-[#D0D0D0]"
                      >
                        Assign Expert
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        {/* Students Without Parent */}
        {(category === 'all' || category === 'noParent') &&
          ASSIGNMENT_DATA.noParentLinked.length > 0 && (
            <Card className="border-[#D0D0D0] mb-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Link2 className="w-5 h-5 text-[#C2185B]" />
                    Students Without Parent Linked
                  </CardTitle>
                  <Badge variant="secondary" className="bg-[#FCE4EC] text-[#C2185B]">
                    {ASSIGNMENT_DATA.noParentLinked.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ASSIGNMENT_DATA.noParentLinked.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 border border-[#E0E0E0] rounded-lg hover:bg-[#FAFAFA]"
                    >
                      <div>
                        <p className="font-medium text-[#1A1A1A]">{student.name}</p>
                        <p className="text-sm text-[#757575]">
                          {student.id} - Grade {student.grade} - Teacher: {student.teacher}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/students/${student.id}/assign-parent`)}
                        className="border-[#D0D0D0]"
                      >
                        Link Parent
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        {/* Orphan Parents */}
        {(category === 'all' || category === 'orphanParent') &&
          ASSIGNMENT_DATA.orphanParents.length > 0 && (
            <Card className="border-[#D0D0D0] mb-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-[#EF6C00]" />
                    Parents Without Students Linked
                  </CardTitle>
                  <Badge variant="secondary" className="bg-[#FFF3E0] text-[#EF6C00]">
                    {ASSIGNMENT_DATA.orphanParents.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ASSIGNMENT_DATA.orphanParents.map((parent) => (
                    <div
                      key={parent.id}
                      className="flex items-center justify-between p-3 border border-[#E0E0E0] rounded-lg hover:bg-[#FAFAFA]"
                    >
                      <div>
                        <p className="font-medium text-[#1A1A1A]">{parent.name}</p>
                        <p className="text-sm text-[#757575]">
                          {parent.email}
                          <Badge
                            variant="secondary"
                            className={`ml-2 text-xs ${
                              parent.status === 'Active'
                                ? 'bg-[#E8F5E9] text-[#2E7D32]'
                                : 'bg-[#FFE0B2] text-[#E65100]'
                            }`}
                          >
                            {parent.status}
                          </Badge>
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/parents/${parent.id}/link`)}
                        className="border-[#D0D0D0]"
                      >
                        Link to Student
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        {/* Empty State */}
        {totalIssues === 0 && (
          <Card className="border-[#D0D0D0] p-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#E8F5E9] flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-[#2E7D32]" />
              </div>
              <h3 className="text-lg font-medium text-[#1A1A1A] mb-2">All Assignments Complete</h3>
              <p className="text-[#757575]">
                All students have teachers, experts, and parents assigned.
              </p>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
