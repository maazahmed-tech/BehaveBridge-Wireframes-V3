import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExpertLayout } from '@/app/components/ExpertLayout';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Search } from 'lucide-react';
import { STUDENTS } from '@/data/constants';

export default function ExpertStudentsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [caseFilter, setCaseFilter] = useState('all');

  const studentsWithData = STUDENTS.map((student, index) => ({
    ...student,
    incidentCount: [24, 12, 8, 15, 10, 18, 14, 9, 6][index] || 0,
    hasActiveCase: [true, false, false, false, false, false, false, false, false][index] || false,
  }));

  const filteredStudents = studentsWithData.filter((student) => {
    const matchesSearch =
      searchTerm === '' ||
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGrade = gradeFilter === 'all' || student.grade.toString() === gradeFilter;
    
    const matchesCase = 
      caseFilter === 'all' ||
      (caseFilter === 'active' && student.hasActiveCase) ||
      (caseFilter === 'none' && !student.hasActiveCase);

    return matchesSearch && matchesGrade && matchesCase;
  });

  return (
    <ExpertLayout>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl text-[#1A1A1A] mb-2">All Students</h1>
          <p className="text-[#4A4A4A]">View and manage behavioral profiles for all assigned students</p>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
            <Input
              placeholder="Search by student name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#D0D0D0] text-[#1A1A1A]"
            />
          </div>
          <Select value={gradeFilter} onValueChange={setGradeFilter}>
            <SelectTrigger className="w-48 border-[#D0D0D0] text-[#1A1A1A]">
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
          <Select value={caseFilter} onValueChange={setCaseFilter}>
            <SelectTrigger className="w-48 border-[#D0D0D0] text-[#1A1A1A]">
              <SelectValue placeholder="All Cases" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cases</SelectItem>
              <SelectItem value="active">Has Active Case</SelectItem>
              <SelectItem value="none">No Active Case</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4 text-sm text-[#757575]">
          Showing {filteredStudents.length} of {studentsWithData.length} students
        </div>

        {filteredStudents.length === 0 ? (
          <Card className="border-[#D0D0D0] p-12">
            <div className="text-center">
              <p className="text-[#757575] mb-4">No students found matching your criteria</p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setGradeFilter('all');
                  setCaseFilter('all');
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
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Student Name</th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Student ID</th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Grade</th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Primary Teacher</th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Incidents</th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`border-b border-[#E0E0E0] hover:bg-[#FAFAFA] ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                    }`}
                  >
                    <td className="p-4 text-[#1A1A1A] font-medium">{student.name}</td>
                    <td className="p-4 text-[#4A4A4A]">{student.id}</td>
                    <td className="p-4 text-[#4A4A4A]">Grade {student.grade}</td>
                    <td className="p-4 text-[#4A4A4A]">{student.primaryTeacher}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="border-[#9E9E9E] text-[#4A4A4A]">
                        {student.incidentCount}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {student.hasActiveCase ? (
                        <Badge className="bg-[#9E9E9E] text-white">Active Case</Badge>
                      ) : (
                        <span className="text-sm text-[#757575]">—</span>
                      )}
                    </td>
                    <td className="p-4">
                      <Link to={`/expert/students/${student.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
                        >
                          View Profile
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
    </ExpertLayout>
  );
}