import { useAuth } from '@/contexts/AuthContext';

const AuthDebug = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (process.env.NODE_ENV !== 'development') {
    return null; // Only show in development
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 text-white p-4 rounded-lg shadow-lg text-xs font-mono max-w-xs">
      <div className="font-bold mb-2 text-green-400">🔐 Auth Status</div>
      <div className="space-y-1">
        <div>
          <span className="text-gray-400">Loading:</span> {isLoading ? '⏳ Yes' : '✅ No'}
        </div>
        <div>
          <span className="text-gray-400">Authenticated:</span> {isAuthenticated ? '✅ Yes' : '❌ No'}
        </div>
        {user && (
          <>
            <div className="mt-2 pt-2 border-t border-gray-700">
              <div className="text-yellow-400 font-bold mb-1">User Info:</div>
              <div><span className="text-gray-400">Name:</span> {user.name}</div>
              <div><span className="text-gray-400">Email:</span> {user.email}</div>
              <div><span className="text-gray-400">ID:</span> {user.id}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthDebug;
