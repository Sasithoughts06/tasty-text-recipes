
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, Sparkles, Users, Clock } from "lucide-react";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className={`text-center space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="animate-bounce-in">
              <ChefHat className="w-20 h-20 mx-auto text-recipe-orange animate-float" />
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-recipe-orange to-recipe-green bg-clip-text text-transparent animate-fade-in">
              Recipe Discovery
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
              Discover delicious recipes based on your cravings or available ingredients! 
              Type what you feel like eating and get instant recipe recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/signup">
                <Button className="bg-recipe-orange hover:bg-recipe-orange-dark text-white px-8 py-4 text-lg rounded-full hover-lift">
                  Get Started
                  <Sparkles className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-recipe-orange text-recipe-orange hover:bg-recipe-orange hover:text-white px-8 py-4 text-lg rounded-full hover-lift">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Why Choose Recipe Discovery?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="food-card hover-lift animate-fade-in border-0">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-recipe-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Smart Recommendations</h3>
              <p className="text-gray-600">
                Get personalized recipe suggestions based on your preferences and available ingredients.
              </p>
            </CardContent>
          </Card>

          <Card className="food-card hover-lift animate-fade-in border-0" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-recipe-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Quick & Easy</h3>
              <p className="text-gray-600">
                Find recipes in seconds with step-by-step instructions that make cooking fun and simple.
              </p>
            </CardContent>
          </Card>

          <Card className="food-card hover-lift animate-fade-in border-0" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-recipe-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Community Driven</h3>
              <p className="text-gray-600">
                Join thousands of home cooks sharing their favorite recipes and cooking tips.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-recipe-orange to-recipe-red py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Cooking?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community of food lovers and discover your next favorite dish today!
          </p>
          <Link to="/signup">
            <Button className="bg-white text-recipe-orange hover:bg-gray-100 px-8 py-4 text-lg rounded-full hover-lift">
              Start Your Culinary Journey
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
