import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, X, ChevronUp, ChevronDown } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Label } from '@/app/components/ui/label';
import { Input } from '@/app/components/ui/input';
import { STUDENTS, STANDARD_TRIGGERS, STANDARD_STRATEGIES, MARCUS_PROFILE } from '@/data/constants';
import { toast } from 'sonner';

export default function NewIncidentStep3() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('student');
  const student = STUDENTS.find((s) => s.id === studentId);

  const [selectedTriggers, setSelectedTriggers] = useState<string[]>(['Transition between activities']);
  const [customTrigger, setCustomTrigger] = useState('');
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>(['Visual schedule reminder']);
  const [customStrategy, setCustomStrategy] = useState('');
  const [showAllTriggers, setShowAllTriggers] = useState(false);
  const [showAllStrategies, setShowAllStrategies] = useState(false);

  const knownTriggers = studentId === 'STU-4298' 
    ? MARCUS_PROFILE.triggers.map(t => t.name)
    : [];

  const recommendedStrategies = studentId === 'STU-4298'
    ? MARCUS_PROFILE.strategies.map(s => s.name)
    : [];

  const handleNext = () => {
    if (selectedTriggers.length === 0) {
      toast.error('Please select at least one trigger');
      return;
    }
    if (selectedStrategies.length === 0) {
      toast.error('Please select at least one strategy');
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set('triggers', selectedTriggers.join(','));
    params.set('strategies', selectedStrategies.join(','));
    navigate(`/teacher/incidents/new/step4?${params.toString()}`);
  };

  const handleBack = () => {
    navigate(`/teacher/incidents/new/details?${searchParams.toString()}`);
  };

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers(prev =>
      prev.includes(trigger)
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    );
  };

  const toggleStrategy = (strategy: string) => {
    setSelectedStrategies(prev =>
      prev.includes(strategy)
        ? prev.filter(s => s !== strategy)
        : [...prev, strategy]
    );
  };

  const addCustomTrigger = () => {
    if (customTrigger.trim()) {
      setSelectedTriggers(prev => [...prev, customTrigger.trim()]);
      setCustomTrigger('');
    }
  };

  const addCustomStrategy = () => {
    if (customStrategy.trim()) {
      setSelectedStrategies(prev => [...prev, customStrategy.trim()]);
      setCustomStrategy('');
    }
  };

  if (!student) {
    return null;
  }

  return (
    <TeacherLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          to={`/teacher/incidents/new/details?${searchParams.toString()}`}
          className="inline-flex items-center text-[#4A4A4A] hover:text-[#1A1A1A]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Log New Incident</h1>
          <p className="text-[#757575]">Step 3 of 4: Triggers & Strategies</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2">
          <div className="flex-1 h-2 bg-[#333333] rounded-full"></div>
          <div className="flex-1 h-2 bg-[#333333] rounded-full"></div>
          <div className="flex-1 h-2 bg-[#333333] rounded-full"></div>
          <div className="flex-1 h-2 bg-[#E0E0E0] rounded-full"></div>
        </div>

        {/* Student Info */}
        <Card className="p-4 border border-[#D0D0D0] bg-[#F5F5F5]">
          <p className="text-sm text-[#757575]">Student:</p>
          <p className="font-semibold text-[#1A1A1A]">
            {student.name} • {student.id} • Grade {student.grade}
          </p>
        </Card>

        {/* Triggers */}
        <Card className="p-6 border border-[#D0D0D0] bg-white space-y-4">
          <h3 className="text-lg font-semibold text-[#1A1A1A]">
            What triggered the behavior? <span className="text-red-500">*</span>
          </h3>

          {/* Known Triggers */}
          {knownTriggers.length > 0 && (
            <div className="p-4 bg-[#F5F5F5] rounded-lg space-y-3">
              <p className="text-sm font-medium text-[#1A1A1A]">
                Known Triggers for {student.firstName}:
              </p>
              {knownTriggers.map((trigger) => (
                <div key={trigger} className="flex items-center space-x-2">
                  <Checkbox
                    id={`trigger-${trigger}`}
                    checked={selectedTriggers.includes(trigger)}
                    onCheckedChange={() => toggleTrigger(trigger)}
                  />
                  <Label
                    htmlFor={`trigger-${trigger}`}
                    className="text-[#1A1A1A] cursor-pointer"
                  >
                    {trigger}
                  </Label>
                </div>
              ))}
            </div>
          )}

          {/* Other Triggers */}
          <div>
            <p className="text-sm font-medium text-[#1A1A1A] mb-3">Other Triggers:</p>
            <div className="space-y-2">
              {STANDARD_TRIGGERS.slice(0, showAllTriggers ? undefined : 8).map((trigger) => (
                !knownTriggers.includes(trigger) && (
                  <div key={trigger} className="flex items-center space-x-2">
                    <Checkbox
                      id={`trigger-${trigger}`}
                      checked={selectedTriggers.includes(trigger)}
                      onCheckedChange={() => toggleTrigger(trigger)}
                    />
                    <Label
                      htmlFor={`trigger-${trigger}`}
                      className="text-[#4A4A4A] cursor-pointer"
                    >
                      {trigger}
                    </Label>
                  </div>
                )
              ))}
            </div>
            <Button
              variant="ghost"
              onClick={() => setShowAllTriggers(!showAllTriggers)}
              className="mt-2 text-[#4A4A4A] hover:text-[#1A1A1A]"
            >
              {showAllTriggers ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Show More
                </>
              )}
            </Button>
          </div>

          {/* Custom Trigger */}
          <div className="flex gap-2">
            <Input
              placeholder="Add custom trigger..."
              value={customTrigger}
              onChange={(e) => setCustomTrigger(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomTrigger()}
              className="flex-1 border-[#D0D0D0] focus:border-[#333333]"
            />
            <Button
              onClick={addCustomTrigger}
              variant="outline"
              className="border-[#D0D0D0] text-[#333333] hover:bg-[#F5F5F5] rounded-lg"
            >
              Add
            </Button>
          </div>
        </Card>

        {/* Strategies */}
        <Card className="p-6 border border-[#D0D0D0] bg-white space-y-4">
          <h3 className="text-lg font-semibold text-[#1A1A1A]">
            What strategies were attempted? <span className="text-red-500">*</span>
          </h3>

          {/* Recommended Strategies */}
          {recommendedStrategies.length > 0 && (
            <div className="p-4 bg-[#F5F5F5] rounded-lg space-y-3">
              <p className="text-sm font-medium text-[#1A1A1A]">
                Recommended for {student.firstName}:
              </p>
              {recommendedStrategies.map((strategy) => (
                <div key={strategy} className="flex items-center space-x-2">
                  <Checkbox
                    id={`strategy-${strategy}`}
                    checked={selectedStrategies.includes(strategy)}
                    onCheckedChange={() => toggleStrategy(strategy)}
                  />
                  <Label
                    htmlFor={`strategy-${strategy}`}
                    className="text-[#1A1A1A] cursor-pointer"
                  >
                    {strategy}
                  </Label>
                </div>
              ))}
            </div>
          )}

          {/* Other Strategies */}
          <div>
            <p className="text-sm font-medium text-[#1A1A1A] mb-3">Other Strategies:</p>
            <div className="space-y-2">
              {STANDARD_STRATEGIES.slice(0, showAllStrategies ? undefined : 8).map((strategy) => (
                !recommendedStrategies.includes(strategy) && (
                  <div key={strategy} className="flex items-center space-x-2">
                    <Checkbox
                      id={`strategy-${strategy}`}
                      checked={selectedStrategies.includes(strategy)}
                      onCheckedChange={() => toggleStrategy(strategy)}
                    />
                    <Label
                      htmlFor={`strategy-${strategy}`}
                      className="text-[#4A4A4A] cursor-pointer"
                    >
                      {strategy}
                    </Label>
                  </div>
                )
              ))}
            </div>
            <Button
              variant="ghost"
              onClick={() => setShowAllStrategies(!showAllStrategies)}
              className="mt-2 text-[#4A4A4A] hover:text-[#1A1A1A]"
            >
              {showAllStrategies ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Show More
                </>
              )}
            </Button>
          </div>

          {/* Custom Strategy */}
          <div className="flex gap-2">
            <Input
              placeholder="Add custom strategy..."
              value={customStrategy}
              onChange={(e) => setCustomStrategy(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomStrategy()}
              className="flex-1 border-[#D0D0D0] focus:border-[#333333]"
            />
            <Button
              onClick={addCustomStrategy}
              variant="outline"
              className="border-[#D0D0D0] text-[#333333] hover:bg-[#F5F5F5] rounded-lg"
            >
              Add
            </Button>
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
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => toast.success('Draft saved')}
              className="border-[#D0D0D0] text-[#333333] hover:bg-[#F5F5F5] rounded-lg"
            >
              Save Draft
            </Button>
            <Button
              onClick={handleNext}
              className="bg-[#333333] hover:bg-[#1A1A1A] text-white rounded-lg"
            >
              Next →
            </Button>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}