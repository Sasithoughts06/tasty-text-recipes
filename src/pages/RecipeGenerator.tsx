
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Search, Clock, Users, Sparkles, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Real recipe database
const RECIPE_DATABASE = {
  "pasta": [
    {
      id: 1,
      name: "Classic Spaghetti Carbonara",
      description: "Traditional Italian pasta dish with eggs, cheese, and pancetta",
      cookTime: "20 min",
      servings: 4,
      difficulty: "Medium",
      ingredients: [
        "400g spaghetti",
        "200g pancetta or guanciale, diced",
        "3 large eggs",
        "100g Pecorino Romano cheese, grated",
        "2 cloves garlic, minced",
        "Black pepper to taste",
        "Salt for pasta water"
      ],
      instructions: [
        "Bring a large pot of salted water to boil and cook spaghetti according to package directions",
        "While pasta cooks, heat a large skillet and cook pancetta until crispy",
        "In a bowl, whisk together eggs, grated cheese, and black pepper",
        "Reserve 1 cup pasta water before draining",
        "Add hot pasta to the skillet with pancetta",
        "Remove from heat and quickly stir in egg mixture, adding pasta water as needed",
        "Serve immediately with extra cheese and black pepper"
      ]
    },
    {
      id: 2,
      name: "Creamy Mushroom Fettuccine",
      description: "Rich and creamy pasta with mixed mushrooms and herbs",
      cookTime: "25 min",
      servings: 4,
      difficulty: "Easy",
      ingredients: [
        "400g fettuccine pasta",
        "300g mixed mushrooms, sliced",
        "1 cup heavy cream",
        "3 cloves garlic, minced",
        "1 small onion, diced",
        "50g Parmesan cheese, grated",
        "2 tbsp olive oil",
        "Fresh parsley, chopped",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Cook fettuccine according to package instructions",
        "Heat olive oil in a large pan, sauté onion until translucent",
        "Add garlic and mushrooms, cook until mushrooms are golden",
        "Pour in cream and simmer for 5 minutes",
        "Add cooked pasta to the sauce and toss",
        "Stir in Parmesan cheese and fresh parsley",
        "Season with salt and pepper, serve hot"
      ]
    }
  ],
  "chicken": [
    {
      id: 3,
      name: "Honey Garlic Chicken",
      description: "Sweet and savory chicken with a sticky glaze",
      cookTime: "30 min",
      servings: 4,
      difficulty: "Easy",
      ingredients: [
        "1 kg chicken thighs, boneless",
        "1/3 cup honey",
        "1/4 cup soy sauce",
        "4 cloves garlic, minced",
        "2 tbsp olive oil",
        "1 tbsp rice vinegar",
        "1 tsp ginger, grated",
        "2 green onions, chopped",
        "Sesame seeds for garnish"
      ],
      instructions: [
        "Heat olive oil in a large skillet over medium-high heat",
        "Season chicken with salt and pepper, cook until golden brown",
        "In a bowl, whisk together honey, soy sauce, garlic, vinegar, and ginger",
        "Pour sauce over chicken and simmer for 15 minutes",
        "Turn chicken occasionally until sauce thickens",
        "Garnish with green onions and sesame seeds",
        "Serve with rice or vegetables"
      ]
    }
  ],
  "pizza": [
    {
      id: 4,
      name: "Margherita Pizza",
      description: "Classic Italian pizza with tomatoes, mozzarella, and basil",
      cookTime: "25 min",
      servings: 2,
      difficulty: "Medium",
      ingredients: [
        "1 pizza dough (store-bought or homemade)",
        "1/2 cup pizza sauce",
        "200g fresh mozzarella, sliced",
        "2 large tomatoes, sliced",
        "Fresh basil leaves",
        "2 tbsp olive oil",
        "Salt and pepper to taste",
        "Flour for dusting"
      ],
      instructions: [
        "Preheat oven to 250°C (480°F)",
        "Roll out pizza dough on a floured surface",
        "Transfer to a pizza stone or baking sheet",
        "Spread pizza sauce evenly over dough",
        "Add mozzarella slices and tomato slices",
        "Drizzle with olive oil and season with salt and pepper",
        "Bake for 12-15 minutes until crust is golden",
        "Top with fresh basil leaves and serve hot"
      ]
    }
  ],
  "curry": [
    {
      id: 5,
      name: "Chicken Tikka Masala",
      description: "Creamy tomato-based curry with tender chicken pieces",
      cookTime: "45 min",
      servings: 4,
      difficulty: "Medium",
      ingredients: [
        "600g chicken breast, cubed",
        "1 cup heavy cream",
        "400g canned tomatoes, crushed",
        "1 large onion, diced",
        "3 cloves garlic, minced",
        "1 tbsp ginger, grated",
        "2 tbsp tikka masala spice blend",
        "2 tbsp tomato paste",
        "2 tbsp vegetable oil",
        "Fresh cilantro for garnish",
        "Salt to taste"
      ],
      instructions: [
        "Heat oil in a large pan, cook chicken until browned on all sides",
        "Remove chicken and set aside",
        "In the same pan, sauté onion until golden",
        "Add garlic, ginger, and spices, cook for 1 minute",
        "Add tomato paste and cook for another minute",
        "Pour in crushed tomatoes and simmer for 10 minutes",
        "Return chicken to pan, add cream, and simmer for 15 minutes",
        "Garnish with cilantro and serve with rice or naan"
      ]
    }
  ],
  "cake": [
    {
      id: 6,
      name: "Classic Chocolate Cake",
      description: "Moist and rich chocolate cake perfect for any occasion",
      cookTime: "60 min",
      servings: 8,
      difficulty: "Medium",
      ingredients: [
        "200g all-purpose flour",
        "200g caster sugar",
        "75g cocoa powder",
        "2 tsp baking powder",
        "1 tsp baking soda",
        "2 large eggs",
        "250ml buttermilk",
        "125ml vegetable oil",
        "2 tsp vanilla extract",
        "250ml hot coffee",
        "Pinch of salt"
      ],
      instructions: [
        "Preheat oven to 180°C (350°F) and grease two 20cm cake pans",
        "In a large bowl, whisk together flour, sugar, cocoa, baking powder, baking soda, and salt",
        "In another bowl, beat eggs, then add buttermilk, oil, and vanilla",
        "Combine wet and dry ingredients, then gradually add hot coffee",
        "Divide batter between prepared pans",
        "Bake for 30-35 minutes until a toothpick comes out clean",
        "Cool completely before frosting with your favorite chocolate frosting"
      ]
    }
  ]
};

const RecipeGenerator = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const { toast } = useToast();

  const findRecipes = (query: string) => {
    const searchTerm = query.toLowerCase();
    let foundRecipes: any[] = [];
    
    // Search through all recipe categories
    Object.entries(RECIPE_DATABASE).forEach(([category, categoryRecipes]) => {
      if (searchTerm.includes(category) || category.includes(searchTerm)) {
        foundRecipes = [...foundRecipes, ...categoryRecipes];
      } else {
        // Search within recipe names
        const matchingRecipes = categoryRecipes.filter(recipe => 
          recipe.name.toLowerCase().includes(searchTerm) ||
          recipe.description.toLowerCase().includes(searchTerm)
        );
        foundRecipes = [...foundRecipes, ...matchingRecipes];
      }
    });

    return foundRecipes;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const foundRecipes = findRecipes(searchQuery);
      
      if (foundRecipes.length === 0) {
        // Generate a simple recipe if no exact match
        const genericRecipe = {
          id: 999,
          name: `${searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)} Recipe`,
          description: `A delicious ${searchQuery} recipe made with fresh ingredients`,
          cookTime: "30 min",
          servings: 4,
          difficulty: "Easy",
          ingredients: [
            "Main ingredients for " + searchQuery,
            "Seasonings and spices",
            "Oil or butter for cooking",
            "Salt and pepper to taste"
          ],
          instructions: [
            "Prepare and clean all ingredients",
            "Heat oil in a pan over medium heat",
            "Cook main ingredients until tender",
            "Season with salt, pepper, and spices",
            "Serve hot and enjoy!"
          ]
        };
        setRecipes([genericRecipe]);
      } else {
        setRecipes(foundRecipes);
      }
      
      setIsLoading(false);
      toast({
        title: "Recipes Found!",
        description: `Found ${foundRecipes.length || 1} delicious recipe(s) for "${searchQuery}"`,
      });
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    const foundRecipes = findRecipes(suggestion);
    setRecipes(foundRecipes);
    toast({
      title: "Recipe Loaded!",
      description: `Showing recipes for "${suggestion}"`,
    });
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
                  Back to Dashboard
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
                placeholder="e.g., pasta, chicken, pizza, curry, cake..."
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
                  Find Recipe
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
                "pasta", "chicken", "pizza", "curry",
                "cake", "salad", "soup", "sandwich"
              ].map((suggestion, index) => (
                <Badge
                  key={suggestion}
                  variant="outline"
                  className="cursor-pointer hover:bg-recipe-orange hover:text-white hover:border-recipe-orange px-4 py-2 text-sm font-medium border-recipe-orange/50 text-recipe-orange transition-all hover-lift"
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  {suggestion.charAt(0).toUpperCase() + suggestion.slice(1)}
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
            
            <div className="grid lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
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
                      <ul className="space-y-2">
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
                      <ol className="space-y-3">
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
            
            <div className="text-center mt-8">
              <Button 
                variant="outline" 
                onClick={() => {
                  setRecipes([]);
                  setSearchQuery("");
                }}
                className="border-recipe-orange text-recipe-orange hover:bg-recipe-orange hover:text-white"
              >
                Search for Another Recipe
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeGenerator;
