import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to an error reporting service or console
    if (process.env.NODE_ENV !== 'production') {
      console.error('ErrorBoundary caught:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container-padded py-16 text-center">
          <h1 className="text-3xl font-serif font-bold mb-4">Something went wrong</h1>
          <p className="mb-6 text-lg text-neutral-600">An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.</p>
          <button className="btn-primary px-8 py-3 text-lg" onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
