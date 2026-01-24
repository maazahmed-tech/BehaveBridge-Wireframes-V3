import { ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Brain,
  UserCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Link2
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Students', path: '/admin/students' },
    { icon: GraduationCap, label: 'Teachers', path: '/admin/teachers' },
    { icon: Brain, label: 'Behavioral Experts', path: '/admin/experts' },
    { icon: UserCircle, label: 'Parents', path: '/admin/parents' },
    { icon: Link2, label: 'Assignments', path: '/admin/assignments' },
    { icon: Settings, label: 'Settings', path: '/admin/account' }
  ];

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F5F5F5]">
      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-[#D0D0D0] transition-all duration-300 ${
          sidebarOpen ? 'w-[280px]' : 'w-[72px]'
        } md:block hidden`}
      >
        <div className="h-full flex flex-col">
          {/* Logo & Toggle */}
          <div className="p-6 border-b border-[#E0E0E0] flex-shrink-0">
            <div className="flex items-center justify-between">
              {sidebarOpen && (
                <h1 className="font-bold text-xl text-[#1A1A1A]">
                  BehaveBridge
                </h1>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-[#757575] hover:text-[#333333]"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Profile - Top, Non-clickable */}
          <div className="p-4 border-b border-[#E0E0E0] flex-shrink-0">
            <div className={`flex items-center px-4 py-3 ${!sidebarOpen && 'justify-center'}`}>
              <div className={`rounded-full bg-[#E0E0E0] flex items-center justify-center flex-shrink-0 ${
                sidebarOpen ? 'w-8 h-8' : 'w-[50px] h-[50px]'
              }`}>
                <UserCircle className={sidebarOpen ? "w-5 h-5 text-[#333333]" : "w-[30px] h-[30px] text-[#333333]"} />
              </div>
              {sidebarOpen && (
                <div className="ml-3">
                  <div className="text-sm font-medium text-[#1A1A1A]">Admin User</div>
                  <div className="text-xs text-[#757575]">Administrator</div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className={sidebarOpen ? "flex-1 p-4 space-y-2 overflow-hidden" : "flex-1 px-2 py-4 space-y-2 overflow-hidden"}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center w-full rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#E0E0E0] text-[#1A1A1A]'
                      : 'text-[#4A4A4A] hover:bg-[#F5F5F5]'
                  } ${sidebarOpen ? 'px-4 py-3' : 'py-4 justify-center'}`}
                >
                  <Icon className={sidebarOpen ? "w-5 h-5" : "w-6 h-6"} />
                  {sidebarOpen && <span className="ml-3">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Logout Button - Bottom */}
          <div className={sidebarOpen ? "p-4 border-t border-[#E0E0E0] flex-shrink-0" : "px-2 py-4 border-t border-[#E0E0E0] flex-shrink-0"}>
            <button
              onClick={handleLogout}
              className={`flex items-center w-full rounded-lg transition-colors text-[#4A4A4A] hover:bg-[#F5F5F5] ${
                sidebarOpen ? 'px-4 py-3' : 'py-4 justify-center'
              }`}
            >
              <LogOut className={sidebarOpen ? "w-5 h-5" : "w-6 h-6"} />
              {sidebarOpen && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
        sidebarOpen ? 'md:ml-[280px]' : 'md:ml-[72px]'
      }`}>
        {/* Page Content - Scrollable */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-[#D0D0D0] transition-transform duration-300 w-[280px] md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo & Toggle */}
          <div className="p-6 border-b border-[#E0E0E0] flex-shrink-0">
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-xl text-[#1A1A1A]">
                BehaveBridge
              </h1>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#757575] hover:text-[#333333]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Profile - Top, Non-clickable */}
          <div className="p-4 border-b border-[#E0E0E0] flex-shrink-0">
            <div className="flex items-center px-4 py-3">
              <div className="w-8 h-8 rounded-full bg-[#E0E0E0] flex items-center justify-center flex-shrink-0">
                <UserCircle className="w-5 h-5 text-[#333333]" />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-[#1A1A1A]">Admin User</div>
                <div className="text-xs text-[#757575]">Administrator</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-hidden">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#E0E0E0] text-[#1A1A1A]'
                      : 'text-[#4A4A4A] hover:bg-[#F5F5F5]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="ml-3">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout Button - Bottom */}
          <div className="p-4 border-t border-[#E0E0E0] flex-shrink-0">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-[#4A4A4A] hover:bg-[#F5F5F5] rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}