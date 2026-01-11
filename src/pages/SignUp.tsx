import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/10 to-background px-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/auth')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Sign Up Form Container */}
        <div className="bg-card rounded-3xl shadow-badge border border-border/50 p-8">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
            Create Account
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-8">
            Join our community and start sharing
          </p>

          {/* Placeholder - Form will be built later */}
          <div className="space-y-4">
            <div className="text-center py-12 border-2 border-dashed border-border rounded-2xl">
              <p className="text-muted-foreground text-sm">
                Sign-up flow will be implemented here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
