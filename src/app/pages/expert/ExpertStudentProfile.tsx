import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ExpertLayout } from '@/app/components/ExpertLayout';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { ArrowLeft, MessageSquare, Sparkles, Edit, Plus } from 'lucide-react';
import { STUDENTS, MARCUS_PROFILE } from '@/data/constants';

export default function ExpertStudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = STUDENTS.find((s) => s.id === id) || STUDENTS[0];
  const [activeTab, setActiveTab] = useState('history');

  const behaviorSummary = {
    totalIncidents: 24,
    escalations: 5,
    resolutionRate: 78,
    mostCommonTrigger: 'Peer conflict',
    mostEffectiveStrategy: 'Short break',
  };

  const parentInfo = {
    primary: 'Lisa Thompson',
    secondary: 'Robert Thompson',
    email: 'lisa.thompson@gmail.com',
    phone: '(555) 234-5678',
    preferredContact: 'Email',
  };

  return (
    <ExpertLayout>
      <div className="p-8 max-w-6xl">
        <Link to="/expert/students" className="inline-flex items-center gap-2 text-[#4A4A4A] hover:text-[#1A1A1A] mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to All Students
        </Link>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#E0E0E0] flex items-center justify-center">
                <span className="text-2xl text-[#4A4A4A]">
                  {student.firstName[0]}{student.lastName[0]}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl text-[#1A1A1A]">{student.name}</h1>
                  <Badge className="bg-[#9E9E9E] text-white">Active Case</Badge>
                </div>
                <p className="text-[#4A4A4A]">
                  {student.id} • Grade {student.grade} • {student.primaryTeacher}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card className="border-[#D0D0D0]">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-[#1A1A1A]">Parent Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-[#757575] mb-1">Primary Contact</div>
                  <div className="text-[#1A1A1A] font-medium">{parentInfo.primary}</div>
                </div>
                <div>
                  <div className="text-sm text-[#757575] mb-1">Secondary Contact</div>
                  <div className="text-[#1A1A1A]">{parentInfo.secondary}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <div className="text-sm text-[#757575] mb-1">Email</div>
                    <div className="text-[#1A1A1A] text-sm">{parentInfo.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#757575] mb-1">Phone</div>
                    <div className="text-[#1A1A1A] text-sm">{parentInfo.phone}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#D0D0D0]">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-[#1A1A1A]">Behavior Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl text-[#1A1A1A] font-bold mb-1">
                    {behaviorSummary.totalIncidents}
                  </div>
                  <div className="text-sm text-[#757575]">Total Incidents</div>
                </div>
                <div>
                  <div className="text-2xl text-[#1A1A1A] font-bold mb-1">
                    {behaviorSummary.escalations}
                  </div>
                  <div className="text-sm text-[#757575]">Escalations</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="border-b border-[#E0E0E0] w-full justify-start rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="history"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#333333] data-[state=active]:bg-transparent px-6 py-3"
            >
              Incident History
            </TabsTrigger>
            <TabsTrigger
              value="triggers"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#333333] data-[state=active]:bg-transparent px-6 py-3"
            >
              Triggers
            </TabsTrigger>
            <TabsTrigger
              value="strategies"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#333333] data-[state=active]:bg-transparent px-6 py-3"
            >
              Strategies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-6">
            <Card className="border-[#D0D0D0]">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-[#1A1A1A]">All Incident History</CardTitle>
                <p className="text-sm text-[#757575]">Incidents logged by all teachers</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MARCUS_PROFILE.incidents.map((incident) => (
                    <div key={incident.id} className="p-4 border border-[#E0E0E0] rounded-lg hover:bg-[#FAFAFA]">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-[#1A1A1A] font-medium">{incident.id}</div>
                          <div className="text-sm text-[#757575]">
                            {incident.date} at {incident.time} • {incident.teacher}
                          </div>
                        </div>
                        <Badge className={
                          incident.status === 'Closed' ? 'bg-[#757575] text-white' : 'bg-[#9E9E9E] text-white'
                        }>
                          {incident.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-[#4A4A4A] mb-2">
                        <span className="font-medium">Trigger:</span> {incident.trigger}
                      </div>
                      <div className="text-sm text-[#4A4A4A]">
                        <span className="font-medium">Outcome:</span> {incident.outcome}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="triggers" className="mt-6">
            <Card className="border-[#D0D0D0]">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-[#1A1A1A]">All Triggers</CardTitle>
                <p className="text-sm text-[#757575]">Identified behavioral triggers for {student.firstName}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MARCUS_PROFILE.triggers.map((trigger, index) => (
                    <div
                      key={index}
                      className="p-4 border border-[#E0E0E0] rounded-lg"
                    >
                      <p className="font-medium text-[#1A1A1A]">{trigger.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategies" className="mt-6">
            <Card className="border-[#D0D0D0]">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-[#1A1A1A]">Effective Strategies</CardTitle>
                <p className="text-sm text-[#757575]">Proven interventions for {student.firstName}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MARCUS_PROFILE.strategies.map((strategy, index) => (
                    <div
                      key={index}
                      className="p-4 border border-[#E0E0E0] rounded-lg"
                    >
                      <p className="font-medium text-[#1A1A1A]">
                        {strategy.name}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ExpertLayout>
  );
}