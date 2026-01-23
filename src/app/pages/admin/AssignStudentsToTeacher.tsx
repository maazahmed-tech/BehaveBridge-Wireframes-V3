import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Search, CheckCircle2 } from 'lucide-react';
import { STUDENTS } from '@/data/constants';
import { toast } from 'sonner';

export default function AssignStudentsToTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([
    'S-2024-0123', // Pre-selected students
    'S-2024-0124',
  ]);

  const teacherName = 'Maria Johnson'; // Mock data

  const filteredStudents = STUDENTS.filter((student) =>
    searchTerm === '' ||
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStudent = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSave = () => {
    toast.success('Student assignments updated successfully');
    navigate('/admin/teachers');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <header className="bg-white border-b border-[#D0D0D0] px-8 py-4 mb-8">
        <div>
          <Link to="/admin/teachers" className="text-[#4A4A4A] hover:text-[#1A1A1A] text-sm mb-2 block">
            ← Back to Teacher Management
          </Link>
          <h1 className="text-2xl text-[#1A1A1A]">Assign Students to {teacherName}</h1>
          <p className="text-sm text-[#757575] mt-1">Teacher ID: {id}</p>
        </div>
      </header>

      <div className="px-8 pb-8 max-w-4xl">
        <Card className="border-[#D0D0D0] p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-5 h-5 text-[#333333]" />
            <div>
              <h2 className="text-lg font-medium text-[#1A1A1A]">Currently Assigned</h2>
              <p className="text-sm text-[#757575]">{selectedStudents.length} students selected</p>
            </div>
          </div>
        </Card>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
          <Input
            placeholder="Search students by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-[#D0D0D0] text-[#1A1A1A]"
          />
        </div>

        <div className="bg-white border border-[#D0D0D0] rounded-lg overflow-hidden mb-6">
          <div className="max-h-[500px] overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-[#F5F5F5] border-b border-[#D0D0D0]">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A] w-12"></th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Student Name</th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Student ID</th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Grade</th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Current Teacher</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => {
                  const isSelected = selectedStudents.includes(student.id);
                  return (
                    <tr
                      key={student.id}
                      className={`border-b border-[#E0E0E0] hover:bg-[#FAFAFA] cursor-pointer ${
                        index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                      } ${isSelected ? 'bg-[#E0E0E0]' : ''}`}
                      onClick={() => toggleStudent(student.id)}
                    >
                      <td className="p-4">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleStudent(student.id)}
                        />
                      </td>
                      <td className="p-4 text-[#1A1A1A] font-medium">{student.name}</td>
                      <td className="p-4 text-[#4A4A4A]">{student.id}</td>
                      <td className="p-4 text-[#4A4A4A]">Grade {student.grade}</td>
                      <td className="p-4 text-[#757575]">{student.primaryTeacher}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/teachers')}
            className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
          >
            Save Student Assignments
          </Button>
        </div>
      </div>
    </div>
  );
}
