
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Search, Clock, Users, Sparkles, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RecipeGenerator = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // Simulate recipe search
    setTimeout(() => {
      const mockRecipes = [
        {
          id: 1,
          name: `Delicious ${searchQuery} Delight`,
          description: `A mouth-watering ${searchQuery} recipe that will satisfy your cravings`,
          cookTime: "30 min",
          servings: 4,
          difficulty: "Easy",
          ingredients: [
            "2 cups fresh ingredients",
            "1 tbsp olive oil",
            "Salt and pepper to taste",
            "Fresh herbs for garnish"
          ],
          instructions: [
            "Prepare all ingredients and wash thoroughly",
            "Heat olive oil in a large pan over medium heat",
            "Add main ingredients and cook for 15-20 minutes",
            "Season with salt, pepper, and herbs",
            "Serve hot and enjoy!"
          ]
        },
        {
          id: 2,
          name: `Classic ${searchQuery} Supreme`,
          description: `Traditional ${searchQuery} recipe with a modern twist`,
          cookTime: "45 min",
          servings: 6,
          difficulty: "Medium",
          ingredients: [
            "3 cups premium ingredients",
            "2 tbsp butter",
            "1 onion, diced",
            "Special seasonings"
          ],
          instructions: [
            "Preheat oven to 375°F (190°C)",
            "Sauté onions until golden brown",
            "Combine all ingredients in a baking dish",
            "Bake for 30-35 minutes until golden",
            "Let cool for 5 minutes before serving"
          ]
        }
      ];
      
      setRecipes(mockRecipes);
      setIsLoading(false);
      toast({
        title: "Recipes Found!",
        description: `Found ${mockRecipes.length} delicious recipes for "${searchQuery}"`,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-recipe-orange/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="text-recipe-orange hover:bg-recipe-orange/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="w-10 h-10 bg-recipe-orange rounded-full flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Recipe Generator</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12 text-center animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            What are you craving today?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Tell us what you'd like to eat, and we'll find the perfect recipe for you!
          </p>
          
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="e.g., pasta, chicken curry, chocolate cake..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-4 text-lg border-recipe-orange/30 focus:border-recipe-orange focus:ring-recipe-orange/20 rounded-full"
              />
            </div>
            <Button
              type="submit"
              className="bg-recipe-orange hover:bg-recipe-orange-dark text-white px-8 py-4 rounded-full hover-lift"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Searching...
                </div>
              ) : (
                <>
                  <Sparkles className="mr-2 w-5 h-5" />
                  Generate Recipe
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Quick Suggestions */}
        {recipes.length === 0 && (
          <div className="max-w-4xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Popular Searches</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                "Pasta Carbonara", "Chicken Curry", "Chocolate Cake", "Caesar Salad",
                "Beef Tacos", "Vegetable Stir Fry", "Banana Bread", "Fish and Chips"
              ].map((suggestion, index) => (
                <Badge
                  key={suggestion}
                  variant="outline"
                  className="cursor-pointer hover:bg-recipe-orange hover:text-white hover:border-recipe-orange px-4 py-2 text-sm font-medium border-recipe-orange/50 text-recipe-orange transition-all hover-lift"
                  onClick={() => {
                    setSearchQuery(suggestion);
                    handleSearch({ preventDefault: () => {} } as React.FormEvent);
                  }}
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Recipe Results */}
        {recipes.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center animate-fade-in">
              Perfect Recipes for "{searchQuery}"
            </h3>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {recipes.map((recipe, index) => (
                <Card
                  key={recipe.id}
                  className="food-card hover-lift animate-fade-in border-0"
                  style={{ animationDelay: `${0.4 + index * 0.2}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl text-gray-800 mb-2">{recipe.name}</CardTitle>
                        <CardDescription className="text-gray-600 text-base">
                          {recipe.description}
                        </CardDescription>
                      </div>
                      <Badge className="bg-recipe-green text-white">
                        {recipe.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mt-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-recipe-orange" />
                        {recipe.cookTime}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1 text-recipe-green" />
                        {recipe.servings} servings
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Ingredients:</h4>
                      <ul className="space-y-1">
                        {recipe.ingredients.map((ingredient: string, idx: number) => (
                          <li key={idx} className="text-gray-600 text-sm flex items-start">
                            <span className="w-2 h-2 bg-recipe-orange rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Instructions:</h4>
                      <ol className="space-y-2">
                        {recipe.instructions.map((step: string, idx: number) => (
                          <li key={idx} className="text-gray-600 text-sm flex items-start">
                            <span className="bg-recipe-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button className="flex-1 bg-recipe-orange hover:bg-recipe-orange-dark text-white">
                        Start Cooking
                      </Button>
                      <Button variant="outline" className="border-recipe-green text-recipe-green hover:bg-recipe-green hover:text-white">
                        Save Recipe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeGenerator;
