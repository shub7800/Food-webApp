import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Error Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Error Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-4">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Oops!
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
            Something went wrong
          </h2>

          {/* Error Details */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center gap-2 text-red-600 font-mono text-lg">
              <span className="font-bold">{err?.status || "Error"}</span>
              <span>:</span>
              <span>{err?.statusText || err?.message || "Unknown Error"}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-8 text-lg">
            {err?.status === 404 
              ? "The page you're looking for doesn't exist or has been moved."
              : "We're sorry, but something unexpected happened. Please try again later."}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 active:scale-95 transition-all duration-200 shadow-md"
            >
              ← Go Back
            </button>
            <a
              href="/"
              className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 active:scale-95 transition-all duration-200 shadow-md inline-block"
            >
              🏠 Home Page
            </a>
          </div>

          {/* Additional Help */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              Need help? Contact our support team
            </p>
            <a 
              href="/contact" 
              className="text-orange-500 hover:text-orange-600 font-medium underline"
            >
              Get Support
            </a>
          </div>
        </div>

        {/* Additional Info */}
        {err?.data && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-4">
            <details className="cursor-pointer">
              <summary className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Technical Details
              </summary>
              <pre className="mt-3 text-xs text-gray-600 overflow-auto p-3 bg-gray-50 rounded">
                {JSON.stringify(err.data, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

export default Error;