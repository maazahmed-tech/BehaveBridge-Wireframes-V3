import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import { STUDENTS } from '@/data/constants';

export default function TeacherStudents() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');

  let filteredStudents = [...STUDENTS];

  // Filter by search term
  if (searchTerm) {
    filteredStudents = filteredStudents.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filter by grade
  if (gradeFilter !== 'all') {
    filteredStudents = filteredStudents.filter(
      (student) => student.grade === parseInt(gradeFilter)
    );
  }

  // Sort
  if (sortBy === 'name-asc') {
    filteredStudents.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'name-desc') {
    filteredStudents.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <TeacherLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Students</h1>
          <p className="text-[#757575]">Search and view your assigned students</p>
        </div>

        <Card className="p-6 border border-[#D0D0D0] bg-white">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
              <Input
                type="text"
                placeholder="Search by name or student ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-[#D0D0D0] focus:border-[#333333]"
              />
            </div>
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="w-full md:w-[180px] border-[#D0D0D0]">
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
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px] border-[#D0D0D0]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="recent">Recently Accessed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Student Count */}
          <p className="text-sm text-[#757575] mb-4">
            Showing {filteredStudents.length} of {STUDENTS.length} students
          </p>

          {/* Students Table */}
          {filteredStudents.length > 0 ? (
            <div className="border border-[#E0E0E0] rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#F5F5F5]">
                    <TableHead className="text-[#1A1A1A] font-semibold">Name</TableHead>
                    <TableHead className="text-[#1A1A1A] font-semibold">Student ID</TableHead>
                    <TableHead className="text-[#1A1A1A] font-semibold">Grade</TableHead>
                    <TableHead className="text-[#1A1A1A] font-semibold">Class</TableHead>
                    <TableHead className="text-[#1A1A1A] font-semibold text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow
                      key={student.id}
                      className="hover:bg-[#F5F5F5] cursor-pointer"
                      onClick={() => navigate(`/teacher/students/${student.id}`)}
                    >
                      <TableCell className="font-medium text-[#1A1A1A]">
                        {student.name}
                      </TableCell>
                      <TableCell className="text-[#4A4A4A]">{student.id}</TableCell>
                      <TableCell className="text-[#4A4A4A]">Grade {student.grade}</TableCell>
                      <TableCell className="text-[#4A4A4A]">
                        {student.primaryTeacher}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#D0D0D0] text-[#333333] hover:bg-[#F5F5F5] rounded-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/teacher/students/${student.id}`);
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#757575]">No students found matching your search.</p>
            </div>
          )}
        </Card>
      </div>
    </TeacherLayout>
  );
}