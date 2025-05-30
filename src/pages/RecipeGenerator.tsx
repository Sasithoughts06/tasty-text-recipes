import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, ArrowLeft, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import IngredientInput from "@/components/IngredientInput";
import RecipeCard from "@/components/RecipeCard";

// Comprehensive Indian recipe database
const RECIPE_DATABASE = {
  "beans": {
    dishes: [
      {
        id: 1,
        name: "Beans Poriyal",
        description: "Traditional South Indian beans stir-fry with coconut",
        cookTime: "15 min",
        servings: 4,
        difficulty: "Easy",
        ingredients: [
          "500g green beans, chopped finely",
          "2 tbsp coconut oil",
          "1 tsp mustard seeds",
          "8-10 curry leaves",
          "2 green chilies, chopped",
          "1/2 cup grated coconut",
          "1/2 tsp turmeric powder",
          "Salt to taste"
        ],
        instructions: [
          "Chop beans finely and boil them until soft.",
          "Heat oil and add mustard seeds and curry leaves.",
          "Add the cooked beans, salt, turmeric, and grated coconut.",
          "Stir well and cook for 2 minutes, then serve hot."
        ]
      },
      {
        id: 2,
        name: "Beans Curry",
        description: "Spicy beans curry with aromatic spices",
        cookTime: "25 min",
        servings: 4,
        difficulty: "Medium",
        ingredients: [
          "500g green beans, chopped",
          "2 onions, chopped",
          "3 tomatoes, chopped",
          "1 tsp ginger-garlic paste",
          "1 tsp turmeric powder",
          "2 tsp coriander powder",
          "1 tsp garam masala",
          "Fresh coriander leaves",
          "Salt to taste"
        ],
        instructions: [
          "Heat oil and sauté onions and tomatoes.",
          "Add chopped beans, spices, and a little water.",
          "Cover and cook until beans are tender.",
          "Garnish with coriander and serve with rice."
        ]
      },
      {
        id: 3,
        name: "Beans Stir Fry",
        description: "Quick and healthy beans stir fry",
        cookTime: "12 min",
        servings: 2,
        difficulty: "Easy",
        ingredients: [
          "400g green beans, chopped",
          "3 cloves garlic, chopped",
          "1 tsp mustard seeds",
          "2 tbsp oil",
          "Salt and pepper to taste",
          "1 tbsp lemon juice"
        ],
        instructions: [
          "Heat oil, add mustard seeds and chopped garlic.",
          "Add beans and stir-fry for 5–7 minutes.",
          "Season with salt, pepper, and a dash of lemon."
        ]
      },
      {
        id: 4,
        name: "Beans Paratha",
        description: "Stuffed flatbread with spiced beans filling",
        cookTime: "30 min",
        servings: 4,
        difficulty: "Medium",
        ingredients: [
          "2 cups wheat flour",
          "300g green beans, boiled and mashed",
          "1 tsp cumin powder",
          "1 tsp red chili powder",
          "1/2 tsp garam masala",
          "Ghee for cooking",
          "Salt to taste"
        ],
        instructions: [
          "Boil beans and mash lightly.",
          "Mix with spices and stuff into dough.",
          "Roll into paratha and cook with ghee on a hot tawa."
        ]
      }
    ]
  },
  "cabbage": {
    dishes: [
      {
        id: 5,
        name: "Cabbage Thoran",
        description: "Kerala style cabbage with coconut",
        cookTime: "15 min",
        servings: 4,
        difficulty: "Easy",
        ingredients: [
          "1 medium cabbage, finely shredded",
          "1/2 cup grated coconut",
          "2 green chilies",
          "1 tsp mustard seeds",
          "8-10 curry leaves",
          "1/2 tsp turmeric powder",
          "2 tbsp coconut oil",
          "Salt to taste"
        ],
        instructions: [
          "Shred cabbage finely.",
          "Heat oil, add mustard seeds, curry leaves, and green chilies.",
          "Add cabbage, salt, turmeric, and grated coconut.",
          "Cook for 5–6 minutes, serve hot."
        ]
      },
      {
        id: 6,
        name: "Cabbage Pakoda",
        description: "Crispy fried cabbage fritters",
        cookTime: "20 min",
        servings: 4,
        difficulty: "Medium",
        ingredients: [
          "2 cups cabbage, shredded",
          "1 cup gram flour (besan)",
          "2 tbsp rice flour",
          "1 tsp red chili powder",
          "1/2 tsp turmeric powder",
          "1 tsp carom seeds (ajwain)",
          "Oil for deep frying",
          "Salt to taste"
        ],
        instructions: [
          "Mix shredded cabbage with gram flour, rice flour, and spices.",
          "Add water to form a sticky batter.",
          "Deep fry spoonfuls until golden and crisp."
        ]
      }
    ]
  },
  "egg": {
    dishes: [
      {
        id: 7,
        name: "Egg Curry",
        description: "Spicy boiled egg curry in rich gravy",
        cookTime: "25 min",
        servings: 4,
        difficulty: "Medium",
        ingredients: [
          "6 eggs, boiled and peeled",
          "2 onions, chopped",
          "3 tomatoes, chopped",
          "1 tbsp ginger-garlic paste",
          "1 tsp turmeric powder",
          "2 tsp coriander powder",
          "1 tsp garam masala",
          "Fresh coriander leaves",
          "3 tbsp oil"
        ],
        instructions: [
          "Boil eggs and set aside.",
          "Prepare a spicy gravy with onions, tomatoes, ginger-garlic paste, and spices.",
          "Add eggs, simmer in gravy, and serve hot with rice or roti."
        ]
      },
      {
        id: 8,
        name: "Masala Omelette",
        description: "Spicy Indian style omelette",
        cookTime: "10 min",
        servings: 2,
        difficulty: "Easy",
        ingredients: [
          "4 eggs",
          "1 onion, finely chopped",
          "2 green chilies, chopped",
          "2 tbsp fresh coriander, chopped",
          "1/2 tsp turmeric powder",
          "1/2 tsp red chili powder",
          "2 tbsp oil",
          "Salt to taste"
        ],
        instructions: [
          "Beat eggs with chopped onions, chilies, and coriander.",
          "Pour into hot greased tawa and cook both sides until golden.",
          "Serve hot with toast or paratha."
        ]
      },
      {
        id: 9,
        name: "Egg Bhurji",
        description: "Scrambled eggs Indian style",
        cookTime: "12 min",
        servings: 2,
        difficulty: "Easy",
        ingredients: [
          "4 eggs",
          "1 onion, chopped",
          "2 tomatoes, chopped",
          "2 green chilies, chopped",
          "1/2 tsp turmeric powder",
          "1/2 tsp garam masala",
          "Fresh coriander leaves",
          "2 tbsp oil"
        ],
        instructions: [
          "Heat oil and sauté onions, tomatoes, and green chilies.",
          "Add beaten eggs and stir continuously until scrambled.",
          "Season with salt, coriander, and garam masala."
        ]
      }
    ]
  },
  "meat": {
    dishes: [
      {
        id: 10,
        name: "Spicy Meat Curry",
        description: "Traditional spicy mutton curry",
        cookTime: "60 min",
        servings: 6,
        difficulty: "Hard",
        ingredients: [
          "1 kg mutton, cut into pieces",
          "2 cups yogurt",
          "2 onions, sliced",
          "1 tbsp ginger-garlic paste",
          "2 tsp red chili powder",
          "1 tsp turmeric powder",
          "2 tsp coriander powder",
          "1 tsp garam masala",
          "Fresh coriander leaves",
          "4 tbsp oil"
        ],
        instructions: [
          "Marinate meat with yogurt, turmeric, and chili powder.",
          "Heat oil, add whole spices, onions, and cook until golden.",
          "Add marinated meat and cook with tomatoes and water until tender.",
          "Garnish with coriander leaves."
        ]
      },
      {
        id: 11,
        name: "Keema Matar",
        description: "Minced meat with green peas",
        cookTime: "35 min",
        servings: 4,
        difficulty: "Medium",
        ingredients: [
          "500g minced meat (keema)",
          "1 cup green peas",
          "2 onions, chopped",
          "4 cloves garlic, minced",
          "1 inch ginger, minced",
          "2 tsp garam masala",
          "1 tsp turmeric powder",
          "2 tsp coriander powder",
          "Fresh coriander leaves"
        ],
        instructions: [
          "Heat oil and sauté chopped onions and garlic.",
          "Add minced meat, peas, and spices.",
          "Cook until keema is dry and fully cooked."
        ]
      }
    ]
  },
  "onion": {
    dishes: [
      {
        id: 12,
        name: "Onion Pakora",
        description: "Crispy deep-fried onion fritters",
        cookTime: "20 min",
        servings: 4,
        difficulty: "Easy",
        ingredients: [
          "3 large onions, thinly sliced",
          "1 cup gram flour (besan)",
          "1 tsp red chili powder",
          "1/2 tsp turmeric powder",
          "1 tsp carom seeds",
          "Oil for deep frying",
          "Salt to taste"
        ],
        instructions: [
          "Slice onions and mix with gram flour, chili powder, and salt.",
          "Add water gradually to form a thick batter.",
          "Heat oil and deep-fry until golden brown.",
          "Serve hot with mint chutney or tomato ketchup."
        ]
      }
    ]
  },
  "carrot": {
    dishes: [
      {
        id: 13,
        name: "Gajar Ka Halwa",
        description: "Traditional carrot dessert",
        cookTime: "45 min",
        servings: 6,
        difficulty: "Medium",
        ingredients: [
          "1 kg carrots, grated",
          "1 liter full fat milk",
          "1/2 cup sugar",
          "4 tbsp ghee",
          "1/2 tsp cardamom powder",
          "Chopped almonds and pistachios",
          "A pinch of saffron"
        ],
        instructions: [
          "Grate carrots and cook in ghee.",
          "Add milk, cook till thick.",
          "Add sugar, cardamom, nuts."
        ]
      }
    ]
  },
  "chicken": {
    dishes: [
      {
        id: 14,
        name: "Butter Chicken",
        description: "Creamy tomato-based chicken curry",
        cookTime: "40 min",
        servings: 4,
        difficulty: "Medium",
        ingredients: [
          "500g chicken, cut into pieces",
          "1/2 cup yogurt",
          "1 cup tomato puree",
          "1/2 cup heavy cream",
          "2 tbsp butter",
          "1 tbsp ginger-garlic paste",
          "1 tsp garam masala",
          "1/2 tsp turmeric powder",
          "Fresh coriander leaves"
        ],
        instructions: [
          "Marinate chicken with spices and yogurt.",
          "Cook in tomato-butter sauce.",
          "Add cream and serve."
        ]
      }
    ]
  }
};

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [cookingMode, setCookingMode] = useState<{recipeId: number, currentStep: number} | null>(null);
  const { toast } = useToast();

  const findRecipes = (query: string) => {
    const searchTerm = query.toLowerCase();
    let foundRecipes: any[] = [];
    
    // Search through all recipe categories
    Object.entries(RECIPE_DATABASE).forEach(([ingredient, categoryData]) => {
      if (searchTerm.includes(ingredient) || ingredient.includes(searchTerm)) {
        foundRecipes = [...foundRecipes, ...categoryData.dishes];
      } else {
        // Search within recipe names and descriptions
        const matchingRecipes = categoryData.dishes.filter(recipe => 
          recipe.name.toLowerCase().includes(searchTerm) ||
          recipe.description.toLowerCase().includes(searchTerm)
        );
        foundRecipes = [...foundRecipes, ...matchingRecipes];
      }
    });

    return foundRecipes;
  };

  const handleSearch = async () => {
    if (ingredients.length === 0) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let foundRecipes: any[] = [];
      
      ingredients.forEach(ingredient => {
        const searchRecipes = findRecipes(ingredient);
        foundRecipes = [...foundRecipes, ...searchRecipes];
      });
      
      // Remove duplicates
      const uniqueRecipes = foundRecipes.filter((recipe, index, self) => 
        index === self.findIndex(r => r.id === recipe.id)
      );
      
      if (uniqueRecipes.length === 0) {
        const genericRecipe = {
          id: 999,
          name: `Delicious ${ingredients.join(' & ')} Recipe`,
          description: `A wonderful homemade dish using your ${ingredients.join(', ')}`,
          cookTime: "30 min",
          servings: 4,
          difficulty: "Easy",
          ingredients: [
            ...ingredients.map(ing => `Fresh ${ing}`),
            "Salt and spices to taste",
            "Oil for cooking",
            "Love and patience 💛"
          ],
          instructions: [
            "Prepare and clean all your ingredients with care",
            "Heat oil in a pan over medium heat",
            "Add your main ingredients and cook until tender",
            "Season with salt, pepper, and your favorite spices",
            "Cook with love and serve hot to your loved ones!"
          ]
        };
        setRecipes([genericRecipe]);
      } else {
        setRecipes(uniqueRecipes);
      }
      
      setIsLoading(false);
      toast({
        title: "Perfect! Here are your recipes! 🍳",
        description: `I found ${uniqueRecipes.length || 1} amazing recipe${uniqueRecipes.length !== 1 ? 's' : ''} for you to try!`,
      });
    }, 1500);
  };

  const handleStartCooking = (recipe: any) => {
    setCookingMode({ recipeId: recipe.id, currentStep: 0 });
    toast({
      title: "Let's Start Cooking!",
      description: `Starting to cook ${recipe.name}. Follow the step-by-step instructions.`,
    });
  };

  const handleNextStep = () => {
    if (cookingMode) {
      const currentRecipe = recipes.find(r => r.id === cookingMode.recipeId);
      if (currentRecipe && cookingMode.currentStep < currentRecipe.instructions.length - 1) {
        setCookingMode({
          ...cookingMode,
          currentStep: cookingMode.currentStep + 1
        });
      } else {
        toast({
          title: "Cooking Complete!",
          description: "Congratulations! You've finished cooking. Enjoy your meal!",
        });
        setCookingMode(null);
      }
    }
  };

  const handleStopCooking = () => {
    setCookingMode(null);
    toast({
      title: "Cooking Stopped",
      description: "You can restart cooking anytime by clicking the Start Cooking button.",
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
              <h1 className="text-2xl font-bold text-gray-800">Your Kitchen Companion</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Cooking Mode Overlay */}
        {cookingMode && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl bg-white">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  {recipes.find(r => r.id === cookingMode.recipeId)?.name}
                </CardTitle>
                <div className="text-center text-sm text-gray-600">
                  Step {cookingMode.currentStep + 1} of {recipes.find(r => r.id === cookingMode.recipeId)?.instructions.length}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="bg-recipe-orange text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {cookingMode.currentStep + 1}
                  </div>
                  <p className="text-lg text-gray-800">
                    {recipes.find(r => r.id === cookingMode.recipeId)?.instructions[cookingMode.currentStep]}
                  </p>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button 
                    onClick={handleNextStep}
                    className="bg-recipe-green hover:bg-recipe-green/90 text-white"
                  >
                    {cookingMode.currentStep < (recipes.find(r => r.id === cookingMode.recipeId)?.instructions.length || 0) - 1 
                      ? "Next Step" 
                      : "Finish Cooking"
                    }
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleStopCooking}
                    className="border-gray-400 text-gray-600 hover:bg-gray-100"
                  >
                    Stop Cooking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-2xl mx-auto mb-12 text-center animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            What's in your kitchen today? 🥘
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Tell me what ingredients you have, and I'll help you create something delicious! 
            Don't worry if it's just a few items - we'll make magic happen together! ✨
          </p>
          
          <IngredientInput
            ingredients={ingredients}
            onIngredientsChange={setIngredients}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </div>

        {/* Quick Suggestions */}
        {recipes.length === 0 && ingredients.length === 0 && (
          <div className="max-w-4xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Need inspiration? Try these popular ingredients! 🌟
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                "beans", "cabbage", "egg", "meat", "chicken", 
                "onion", "carrot", "potato", "tomato", "rice"
              ].map((suggestion, index) => (
                <Badge
                  key={suggestion}
                  variant="outline"
                  className="cursor-pointer hover:bg-recipe-orange hover:text-white hover:border-recipe-orange px-4 py-2 text-sm font-medium border-recipe-orange/50 text-recipe-orange transition-all hover-lift"
                  onClick={() => setIngredients([...ingredients, suggestion])}
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
              Perfect! Here's what we can make together! 👨‍🍳
            </h3>
            
            <div className="grid lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
              {recipes.map((recipe, index) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onStartCooking={handleStartCooking}
                />
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button 
                variant="outline" 
                onClick={() => {
                  setRecipes([]);
                  setIngredients([]);
                }}
                className="border-recipe-orange text-recipe-orange hover:bg-recipe-orange hover:text-white"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Let's Cook Something Else!
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeGenerator;
