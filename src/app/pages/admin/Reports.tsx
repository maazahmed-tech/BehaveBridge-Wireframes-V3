import { useState } from 'react';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { 
  BarChart3, 
  TrendingDown, 
  TrendingUp,
  Users,
  AlertTriangle,
  Download,
  Calendar
} from 'lucide-react';

export default function Reports() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  const schoolMetrics = {
    totalIncidents: 142,
    incidentChange: -8,
    totalStudents: 450,
    studentsWithIncidents: 87,
    avgIncidentsPerStudent: 1.6,
    expertCases: 23,
    caseChange: 3,
    teacherReports: 142,
    parentEngagement: 94
  };

  const incidentsByCategory = [
    { category: 'Disruptive Behavior', count: 45, percent: 32 },
    { category: 'Physical Aggression', count: 28, percent: 20 },
    { category: 'Defiance', count: 24, percent: 17 },
    { category: 'Academic Avoidance', count: 20, percent: 14 },
    { category: 'Verbal Outburst', count: 15, percent: 11 },
    { category: 'Other', count: 10, percent: 6 }
  ];

  const incidentsByGrade = [
    { grade: 'Kindergarten', count: 12 },
    { grade: '1st Grade', count: 18 },
    { grade: '2nd Grade', count: 24 },
    { grade: '3rd Grade', count: 31 },
    { grade: '4th Grade', count: 35 },
    { grade: '5th Grade', count: 22 }
  ];

  const topTeachers = [
    { name: 'Mrs. Maria Johnson', reports: 28, responseTime: '12 min' },
    { name: 'Mr. David Chen', reports: 24, responseTime: '15 min' },
    { name: 'Ms. Jennifer Martinez', reports: 19, responseTime: '10 min' }
  ];

  const handleExportReport = (type: string) => {
    console.log(`Exporting ${type} report`);
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-[#1A1A1A] mb-2">Reports & Analytics</h1>
            <p className="text-[#757575]">School-wide behavior data and insights</p>
          </div>
          <Button
            onClick={() => handleExportReport('comprehensive')}
            className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Full Report
          </Button>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6 flex gap-2">
          <Button
            onClick={() => setTimeRange('week')}
            variant={timeRange === 'week' ? 'default' : 'outline'}
            className={
              timeRange === 'week'
                ? 'bg-[#333333] hover:bg-[#1A1A1A] text-white'
                : 'border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]'
            }
          >
            This Week
          </Button>
          <Button
            onClick={() => setTimeRange('month')}
            variant={timeRange === 'month' ? 'default' : 'outline'}
            className={
              timeRange === 'month'
                ? 'bg-[#333333] hover:bg-[#1A1A1A] text-white'
                : 'border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]'
            }
          >
            This Month
          </Button>
          <Button
            onClick={() => setTimeRange('quarter')}
            variant={timeRange === 'quarter' ? 'default' : 'outline'}
            className={
              timeRange === 'quarter'
                ? 'bg-[#333333] hover:bg-[#1A1A1A] text-white'
                : 'border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]'
            }
          >
            This Quarter
          </Button>
          <Button
            onClick={() => setTimeRange('year')}
            variant={timeRange === 'year' ? 'default' : 'outline'}
            className={
              timeRange === 'year'
                ? 'bg-[#333333] hover:bg-[#1A1A1A] text-white'
                : 'border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]'
            }
          >
            This Year
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="border-[#D0D0D0]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-[#757575]">Total Incidents</div>
                <AlertTriangle className="w-4 h-4 text-[#757575]" />
              </div>
              <div className="text-2xl font-semibold text-[#1A1A1A] mb-1">
                {schoolMetrics.totalIncidents}
              </div>
              <div className="flex items-center gap-1 text-sm text-[#4A4A4A]">
                <TrendingDown className="w-4 h-4" />
                <span>{Math.abs(schoolMetrics.incidentChange)}% decrease</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#D0D0D0]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-[#757575]">Students Involved</div>
                <Users className="w-4 h-4 text-[#757575]" />
              </div>
              <div className="text-2xl font-semibold text-[#1A1A1A] mb-1">
                {schoolMetrics.studentsWithIncidents}
              </div>
              <div className="text-sm text-[#757575]">
                of {schoolMetrics.totalStudents} total students
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#D0D0D0]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-[#757575]">Expert Cases</div>
                <BarChart3 className="w-4 h-4 text-[#757575]" />
              </div>
              <div className="text-2xl font-semibold text-[#1A1A1A] mb-1">
                {schoolMetrics.expertCases}
              </div>
              <div className="flex items-center gap-1 text-sm text-[#757575]">
                <TrendingUp className="w-4 h-4" />
                <span>+{schoolMetrics.caseChange} this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#D0D0D0]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-[#757575]">Parent Engagement</div>
                <Calendar className="w-4 h-4 text-[#757575]" />
              </div>
              <div className="text-2xl font-semibold text-[#1A1A1A] mb-1">
                {schoolMetrics.parentEngagement}%
              </div>
              <div className="text-sm text-[#757575]">
                Acknowledged incidents
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Incidents by Category */}
          <Card className="border-[#D0D0D0]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-[#1A1A1A]">Incidents by Category</CardTitle>
                <Button
                  onClick={() => handleExportReport('category')}
                  variant="outline"
                  size="sm"
                  className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {incidentsByCategory.map((item) => (
                <div key={item.category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[#1A1A1A]">{item.category}</span>
                    <span className="text-sm font-medium text-[#1A1A1A]">{item.count}</span>
                  </div>
                  <div className="w-full bg-[#E0E0E0] rounded-full h-2">
                    <div
                      className="bg-[#333333] h-2 rounded-full"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                  <div className="text-xs text-[#757575] mt-1">{item.percent}% of total</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Incidents by Grade */}
          <Card className="border-[#D0D0D0]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-[#1A1A1A]">Incidents by Grade Level</CardTitle>
                <Button
                  onClick={() => handleExportReport('grade')}
                  variant="outline"
                  size="sm"
                  className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {incidentsByGrade.map((item) => {
                const maxCount = Math.max(...incidentsByGrade.map(g => g.count));
                const percent = (item.count / maxCount) * 100;
                return (
                  <div key={item.grade} className="flex items-center gap-4">
                    <div className="w-24 text-sm text-[#1A1A1A]">{item.grade}</div>
                    <div className="flex-1">
                      <div className="w-full bg-[#E0E0E0] rounded-full h-6 flex items-center">
                        <div
                          className="bg-[#4A4A4A] h-6 rounded-full flex items-center justify-end px-2"
                          style={{ width: `${percent}%` }}
                        >
                          <span className="text-xs text-white font-medium">{item.count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Top Contributing Teachers */}
        <Card className="border-[#D0D0D0]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-[#1A1A1A]">Most Active Teachers</CardTitle>
              <Button
                onClick={() => handleExportReport('teachers')}
                variant="outline"
                size="sm"
                className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
              >
                <Download className="w-3 h-3 mr-1" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topTeachers.map((teacher, index) => (
                <div
                  key={teacher.name}
                  className="flex items-center justify-between p-4 bg-[#F5F5F5] rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Badge className="bg-[#E0E0E0] text-[#1A1A1A] w-8 h-8 rounded-full flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <div>
                      <div className="font-medium text-[#1A1A1A]">{teacher.name}</div>
                      <div className="text-sm text-[#757575]">
                        {teacher.reports} incident reports filed
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[#757575]">Avg Response Time</div>
                    <div className="font-medium text-[#1A1A1A]">{teacher.responseTime}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
