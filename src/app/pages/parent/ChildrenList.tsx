import { ParentLayout } from '@/app/components/ParentLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Link } from 'react-router-dom';
import { User, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface Child {
  id: string;
  name: string;
  grade: string;
  teacher: string;
  recentIncidents: number;
  unreadNotifications: number;
  activeSupport: boolean;
}

export default function ChildrenList() {
  const children: Child[] = [
    {
      id: 'STU-4298',
      name: 'Marcus Thompson',
      grade: '4th Grade',
      teacher: 'Mrs. Maria Johnson',
      recentIncidents: 3,
      unreadNotifications: 2,
      activeSupport: true
    },
    {
      id: 'STU-3621',
      name: 'Emma Thompson',
      grade: '2nd Grade',
      teacher: 'Mr. James Taylor',
      recentIncidents: 1,
      unreadNotifications: 0,
      activeSupport: false
    }
  ];

  return (
    <ParentLayout>
      <div className="max-w-4xl">
        <h1 className="text-2xl text-[#1A1A1A] mb-6">My Children</h1>

        <div className="space-y-4">
          {children.map((child) => (
            <Card key={child.id} className="border-[#D0D0D0]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-16 h-16 rounded-full bg-[#E0E0E0] flex items-center justify-center">
                      <User className="w-8 h-8 text-[#757575]" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl text-[#1A1A1A] mb-1">{child.name}</h2>
                      <p className="text-[#757575] mb-3">
                        {child.grade} • {child.teacher}
                      </p>
                    </div>
                  </div>

                  <Link to={`/parent/children/${child.id}`}>
                    <Button className="bg-[#333333] hover:bg-[#1A1A1A] text-white">
                      View Profile
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ParentLayout>
  );
}