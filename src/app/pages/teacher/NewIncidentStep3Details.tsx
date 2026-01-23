import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { STUDENTS } from '@/data/constants';
import { toast } from 'sonner';

export default function NewIncidentStep3Details() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('student');
  const student = STUDENTS.find((s) => s.id === studentId);

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
  );
  const [classPeriod, setClassPeriod] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [severity, setSeverity] = useState('');

  const handleNext = () => {
    if (!classPeriod || !location || !category || !severity) {
      toast.error('Please fill in all required fields');
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.set('date', date);
    params.set('time', time);
    params.set('classPeriod', classPeriod);
    params.set('location', location);
    params.set('category', category);
    params.set('severity', severity);
    navigate(`/teacher/incidents/new/step4?${params.toString()}`);
  };

  const handleBack = () => {
    navigate(`/teacher/incidents/new/step2?student=${studentId}`);
  };

  if (!student) {
    return null;
  }

  return (
    <TeacherLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          to={`/teacher/incidents/new/step2?student=${studentId}`}
          className="inline-flex items-center text-[#4A4A4A] hover:text-[#1A1A1A]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Log New Incident</h1>
          <p className="text-[#757575]">Step 3 of 5: Incident Details</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2">
          <div className="flex-1 h-2 bg-[#333333] rounded-full"></div>
          <div className="flex-1 h-2 bg-[#333333] rounded-full"></div>
          <div className="flex-1 h-2 bg-[#333333] rounded-full"></div>
          <div className="flex-1 h-2 bg-[#E0E0E0] rounded-full"></div>
          <div className="flex-1 h-2 bg-[#E0E0E0] rounded-full"></div>
        </div>

        {/* Student Info */}
        <Card className="p-4 border border-[#D0D0D0] bg-[#F5F5F5]">
          <p className="text-sm text-[#757575]">Student:</p>
          <p className="font-semibold text-[#1A1A1A]">
            {student.name} • {student.id} • Grade {student.grade}
          </p>
        </Card>

        {/* Form */}
        <Card className="p-6 border border-[#D0D0D0] bg-white space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div>
              <Label htmlFor="date" className="text-[#1A1A1A]">
                Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 border-[#D0D0D0] focus:border-[#333333]"
              />
            </div>

            {/* Time */}
            <div>
              <Label htmlFor="time" className="text-[#1A1A1A]">
                Time <span className="text-red-500">*</span>
              </Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 border-[#D0D0D0] focus:border-[#333333]"
              />
            </div>
          </div>

          {/* Class/Period */}
          <div>
            <Label htmlFor="class" className="text-[#1A1A1A]">
              Class/Period <span className="text-red-500">*</span>
            </Label>
            <Select value={classPeriod} onValueChange={setClassPeriod}>
              <SelectTrigger className="mt-1 border-[#D0D0D0]">
                <SelectValue placeholder="Select class or period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="math">Math</SelectItem>
                <SelectItem value="reading">Reading</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="social-studies">Social Studies</SelectItem>
                <SelectItem value="pe">PE</SelectItem>
                <SelectItem value="art">Art</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="recess">Recess</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location" className="text-[#1A1A1A]">
              Location <span className="text-red-500">*</span>
            </Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="mt-1 border-[#D0D0D0]">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classroom">Classroom</SelectItem>
                <SelectItem value="hallway">Hallway</SelectItem>
                <SelectItem value="cafeteria">Cafeteria</SelectItem>
                <SelectItem value="playground">Playground</SelectItem>
                <SelectItem value="gym">Gym</SelectItem>
                <SelectItem value="library">Library</SelectItem>
                <SelectItem value="restroom">Restroom</SelectItem>
                <SelectItem value="bus">Bus</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Behavior Category */}
          <div>
            <Label htmlFor="category" className="text-[#1A1A1A]">
              Behavior Category <span className="text-red-500">*</span>
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1 border-[#D0D0D0]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disruptive">Disruptive</SelectItem>
                <SelectItem value="defiant">Defiant</SelectItem>
                <SelectItem value="physical">Physical</SelectItem>
                <SelectItem value="verbal">Verbal</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
                <SelectItem value="property-damage">Property Damage</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Severity */}
          <div>
            <Label className="text-[#1A1A1A] mb-3 block">
              Severity Level <span className="text-red-500">*</span>
            </Label>
            <RadioGroup value={severity} onValueChange={setSeverity}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border border-[#E0E0E0] rounded-lg">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low" className="flex-1 cursor-pointer">
                    <div className="font-medium text-[#1A1A1A]">Low</div>
                    <div className="text-sm text-[#757575]">Minor disruption, easily redirected</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-[#E0E0E0] rounded-lg">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="flex-1 cursor-pointer">
                    <div className="font-medium text-[#1A1A1A]">Medium</div>
                    <div className="text-sm text-[#757575]">Moderate disruption, requires intervention</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border border-[#E0E0E0] rounded-lg">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high" className="flex-1 cursor-pointer">
                    <div className="font-medium text-[#1A1A1A]">High</div>
                    <div className="text-sm text-[#757575]">Significant disruption, multiple strategies needed</div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            className="border-[#D0D0D0] text-[#333333] hover:bg-[#F5F5F5] rounded-lg"
          >
            ← Back
          </Button>
          <Button
            onClick={handleNext}
            className="bg-[#333333] hover:bg-[#1A1A1A] text-white rounded-lg"
          >
            Next →
          </Button>
        </div>
      </div>
    </TeacherLayout>
  );
}