import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#F5F5F5]">
          <Card className="p-8 border border-[#D0D0D0] bg-white max-w-md w-full">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <AlertTriangle className="w-16 h-16 text-[#757575]" />
              </div>
              <h1 className="text-2xl font-bold text-[#1A1A1A]">
                Something went wrong
              </h1>
              <p className="text-[#757575]">
                An unexpected error occurred. Please try refreshing the page.
              </p>
              {this.state.error && (
                <details className="text-left text-sm text-[#757575] border border-[#E0E0E0] rounded p-4">
                  <summary className="cursor-pointer font-semibold">
                    Error details
                  </summary>
                  <pre className="mt-2 overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
              <Button
                onClick={this.handleReset}
                className="bg-[#1A1A1A] hover:bg-[#333333] text-white"
              >
                Return to Home
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
