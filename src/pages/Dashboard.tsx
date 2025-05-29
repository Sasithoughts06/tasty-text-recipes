
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, Search, MessageSquare, BookOpen, TrendingUp, Clock, Heart } from "lucide-react";

const Dashboard = () => {
  const [userName] = useState("Chef Sarah");

  const recentRecipes = [
    { id: 1, name: "Creamy Pasta Carbonara", time: "25 min", difficulty: "Easy", likes: 142 },
    { id: 2, name: "Thai Green Curry", time: "35 min", difficulty: "Medium", likes: 98 },
    { id: 3, name: "Chocolate Lava Cake", time: "20 min", difficulty: "Easy", likes: 203 }
  ];

  const trendingRecipes = [
    { id: 1, name: "Air Fryer Chicken Wings", trend: "+25%" },
    { id: 2, name: "Vegan Buddha Bowl", trend: "+18%" },
    { id: 3, name: "Sourdough Bread", trend: "+31%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-recipe-orange/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-recipe-orange rounded-full flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Recipe Discovery</h1>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-gray-600">Welcome back, {userName}!</span>
              <Button variant="outline" size="sm" className="border-recipe-orange text-recipe-orange hover:bg-recipe-orange hover:text-white">
                Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            What's cooking today, {userName.split(' ')[1]}?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Ready to discover your next favorite recipe?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/recipe-generator">
              <Button className="bg-recipe-orange hover:bg-recipe-orange-dark text-white px-8 py-4 text-lg rounded-full hover-lift">
                <Search className="mr-2 w-5 h-5" />
                Find Recipes
              </Button>
            </Link>
            <Link to="/assistant">
              <Button variant="outline" className="border-recipe-green text-recipe-green hover:bg-recipe-green hover:text-white px-8 py-4 text-lg rounded-full hover-lift">
                <MessageSquare className="mr-2 w-5 h-5" />
                Ask Assistant
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="food-card hover-lift animate-fade-in border-0">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-recipe-orange rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800">156</div>
              <div className="text-sm text-gray-600">Recipes Tried</div>
            </CardContent>
          </Card>
          
          <Card className="food-card hover-lift animate-fade-in border-0" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-recipe-green rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800">89</div>
              <div className="text-sm text-gray-600">Favorites</div>
            </CardContent>
          </Card>
          
          <Card className="food-card hover-lift animate-fade-in border-0" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-recipe-red rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800">3.2h</div>
              <div className="text-sm text-gray-600">Avg Cook Time</div>
            </CardContent>
          </Card>
          
          <Card className="food-card hover-lift animate-fade-in border-0" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-recipe-purple rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800">12</div>
              <div className="text-sm text-gray-600">This Week</div>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Recipes */}
          <Card className="food-card animate-fade-in border-0" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Your Recent Recipes</CardTitle>
              <CardDescription>Keep track of your culinary adventures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRecipes.map((recipe, index) => (
                  <div key={recipe.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
                    <div>
                      <h4 className="font-semibold text-gray-800">{recipe.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {recipe.time}
                        </span>
                        <span>{recipe.difficulty}</span>
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1 text-recipe-red" />
                          {recipe.likes}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-recipe-orange hover:text-recipe-orange-dark">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trending Recipes */}
          <Card className="food-card animate-fade-in border-0" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Trending Now</CardTitle>
              <CardDescription>Popular recipes in the community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingRecipes.map((recipe, index) => (
                  <div key={recipe.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-recipe-orange/10 to-recipe-green/10 rounded-lg hover:from-recipe-orange/20 hover:to-recipe-green/20 transition-all" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
                    <div>
                      <h4 className="font-semibold text-gray-800">{recipe.name}</h4>
                      <div className="flex items-center text-sm text-recipe-green font-medium">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {recipe.trend}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-recipe-green hover:text-recipe-green-dark">
                      Try Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
