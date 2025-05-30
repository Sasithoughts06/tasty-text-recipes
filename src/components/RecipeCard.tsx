
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Heart } from "lucide-react";

interface Recipe {
  id: number;
  name: string;
  description: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
  onStartCooking: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, onStartCooking }: RecipeCardProps) => {
  return (
    <Card className="food-card hover-lift animate-fade-in border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-br from-recipe-orange/5 to-recipe-green/5">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl text-gray-800 mb-2">{recipe.name}</CardTitle>
            <CardDescription className="text-gray-600 text-base">
              {recipe.description}
            </CardDescription>
          </div>
          <Badge className="bg-recipe-green text-white shrink-0">
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
            Serves {recipe.servings}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <Heart className="w-4 h-4 mr-2 text-recipe-orange" />
            What you'll need:
          </h4>
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
          <h4 className="font-semibold text-gray-800 mb-3">Let's cook together:</h4>
          <ol className="space-y-3">
            {recipe.instructions.slice(0, 3).map((step: string, idx: number) => (
              <li key={idx} className="text-gray-600 text-sm flex items-start">
                <span className="bg-recipe-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                {step}
              </li>
            ))}
            {recipe.instructions.length > 3 && (
              <li className="text-gray-500 text-sm italic ml-9">
                ...and {recipe.instructions.length - 3} more step{recipe.instructions.length - 3 > 1 ? 's' : ''} to deliciousness!
              </li>
            )}
          </ol>
        </div>
        
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <Button 
            className="flex-1 bg-recipe-orange hover:bg-recipe-orange-dark text-white"
            onClick={() => onStartCooking(recipe)}
          >
            👨‍🍳 Let's Cook This!
          </Button>
          <Button variant="outline" className="border-recipe-green text-recipe-green hover:bg-recipe-green hover:text-white">
            💖 Save Recipe
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
