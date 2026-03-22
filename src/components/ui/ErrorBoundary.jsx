import React from 'react';
import { motion } from 'framer-motion';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-md w-full bg-[var(--bg-secondary)] rounded-2xl p-8 shadow-2xl border border-[var(--border-primary)]"
          >
            {/* Error Illustration */}
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, -10, 0],
                }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.3,
                }}
                className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center"
              >
                <svg
                  className="w-12 h-12 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Error Message */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                Something went wrong
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                An unexpected error occurred. Don't worry, your data is safe.
              </p>
            </div>

            {/* Error Details (collapsible) */}
            {this.state.error && (
              <details className="mb-6">
                <summary className="text-xs text-[var(--text-tertiary)] cursor-pointer hover:text-[var(--text-secondary)] transition-colors">
                  Error details
                </summary>
                <pre className="mt-2 p-3 bg-[var(--bg-primary)] rounded-lg text-xs text-red-400 overflow-auto max-h-32 font-mono">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack && '\n' + this.state.errorInfo.componentStack.slice(0, 500)}
                </pre>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={this.handleReset}
                className="flex-1 px-4 py-2.5 bg-[var(--accent-primary)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Try Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={this.handleReload}
                className="flex-1 px-4 py-2.5 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg font-medium text-sm hover:bg-[var(--bg-hover)] transition-colors"
              >
                Reload Page
              </motion.button>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
