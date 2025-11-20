import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    const errorId = `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return { 
      hasError: true, 
      error,
      errorId
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('🚨 Error Boundary Caught Error:', {
      error,
      errorInfo,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
    });

    this.reportError(error, errorInfo);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  reportError = (error, errorInfo) => {
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
    };

    try {
      if (typeof window !== 'undefined') {
        const existingErrors = JSON.parse(localStorage.getItem('linkly_errors') || '[]');
        const updatedErrors = [errorReport, ...existingErrors.slice(0, 4)];
        localStorage.setItem('linkly_errors', JSON.stringify(updatedErrors));
      }
    } catch (e) {
      console.error('Failed to store error:', e);
    }
  };

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorId: undefined });
  };

  handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
            {/* ... (Icon) ... */}
            
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-2">
              We encountered an unexpected error while processing your request.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Error ID: <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">{this.state.errorId}</code>
            </p>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={this.handleRetry}
                  className="flex-1 bg-[#3B6F7B] text-white px-6 py-3 rounded-xl font-semibold ..."
                >
                  {/* ... (Icon) ... */}
                  Try Again
                </button>
                
                <button
                  onClick={this.handleGoHome}
                  className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold ..."
                >
                  {/* ... (Icon) ... */}
                  Go Home
                </button>
              </div>
            </div>
            
            {/* CHANGED to import.meta.env.MODE */}
            {import.meta.env.MODE === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-gray-500 cursor-pointer mb-2">
                  🔧 Development Details
                </summary>
                <pre className="bg-red-50 p-3 rounded-lg text-xs text-red-800 overflow-auto max-h-40 border border-red-200">
                  {this.state.error.message}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;