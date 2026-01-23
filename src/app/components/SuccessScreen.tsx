import { CheckCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Link } from 'react-router-dom';

interface SuccessScreenProps {
  title: string;
  message: string;
  primaryAction?: {
    label: string;
    to: string;
  };
  secondaryAction?: {
    label: string;
    to: string;
  };
  details?: {
    label: string;
    value: string;
  }[];
}

export function SuccessScreen({
  title,
  message,
  primaryAction,
  secondaryAction,
  details,
}: SuccessScreenProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 border-[#D0D0D0] bg-white text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-[#E0E0E0] p-4">
            <CheckCircle className="w-16 h-16 text-[#333333]" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-[#1A1A1A] mb-4">{title}</h1>
        <p className="text-[#4A4A4A] mb-6">{message}</p>

        {details && details.length > 0 && (
          <div className="bg-[#F5F5F5] rounded-lg p-4 mb-6 space-y-2">
            {details.map((detail, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-[#757575]">{detail.label}:</span>
                <span className="text-sm font-medium text-[#1A1A1A]">{detail.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {primaryAction && (
            <Button
              asChild
              className="bg-[#333333] hover:bg-[#1A1A1A] text-white w-full"
            >
              <Link to={primaryAction.to}>{primaryAction.label}</Link>
            </Button>
          )}
          {secondaryAction && (
            <Button
              asChild
              variant="outline"
              className="border-[#D0D0D0] text-[#333333] hover:bg-[#F5F5F5] w-full"
            >
              <Link to={secondaryAction.to}>{secondaryAction.label}</Link>
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
