import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Card } from '@/app/components/ui/card';
import { toast } from 'sonner';

export default function ParentLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('lisa.thompson@gmail.com');
  const [password, setPassword] = useState('password123');
  const [rememberDevice, setRememberDevice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === 'lisa.thompson@gmail.com') {
      toast.success('Login successful!');
      navigate('/parent/dashboard');
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#F5F5F5]">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center text-[#4A4A4A] hover:text-[#1A1A1A] mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portal Selection
        </Link>

        <Card className="p-8 border border-[#D0D0D0] bg-white">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#1A1A1A] mb-1">
              BehaveBridge
            </h1>
            <h2 className="text-lg text-[#4A4A4A]">Parent Portal</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-[#1A1A1A]">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 border-[#D0D0D0] focus:border-[#333333]"
                required
              />
              <p className="text-xs text-[#757575] mt-1">
                Use: lisa.thompson@gmail.com
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
            >
              Sign In
            </Button>

            <div className="text-center space-y-2">
              <Link
                to="/parent/forgot-password"
                className="block text-sm text-[#4A4A4A] hover:text-[#1A1A1A] underline"
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