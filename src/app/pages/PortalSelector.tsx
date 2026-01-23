import { useNavigate } from 'react-router-dom';
import { GraduationCap, Brain, Users, Settings } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';

export default function PortalSelector() {
  const navigate = useNavigate();

  const portals = [
    {
      title: 'Teacher',
      subtitle: 'Portal',
      icon: GraduationCap,
      path: '/teacher/login',
    },
    {
      title: 'Behavioral',
      subtitle: 'Expert Portal',
      icon: Brain,
      path: '/expert/login',
    },
    {
      title: 'Parent',
      subtitle: 'Portal',
      icon: Users,
      path: '/parent/login',
    },
    {
      title: 'School',
      subtitle: 'Admin Panel',
      icon: Settings,
      path: '/admin/login',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#F5F5F5]">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1A1A1A] mb-2">
            BehaveBridge
          </h1>
          <p className="text-[#4A4A4A]">
            School Behavior Documentation & Support System
          </p>
        </div>

        {/* Portal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <Card
                key={portal.path}
                className="p-8 border border-[#D0D0D0] bg-white hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(portal.path)}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#E0E0E0] flex items-center justify-center">
                    <Icon className="w-8 h-8 text-[#333333]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[#1A1A1A]">
                      {portal.title}
                    </h2>
                    <p className="text-[#4A4A4A]">{portal.subtitle}</p>
                  </div>
                  <Button
                    variant="default"
                    className="w-full bg-[#333333] hover:bg-[#1A1A1A] text-white rounded-full"
                  >
                    Enter →
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}