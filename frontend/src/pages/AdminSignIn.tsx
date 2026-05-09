import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

// Hidden admin route - not linked anywhere in the UI
const AdminSignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/10 to-background px-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Admin Sign In Form Container */}
        <div className="bg-card rounded-3xl shadow-badge border border-border/50 p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-accent" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Admin Access
            </h2>
          </div>
          <p className="font-body text-sm text-muted-foreground mb-8">
            Authorized personnel only
          </p>

          {/* Placeholder - Admin form will be built later */}
          <div className="space-y-4">
            <div className="text-center py-12 border-2 border-dashed border-border rounded-2xl">
              <p className="text-muted-foreground text-sm">
                Admin authentication will be implemented here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;
