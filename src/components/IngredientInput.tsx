
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

interface IngredientInputProps {
  ingredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const IngredientInput = ({ 
  ingredients, 
  onIngredientsChange, 
  onSearch, 
  isLoading 
}: IngredientInputProps) => {
  const [currentInput, setCurrentInput] = useState("");

  const addIngredient = () => {
    if (currentInput.trim() && !ingredients.includes(currentInput.trim().toLowerCase())) {
      onIngredientsChange([...ingredients, currentInput.trim().toLowerCase()]);
      setCurrentInput("");
    }
  };

  const removeIngredient = (ingredientToRemove: string) => {
    onIngredientsChange(ingredients.filter(ing => ing !== ingredientToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Type an ingredient (e.g., beans, chicken, eggs...)"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 border-recipe-orange/30 focus:border-recipe-orange focus:ring-recipe-orange/20"
        />
        <Button
          onClick={addIngredient}
          variant="outline"
          className="border-recipe-orange text-recipe-orange hover:bg-recipe-orange hover:text-white"
          disabled={!currentInput.trim()}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {ingredients.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 font-medium">Your ingredients:</p>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient) => (
              <Badge
                key={ingredient}
                variant="secondary"
                className="bg-recipe-orange/10 text-recipe-orange border border-recipe-orange/20 px-3 py-1"
              >
                {ingredient}
                <X
                  className="w-3 h-3 ml-2 cursor-pointer hover:text-recipe-orange-dark"
                  onClick={() => removeIngredient(ingredient)}
                />
              </Badge>
            ))}
          </div>
          <Button
            onClick={onSearch}
            className="w-full bg-recipe-orange hover:bg-recipe-orange-dark text-white py-3 rounded-lg"
            disabled={isLoading || ingredients.length === 0}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Finding delicious recipes for you...
              </div>
            ) : (
              `Find Recipes with ${ingredients.length} ingredient${ingredients.length > 1 ? 's' : ''}`
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default IngredientInput;
