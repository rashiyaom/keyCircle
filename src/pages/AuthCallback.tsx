import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Check, X, Loader2 } from "lucide-react";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the hash from URL (Supabase uses hash for auth tokens)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const type = hashParams.get("type");

        if (type === "signup") {
          setStatus("success");
          setMessage("Email verified successfully! You can now sign in.");
          
          // Redirect to sign in page after 2 seconds
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        } else if (accessToken) {
          // Get the current session
          const { data: { session }, error } = await supabase.auth.getSession();

          if (error) throw error;

          if (session) {
            setStatus("success");
            setMessage("Authentication successful! Redirecting...");
            
            // Redirect to home page
            setTimeout(() => {
              navigate("/");
            }, 1500);
          }
        } else {
          throw new Error("No authentication token found");
        }
      } catch (error: unknown) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Authentication failed");
        
        // Redirect to sign in page after 3 seconds
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/5 to-background p-4">
      <div className="max-w-md w-full bg-card rounded-3xl shadow-xl p-8 text-center space-y-6">
        {status === "loading" && (
          <>
            <div className="flex justify-center">
              <Loader2 className="w-16 h-16 text-accent animate-spin" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Verifying...
            </h1>
            <p className="text-muted-foreground font-body">
              Please wait while we verify your email
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-10 h-10 text-green-500" />
              </div>
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Success!
            </h1>
            <p className="text-muted-foreground font-body">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                <X className="w-10 h-10 text-red-500" />
              </div>
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Verification Failed
            </h1>
            <p className="text-muted-foreground font-body">{message}</p>
            <button
              onClick={() => navigate("/signin")}
              className="px-6 py-3 bg-accent text-accent-foreground rounded-xl font-medium hover:shadow-lg transition-all"
            >
              Go to Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
