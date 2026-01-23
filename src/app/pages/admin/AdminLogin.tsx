import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Card } from '@/app/components/ui/card';
import { toast } from 'sonner';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('admin@lincolnelementary.edu');
  const [password, setPassword] = useState('password123');
  const [rememberDevice, setRememberDevice] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock authentication - accept the dummy credentials
    if (
      email === 'admin@lincolnelementary.edu' ||
      email === 'ADM-2024-0001'
    ) {
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts >= 3) {
        toast.error('Account locked. Too many failed attempts. Please try again in 15 minutes.');
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#F5F5F5]">
      <div className="w-full max-w-md">
        {/* Back to Portal Selection */}
        <Link
          to="/"
          className="inline-flex items-center text-[#4A4A4A] hover:text-[#1A1A1A] mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portal Selection
        </Link>

        <Card className="p-8 border border-[#D0D0D0] bg-white">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#1A1A1A] mb-1">
              BehaveBridge
            </h1>
            <h2 className="text-lg text-[#4A4A4A]">School Admin Panel</h2>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-[#1A1A1A]">
                Email / Admin ID
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="admin@lincolnelementary.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 border-[#D0D0D0] focus:border-[#333333]"
                required
                disabled={failedAttempts >= 3}
              />
              <p className="text-xs text-[#757575] mt-1">
                Admin ID: ADM-2024-0001
              </p>
            </div>

            <div>
              <Label htmlFor="password" className="text-[#1A1A1A]">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-[#D0D0D0] focus:border-[#333333] pr-10"
                  required
                  disabled={failedAttempts >= 3}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#757575] hover:text-[#333333]"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberDevice}
                onCheckedChange={(checked) => setRememberDevice(checked as boolean)}
                disabled={failedAttempts >= 3}
              />
              <Label
                htmlFor="remember"
                className="text-sm text-[#4A4A4A] cursor-pointer"
              >
                Remember this device
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#333333] hover:bg-[#1A1A1A] text-white rounded-full"
              disabled={failedAttempts >= 3}
            >
              Sign In
            </Button>

            <div className="text-center">
              <Link
                to="/admin/forgot-password"
                className="text-sm text-[#4A4A4A] hover:text-[#1A1A1A] underline"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="text-center text-xs text-[#757575] pt-4 border-t border-[#E0E0E0]">
              Session timeout: 30 minutes of inactivity
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}