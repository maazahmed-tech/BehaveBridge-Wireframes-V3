import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Search, User } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Label } from '@/app/components/ui/label';
import { STUDENTS } from '@/data/constants';

export default function NewIncidentStep1() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  const recentStudents = STUDENTS.slice(0, 3);
  
  const filteredStudents = searchTerm
    ? STUDENTS.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : STUDENTS;

  const handleNext = () => {
    if (selectedStudent) {
      navigate(`/teacher/incidents/new/step2?student=${selectedStudent}`);
    }
  };

  return (
    <TeacherLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          to="/teacher/dashboard"
          className="inline-flex items-center text-[#4A4A4A] hover:text-[#1A1A1A]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Cancel
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Log New Incident</h1>
          <p className="text-[#757575]">Step 1 of 5: Select Student</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2">
          <div className="flex-1 h-2 bg-[#333333] rounded-full"></div>
          <div className="flex-1 h-2 bg-[#E0E0E0] rounded-full"></div>
          <div className="flex-1 h-2 bg-[#E0E0E0] rounded-full"></div>
          <div className="flex-1 h-2 bg-[#E0E0E0] rounded-full"></div>
          <div className="flex-1 h-2 bg-[#E0E0E0] rounded-full"></div>
        </div>

        {/* Search */}
        <Card className="p-6 border border-[#D0D0D0] bg-white">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
            <Input
              type="text"
              placeholder="Search by name or student ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#D0D0D0] focus:border-[#333333]"
            />
          </div>

          {/* Recently Accessed */}
          {!searchTerm && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3">
                Recently Accessed Students
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {recentStudents.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudent(student.id)}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      selectedStudent === student.id
                        ? 'border-[#333333] bg-[#F5F5F5]'
                        : 'border-[#D0D0D0] hover:bg-[#F5F5F5]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-[#E0E0E0] flex items-center justify-center">
                        <User className="w-5 h-5 text-[#757575]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1A1A1A]">{student.name}</p>
                        <p className="text-sm text-[#757575]">Grade {student.grade}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* All Students */}
          <div>
            <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3">
              {searchTerm ? 'Search Results' : 'All Assigned Students'}
            </h3>
            <RadioGroup value={selectedStudent} onValueChange={setSelectedStudent}>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center space-x-3 p-3 border border-[#E0E0E0] rounded-lg hover:bg-[#F5F5F5]"
                  >
                    <RadioGroupItem value={student.id} id={student.id} />
                    <Label
                      htmlFor={student.id}
                      className="flex-1 cursor-pointer flex items-center justify-between"
                    >
                      <span className="font-medium text-[#1A1A1A]">
                        {student.name}
                      </span>
                      <span className="text-sm text-[#757575]">
                        {student.id} • Grade {student.grade}
                      </span>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate('/teacher/dashboard')}
            className="border-[#D0D0D0] text-[#333333] hover:bg-[#F5F5F5] rounded-lg"
          >
            Cancel
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedStudent}
            className="bg-[#333333] hover:bg-[#1A1A1A] text-white rounded-lg disabled:opacity-50"
          >
            Next →
          </Button>
        </div>
      </div>
    </TeacherLayout>
  );
}