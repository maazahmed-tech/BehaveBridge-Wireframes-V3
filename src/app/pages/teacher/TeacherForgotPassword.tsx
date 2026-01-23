import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card } from '@/app/components/ui/card';
import { toast } from 'sonner';

export default function TeacherForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSent(true);
    toast.success('Password reset link sent to your email!');
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#F5F5F5]">
        <div className="w-full max-w-md">
          <Card className="p-8 border border-[#D0D0D0] bg-white text-center">
            <div className="w-16 h-16 rounded-full bg-[#E0E0E0] flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-[#333333]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
              Reset Link Sent
            </h2>
            <p className="text-[#4A4A4A] mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-[#757575] mb-6">
              The link will expire in 30 minutes. Please check your inbox and spam folder.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => setEmailSent(false)}
                variant="outline"
                className="w-full border-[#D0D0D0] text-[#333333] hover:bg-[#F5F5F5] rounded-full"
              >
                Resend Link
              </Button>
              <Link to="/teacher/login" className="block">
                <Button
                  className="w-full bg-[#333333] hover:bg-[#1A1A1A] text-white rounded-full"
                >
                  Return to Login
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#F5F5F5]">
      <div className="w-full max-w-md">
        <Link
          to="/teacher/login"
          className="inline-flex items-center text-[#4A4A4A] hover:text-[#1A1A1A] mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Link>

        <Card className="p-8 border border-[#D0D0D0] bg-white">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#1A1A1A] mb-1">
              Forgot Password
            </h1>
            <p className="text-[#4A4A4A]">
              Enter your email to reset your password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-[#1A1A1A]">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@lincolnelementary.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 border-[#D0D0D0] focus:border-[#333333]"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#333333] hover:bg-[#1A1A1A] text-white rounded-full"
            >
              Send Reset Link
            </Button>

            <div className="text-center">
              <Link
                to="/teacher/login"
                className="text-sm text-[#4A4A4A] hover:text-[#1A1A1A] underline"
              >
                Remember your password? Sign in
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
