
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, Mail, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate password reset email sending
    setTimeout(() => {
      setEmailSent(true);
      toast({
        title: "Email Sent!",
        description: "Check your inbox for password reset instructions.",
      });
      setIsLoading(false);
    }, 1500);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-recipe-purple-light via-recipe-red-light to-recipe-orange-light flex items-center justify-center p-4">
        <Card className="w-full max-w-md food-card animate-bounce-in border-0">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-recipe-purple rounded-full flex items-center justify-center mx-auto animate-float">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800">Check Your Email</CardTitle>
            <CardDescription className="text-gray-600">
              We've sent password reset instructions to {email}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center text-gray-600 animate-fade-in">
              <p>Didn't receive the email? Check your spam folder or</p>
              <Button 
                variant="link" 
                className="text-recipe-purple hover:text-recipe-purple-dark p-0"
                onClick={() => setEmailSent(false)}
              >
                try again
              </Button>
            </div>
            
            <Link to="/login">
              <Button variant="outline" className="w-full border-recipe-purple text-recipe-purple hover:bg-recipe-purple hover:text-white rounded-full hover-lift">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-recipe-purple-light via-recipe-red-light to-recipe-orange-light flex items-center justify-center p-4">
      <Card className="w-full max-w-md food-card animate-bounce-in border-0">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-recipe-purple rounded-full flex items-center justify-center mx-auto animate-float">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">Reset Password</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your email address and we'll send you a link to reset your password
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 animate-fade-in">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="chef@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-recipe-purple/30 focus:border-recipe-purple focus:ring-recipe-purple/20"
                  required
                />
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-recipe-purple hover:bg-recipe-purple-dark text-white py-3 rounded-full hover-lift animate-fade-in"
              style={{ animationDelay: '0.2s' }}
              disabled={isLoading}
            >
              {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
            </Button>
            
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link 
                to="/login" 
                className="text-recipe-purple hover:text-recipe-purple-dark text-sm font-medium hover:underline inline-flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
