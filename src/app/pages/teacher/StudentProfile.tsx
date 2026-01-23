import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Sparkles, User } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';
import { MARCUS_PROFILE, STUDENTS } from '@/data/constants';

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // For demo, we'll use Marcus's profile if the ID matches, otherwise use a generic student
  const student = STUDENTS.find((s) => s.id === id) || STUDENTS[0];
  const profile = id === 'STU-4298' ? MARCUS_PROFILE : null;

  return (
    <TeacherLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        <Link
          to="/teacher/students"
          className="inline-flex items-center text-[#4A4A4A] hover:text-[#1A1A1A]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Students
        </Link>

        {/* Student Header */}
        <Card className="p-6 border border-[#D0D0D0] bg-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-[#E0E0E0] flex items-center justify-center">
                <User className="w-8 h-8 text-[#757575]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1A1A1A]">
                  {student.name}
                </h1>
                <div className="flex items-center space-x-4 text-[#757575]">
                  <span>{student.id}</span>
                  <span>•</span>
                  <span>Grade {student.grade}</span>
                  <span>•</span>
                  <span>{student.primaryTeacher}'s Class</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => navigate(`/teacher/incidents/new?student=${id}`)}
                className="bg-[#333333] hover:bg-[#1A1A1A] text-white rounded-lg"
              >
                Log Incident
              </Button>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white border border-[#D0D0D0] p-1">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#E0E0E0] data-[state=active]:text-[#1A1A1A]"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="triggers"
              className="data-[state=active]:bg-[#E0E0E0] data-[state=active]:text-[#1A1A1A]"
            >
              Triggers
            </TabsTrigger>
            <TabsTrigger
              value="strategies"
              className="data-[state=active]:bg-[#E0E0E0] data-[state=active]:text-[#1A1A1A]"
            >
              Strategies
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-[#E0E0E0] data-[state=active]:text-[#1A1A1A]"
            >
              History
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Known Triggers */}
              <Card className="p-6 border border-[#D0D0D0] bg-white">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                  Known Triggers
                </h3>
                {profile ? (
                  <ul className="space-y-2">
                    {profile.triggers.map((trigger, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-[#9E9E9E]"></span>
                        <span className="text-[#4A4A4A]">{trigger.name}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[#757575]">No triggers recorded yet.</p>
                )}
              </Card>

              {/* What Usually Works */}
              <Card className="p-6 border border-[#D0D0D0] bg-white">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                  What Usually Works
                </h3>
                {profile ? (
                  <ol className="space-y-2">
                    {profile.strategies.map((strategy, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="font-medium text-[#1A1A1A] min-w-[1.5rem]">
                          {strategy.priority}.
                        </span>
                        <p className="text-[#4A4A4A]">{strategy.name}</p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-[#757575]">No strategies recorded yet.</p>
                )}
              </Card>
            </div>

            {/* Recent Incident Timeline */}
            <Card className="p-6 border border-[#D0D0D0] bg-white">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                Recent Incident Timeline
              </h3>
              {profile && profile.incidents.length > 0 ? (
                <div className="space-y-4">
                  {profile.incidents.map((incident) => (
                    <div
                      key={incident.id}
                      className="border-l-2 border-[#D0D0D0] pl-4 pb-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-[#757575]">
                          {incident.date} • {incident.time}
                        </p>
                        <Badge
                          variant={
                            incident.status === 'Closed' ? 'outline' : 'secondary'
                          }
                          className={
                            incident.status === 'Closed'
                              ? 'border-[#9E9E9E] text-[#4A4A4A]'
                              : 'bg-[#E0E0E0] text-[#4A4A4A]'
                          }
                        >
                          {incident.status}
                        </Badge>
                      </div>
                      <p className="text-[#1A1A1A] font-medium mb-1">
                        {incident.trigger}
                      </p>
                      <p className="text-[#4A4A4A] text-sm mb-2">
                        {incident.notes}
                      </p>
                      <p className="text-xs text-[#757575]">
                        ID: {incident.id}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#757575]">No incidents recorded for this student yet.</p>
              )}
            </Card>
          </TabsContent>

          {/* Triggers Tab */}
          <TabsContent value="triggers">
            <Card className="p-6 border border-[#D0D0D0] bg-white">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                All Triggers
              </h3>
              {profile ? (
                <div className="space-y-4">
                  {profile.triggers.map((trigger, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-[#E0E0E0] rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-[#1A1A1A]">{trigger.name}</p>
                        <p className="text-sm text-[#757575]">
                          Last occurred: {trigger.lastOccurred}
                        </p>
                      </div>
                      <Badge variant="outline" className="border-[#9E9E9E] text-[#4A4A4A]">
                        {trigger.frequency} times
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#757575]">No triggers recorded yet.</p>
              )}
            </Card>
          </TabsContent>

          {/* Strategies Tab */}
          <TabsContent value="strategies">
            <Card className="p-6 border border-[#D0D0D0] bg-white">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                Effective Strategies
              </h3>
              {profile ? (
                <div className="space-y-4">
                  {profile.strategies.map((strategy, index) => (
                    <div
                      key={index}
                      className="p-4 border border-[#E0E0E0] rounded-lg"
                    >
                      <p className="font-medium text-[#1A1A1A]">
                        {strategy.priority}. {strategy.name}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#757575]">No strategies recorded yet.</p>
              )}
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card className="p-6 border border-[#D0D0D0] bg-white">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                Incident History
              </h3>
              {profile && profile.incidents.length > 0 ? (
                <div className="space-y-3">
                  {profile.incidents.map((incident) => (
                    <div
                      key={incident.id}
                      className="p-4 border border-[#E0E0E0] rounded-lg hover:bg-[#F5F5F5] cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-[#757575]">
                          {incident.date} • {incident.time}
                        </p>
                        <Badge
                          variant={
                            incident.status === 'Closed' ? 'outline' : 'secondary'
                          }
                          className={
                            incident.status === 'Closed'
                              ? 'border-[#9E9E9E] text-[#4A4A4A]'
                              : 'bg-[#E0E0E0] text-[#4A4A4A]'
                          }
                        >
                          {incident.status}
                        </Badge>
                      </div>
                      <p className="text-[#1A1A1A] font-medium">{incident.trigger}</p>
                      <p className="text-sm text-[#757575] mt-1">ID: {incident.id}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#757575]">No incidents recorded for this student yet.</p>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TeacherLayout>
  );
}