import { Recipe } from '../types';

/**
 * Estimate recipe difficulty based on complexity of ingredients and instructions.
 */
export const estimateDifficulty = (
  ingredients: string[],
  instructions: string[]
): 'Easy' | 'Medium' | 'Hard' => {
  const complexIngredients = ingredients.filter(ing =>
    ing.toLowerCase().includes('wine') ||
    ing.toLowerCase().includes('sauce') ||
    ing.toLowerCase().includes('marinade') ||
    ing.toLowerCase().includes('roux')
  ).length;

  const complexInstructions = instructions.filter(inst =>
    inst.toLowerCase().includes('fold') ||
    inst.toLowerCase().includes('whisk') ||
    inst.toLowerCase().includes('temper') ||
    inst.toLowerCase().includes('reduce')
  ).length;

  const totalComplexity = complexIngredients + complexInstructions + (instructions.length > 8 ? 2 : 0);

  if (totalComplexity >= 4) return 'Hard';
  if (totalComplexity >= 2) return 'Medium';
  return 'Easy';
};

/**
 * Detect cuisine type based on ingredients and recipe name.
 */
export const detectCuisine = (ingredients: string[], name: string): string => {
  const cuisineKeywords = {
    'Italian': ['pasta', 'parmesan', 'basil', 'tomato', 'mozzarella', 'oregano', 'pizza', 'risotto'],
    'Mexican': ['cumin', 'cilantro', 'lime', 'jalapeño', 'avocado', 'chili', 'salsa', 'tortilla'],
    'Asian': ['soy sauce', 'ginger', 'garlic', 'sesame', 'rice', 'sriracha', 'miso', 'wasabi'],
    'Indian': ['curry', 'turmeric', 'garam masala', 'cardamom', 'cumin', 'coriander', 'naan'],
    'French': ['butter', 'cream', 'wine', 'herbs', 'brie', 'croissant', 'baguette'],
    'Mediterranean': ['olive oil', 'feta', 'olives', 'lemon', 'herbs', 'hummus', 'pita'],
  };

  const allText = [...ingredients, name].join(' ').toLowerCase();

  let maxScore = 0;
  let detectedCuisine = 'International';

  Object.entries(cuisineKeywords).forEach(([cuisine, keywords]) => {
    const score = keywords.reduce((acc, keyword) => {
      return acc + (allText.includes(keyword.toLowerCase()) ? 1 : 0);
    }, 0);

    if (score > maxScore) {
      maxScore = score;
      detectedCuisine = cuisine;
    }
  });

  return detectedCuisine;
};

/**
 * Suggest ingredient substitutions for healthier alternatives.
 */
export const suggestSubstitutions = (ingredient: string): string[] => {
  const substitutions: Record<string, string[]> = {
    'butter': ['coconut oil', 'olive oil', 'avocado oil', 'applesauce'],
    'sugar': ['honey', 'maple syrup', 'stevia', 'agave nectar'],
    'flour': ['almond flour', 'coconut flour', 'oat flour', 'rice flour'],
    'milk': ['almond milk', 'oat milk', 'coconut milk', 'soy milk'],
    'eggs': ['flax eggs', 'chia eggs', 'applesauce', 'banana'],
    'cream': ['coconut cream', 'cashew cream', 'greek yogurt'],
  };

  const lowerIngredient = ingredient.toLowerCase();
  for (const [key, subs] of Object.entries(substitutions)) {
    if (lowerIngredient.includes(key)) {
      return subs;
    }
  }
  return [];
};

/**
 * Generate a smart shopping list from multiple recipes.
 */
export const generateShoppingList = (recipes: Recipe[]): string[] => {
  const allIngredients = recipes.flatMap(recipe => recipe.ingredients);
  const consolidated = allIngredients.reduce((acc, ingredient) => {
    const normalized = ingredient.toLowerCase().trim();
    if (!acc.some(item => item.toLowerCase().includes(normalized) || normalized.includes(item.toLowerCase()))) {
      acc.push(ingredient);
    }
    return acc;
  }, [] as string[]);

  return consolidated.sort();
};

/**
 * Suggest recipes based on available ingredients.
 */
export const suggestRecipesByIngredients = (
  availableIngredients: string[],
  allRecipes: Recipe[]
): Recipe[] => {
  return allRecipes
    .map(recipe => ({
      recipe,
      matchScore: recipe.ingredients.filter(ingredient =>
        availableIngredients.some(available =>
          ingredient.toLowerCase().includes(available.toLowerCase()) ||
          available.toLowerCase().includes(ingredient.toLowerCase())
        )
      ).length
    }))
    .filter(({ matchScore }) => matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5)
    .map(({ recipe }) => recipe);
};

/**
 * Call your FastAPI backend to get an AI-powered recipe suggestion.
 */
export const getAISuggestions = async (ingredients: string): Promise<string> => {
  const response = await fetch('http://localhost:8000/suggest_recipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ingredients })
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.recipe;
};
