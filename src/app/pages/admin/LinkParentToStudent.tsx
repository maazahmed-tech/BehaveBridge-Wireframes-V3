import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { Link } from 'react-router-dom';
import { Search, UserPlus } from 'lucide-react';
import { STUDENTS } from '@/data/constants';
import { toast } from 'sonner';

export default function LinkParentToStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const parentName = 'Jennifer Rodriguez'; // Mock data
  const currentlyLinkedStudents = ['S-2024-0123']; // Mock: already linked student IDs

  const filteredStudents = STUDENTS.filter((student) => {
    const matchesSearch =
      searchTerm === '' ||
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Don't show already linked students
    const notLinked = !currentlyLinkedStudents.includes(student.id);
    
    return matchesSearch && notLinked;
  });

  const handleLink = () => {
    if (!selectedStudent) {
      toast.error('Please select a student to link');
      return;
    }
    toast.success('Student linked successfully');
    navigate('/admin/parents');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <header className="bg-white border-b border-[#D0D0D0] px-8 py-4 mb-8">
        <div>
          <Link to="/admin/parents" className="text-[#4A4A4A] hover:text-[#1A1A1A] text-sm mb-2 block">
            ← Back to Parent Management
          </Link>
          <h1 className="text-2xl text-[#1A1A1A]">Link Student to Parent Account</h1>
          <p className="text-sm text-[#757575] mt-1">Parent: {parentName} (ID: {id})</p>
        </div>
      </header>

      <div className="px-8 pb-8 max-w-4xl">
        <Card className="border-[#D0D0D0] p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <UserPlus className="w-5 h-5 text-[#333333]" />
            <div>
              <h2 className="text-lg font-medium text-[#1A1A1A]">Link Additional Student</h2>
              <p className="text-sm text-[#757575]">
                Select a student to link to this parent's account
              </p>
            </div>
          </div>

          <div className="bg-[#F5F5F5] p-4 rounded-lg mb-6">
            <p className="text-sm text-[#757575] mb-1">Currently Linked Students</p>
            <p className="text-[#1A1A1A] font-medium">
              {currentlyLinkedStudents.length} student(s) already linked
            </p>
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

        {filteredStudents.length === 0 ? (
          <Card className="border-[#D0D0D0] p-12">
            <div className="text-center">
              <p className="text-[#757575] mb-2">No available students found</p>
              <p className="text-sm text-[#757575]">All students may already be linked to this account</p>
            </div>
          </Card>
        ) : (
          <div className="bg-white border border-[#D0D0D0] rounded-lg overflow-hidden mb-6">
            <div className="max-h-[500px] overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-[#F5F5F5] border-b border-[#D0D0D0]">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Student Name</th>
                    <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Student ID</th>
                    <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Grade</th>
                    <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Primary Teacher</th>
                    <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => {
                    const isSelected = selectedStudent === student.id;
                    return (
                      <tr
                        key={student.id}
                        className={`border-b border-[#E0E0E0] hover:bg-[#FAFAFA] ${
                          index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                        } ${isSelected ? 'bg-[#E0E0E0]' : ''}`}
                      >
                        <td className="p-4 text-[#1A1A1A] font-medium">{student.name}</td>
                        <td className="p-4 text-[#4A4A4A]">{student.id}</td>
                        <td className="p-4 text-[#4A4A4A]">Grade {student.grade}</td>
                        <td className="p-4 text-[#757575]">{student.primaryTeacher}</td>
                        <td className="p-4">
                          <Button
                            variant={isSelected ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedStudent(student.id)}
                            className={isSelected 
                              ? 'bg-[#333333] hover:bg-[#1A1A1A] text-white'
                              : 'border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]'
                            }
                          >
                            {isSelected ? 'Selected' : 'Select'}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/parents')}
            className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleLink}
            disabled={!selectedStudent}
            className="bg-[#333333] hover:bg-[#1A1A1A] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Link Selected Student
          </Button>
        </div>
      </div>
    </div>
  );
}
