import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Checkbox } from '@/app/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { ArrowLeft, Search, Users, Check, ChevronRight, Brain } from 'lucide-react';
import { STUDENTS } from '@/data/constants';
import { toast } from 'sonner';

const EXPERTS = [
  {
    id: '1',
    name: 'Dr. Sarah Williams',
    role: 'Lead Behavioral Specialist',
    assignedStudents: 45,
    specializations: ['ADHD', 'Anxiety', 'General Behavior'],
  },
  {
    id: '2',
    name: 'Robert Chen',
    role: 'Behavioral Specialist - SpEd',
    assignedStudents: 28,
    specializations: ['Special Education', 'Autism Spectrum', 'Learning Disabilities'],
  },
  {
    id: '3',
    name: 'Jennifer Adams',
    role: 'Behavioral Specialist',
    assignedStudents: 32,
    specializations: ['Social Skills', 'Emotional Regulation', 'Conflict Resolution'],
  },
  {
    id: '4',
    name: 'Dr. Michael Torres',
    role: 'Senior Behavioral Specialist',
    assignedStudents: 38,
    specializations: ['Trauma-Informed Care', 'Crisis Intervention', 'Family Counseling'],
  },
];

export default function BulkAssignStudentsToExpert() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');

  const expert = EXPERTS.find((e) => e.id === selectedExpert);

  const filteredStudents = STUDENTS.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = gradeFilter === 'all' || student.grade.toString() === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  const toggleStudent = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const toggleAllFiltered = () => {
    const filteredIds = filteredStudents.map((s) => s.id);
    const allSelected = filteredIds.every((id) => selectedStudents.includes(id));

    if (allSelected) {
      setSelectedStudents((prev) => prev.filter((id) => !filteredIds.includes(id)));
    } else {
      setSelectedStudents((prev) => [...new Set([...prev, ...filteredIds])]);
    }
  };

  const handleAssign = () => {
    if (selectedExpert && selectedStudents.length > 0) {
      toast.success(
        `${selectedStudents.length} student${selectedStudents.length > 1 ? 's' : ''} assigned to ${expert?.name}`
      );
      navigate('/admin/students');
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => (step === 2 ? setStep(1) : navigate('/admin/students'))}
            className="mb-4 text-[#4A4A4A] hover:text-[#1A1A1A]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {step === 2 ? 'Back to Expert Selection' : 'Back to Students'}
          </Button>
          <h1 className="text-2xl mb-2">Bulk Assign Students to Behavioral Expert</h1>
          <p className="text-[#757575]">
            {step === 1
              ? 'Step 1: Select a behavioral expert to assign students to'
              : `Step 2: Select students to assign to ${expert?.name}`}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-[#333333] text-white' : 'bg-[#E0E0E0] text-[#757575]'
            }`}
          >
            {step > 1 ? <Check className="w-4 h-4" /> : '1'}
          </div>
          <div className={`flex-1 h-1 ${step > 1 ? 'bg-[#333333]' : 'bg-[#E0E0E0]'}`} />
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-[#333333] text-white' : 'bg-[#E0E0E0] text-[#757575]'
            }`}
          >
            2
          </div>
        </div>

        {/* Step 1: Select Expert */}
        {step === 1 && (
          <Card className="border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-lg">Select Behavioral Expert</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {EXPERTS.map((e) => (
                  <div
                    key={e.id}
                    onClick={() => setSelectedExpert(e.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedExpert === e.id
                        ? 'border-[#333333] bg-[#F5F5F5]'
                        : 'border-[#D0D0D0] hover:border-[#9E9E9E]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-[#1A1A1A]">{e.name}</p>
                          {selectedExpert === e.id && (
                            <div className="w-5 h-5 rounded-full bg-[#333333] flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-[#757575]">{e.role}</p>

                        {/* Specializations */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {e.specializations.map((spec, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs bg-[#F5F5F5] text-[#4A4A4A]"
                            >
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Current Students Count */}
                      <div className="text-right ml-4">
                        <div className="flex items-center gap-1 text-sm text-[#4A4A4A]">
                          <Users className="w-4 h-4 text-[#757575]" />
                          <span>{e.assignedStudents} students</span>
                        </div>
                        <p className="text-xs text-[#757575] mt-1">currently assigned</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!selectedExpert}
                  className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
                >
                  Continue to Select Students
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Select Students */}
        {step === 2 && (
          <>
            {/* Selected Expert Info */}
            <Card className="border-[#D0D0D0] mb-4">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E3F2FD] flex items-center justify-center">
                      <Brain className="w-5 h-5 text-[#1565C0]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#757575]">Assigning to:</p>
                      <p className="font-medium text-[#1A1A1A]">{expert?.name}</p>
                      <p className="text-sm text-[#757575]">{expert?.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-[#4A4A4A]">
                      <Users className="w-4 h-4 text-[#757575]" />
                      <span>{expert?.assignedStudents} students currently assigned</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search and Filters */}
            <div className="flex gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#757575]" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-[#D0D0D0]"
                />
              </div>
              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger className="w-40 border-[#D0D0D0]">
                  <SelectValue placeholder="All Grades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="2">Grade 2</SelectItem>
                  <SelectItem value="3">Grade 3</SelectItem>
                  <SelectItem value="4">Grade 4</SelectItem>
                  <SelectItem value="5">Grade 5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Selection Summary */}
            {selectedStudents.length > 0 && (
              <div className="mb-4 p-3 bg-[#F5F5F5] border border-[#D0D0D0] rounded-lg flex items-center justify-between">
                <span className="text-sm font-medium text-[#1A1A1A]">
                  {selectedStudents.length} student{selectedStudents.length > 1 ? 's' : ''} selected
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedStudents([])}
                  className="text-[#757575]"
                >
                  Clear selection
                </Button>
              </div>
            )}

            {/* Student List */}
            <Card className="border-[#D0D0D0]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Select Students</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleAllFiltered}
                    className="border-[#D0D0D0]"
                  >
                    {filteredStudents.every((s) => selectedStudents.includes(s.id))
                      ? 'Deselect All'
                      : 'Select All'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {filteredStudents.map((student) => {
                    const isSelected = selectedStudents.includes(student.id);
                    return (
                      <div
                        key={student.id}
                        onClick={() => toggleStudent(student.id)}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors flex items-center gap-3 ${
                          isSelected
                            ? 'border-[#333333] bg-[#F5F5F5]'
                            : 'border-[#D0D0D0] hover:border-[#9E9E9E]'
                        }`}
                      >
                        <Checkbox checked={isSelected} />
                        <div className="flex-1">
                          <p className="font-medium text-[#1A1A1A]">{student.name}</p>
                          <p className="text-sm text-[#757575]">
                            {student.id} - Grade {student.grade} - Teacher: {student.primaryTeacher}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredStudents.length === 0 && (
                  <p className="text-center text-[#757575] py-8">No students found</p>
                )}
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="mt-4 border-[#D0D0D0] bg-[#F5F5F5]">
              <CardContent className="py-4">
                <p className="text-sm text-[#4A4A4A]">
                  <strong>Note:</strong> Assigning students to a behavioral expert will allow them
                  to view the students' behavior profiles, incident history, and provide
                  specialized intervention support. The expert will be notified of these
                  assignments.
                </p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => navigate('/admin/students')}
                className="border-[#D0D0D0]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAssign}
                disabled={selectedStudents.length === 0}
                className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
              >
                Assign {selectedStudents.length} Student{selectedStudents.length > 1 ? 's' : ''}
              </Button>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
