import React, { useState } from 'react';
import { Recipe } from '../types';
import {
  Brain,
  ChefHat,
  ShoppingCart,
  Lightbulb,
  Clock,
  Scale,
  Globe
} from 'lucide-react';
import {
  suggestRecipesByIngredients,
  generateShoppingList,
  suggestSubstitutions,
  estimateDifficulty,
  detectCuisine
} from '../utils/aiHelpers';

interface AIPanelProps {
  recipes: Recipe[];
  onShowModal: (content: React.ReactNode, title: string) => void;
}

export const AIPanel: React.FC<AIPanelProps> = ({ recipes, onShowModal }) => {
  const [ingredientsInput, setIngredientsInput] = useState('');

  const handleIngredientSuggestions = () => {
    const ingredients = ingredientsInput.split(',').map(ing => ing.trim()).filter(Boolean);
    if (ingredients.length === 0) return;

    const suggestions = suggestRecipesByIngredients(ingredients, recipes);

    const content = (
      <div className="space-y-4">
        <p className="text-gray-600">
          Based on your ingredients: <strong>{ingredients.join(', ')}</strong>
        </p>
        {suggestions.length > 0 ? (
          <div className="space-y-3">
            {suggestions.map(recipe => (
              <div key={recipe.id} className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-lg">{recipe.name}</h4>
                <p className="text-gray-600 text-sm">{recipe.description}</p>
                <div className="mt-2 flex gap-2 text-xs">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    {recipe.cuisine}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                    {recipe.difficulty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">
            No recipes found with those ingredients. Try adding more recipes to your collection!
          </p>
        )}
      </div>
    );

    onShowModal(content, 'Recipe Suggestions');
  };

  const handleShoppingList = () => {
    const favoriteRecipes = recipes.filter(
      r => r.status === 'favorite' || r.status === 'to-try'
    );
    if (favoriteRecipes.length === 0) {
      onShowModal(
        <p className="text-gray-500">
          No favorite or to-try recipes found. Mark some recipes to generate a shopping list!
        </p>,
        'Shopping List'
      );
      return;
    }

    const shoppingList = generateShoppingList(favoriteRecipes);

    const content = (
      <div className="space-y-4">
        <p className="text-gray-600">
          Shopping list for your favorite and to-try recipes:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {shoppingList.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 border border-gray-200 rounded"
            >
              <input type="checkbox" className="rounded" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    );

    onShowModal(content, 'Shopping List');
  };

  const handleSubstitutions = () => {
    const commonIngredients = ['butter', 'sugar', 'flour', 'milk', 'eggs', 'cream'];

    const content = (
      <div className="space-y-4">
        {commonIngredients.map(ingredient => {
          const substitutions = suggestSubstitutions(ingredient);
          if (substitutions.length === 0) return null;

          return (
            <div
              key={ingredient}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <h4 className="font-semibold capitalize mb-2">
                {ingredient} substitutions:
              </h4>
              <div className="flex flex-wrap gap-2">
                {substitutions.map(sub => (
                  <span
                    key={sub}
                    className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );

    onShowModal(content, 'Ingredient Substitutions');
  };

  const handleMealPlanning = () => {
    const easyRecipes = recipes.filter(r => r.difficulty === 'Easy').slice(0, 7);
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];

    const content = (
      <div className="space-y-4">
        <p className="text-gray-600">AI-generated meal plan for the week:</p>
        <div className="space-y-3">
          {days.map((day, index) => {
            const recipe = easyRecipes[index % easyRecipes.length];
            return (
              <div
                key={day}
                className="flex justify-between items-center p-3 border border-gray-200 rounded-lg"
              >
                <span className="font-medium">{day}</span>
                <span className="text-gray-600">
                  {recipe?.name || 'Plan your own meal'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );

    onShowModal(content, 'Weekly Meal Plan');
  };

  const handleDifficultyAnalysis = () => {
    const analyzed = recipes.map(recipe => ({
      name: recipe.name,
      difficulty: estimateDifficulty(recipe.ingredients, recipe.instructions)
    }));

    const content = (
      <div className="space-y-4">
        <p className="text-gray-600">Estimated difficulty for your recipes:</p>
        <div className="space-y-2">
          {analyzed.map((item, index) => (
            <div
              key={index}
              className="flex justify-between p-3 border border-gray-200 rounded"
            >
              <span>{item.name}</span>
              <span className="font-semibold">{item.difficulty}</span>
            </div>
          ))}
        </div>
      </div>
    );

    onShowModal(content, 'Recipe Difficulty Analysis');
  };

  const handleCuisineDetection = () => {
    const analyzed = recipes.map(recipe => ({
      name: recipe.name,
      cuisine: detectCuisine(recipe.ingredients, recipe.name)
    }));

    const content = (
      <div className="space-y-4">
        <p className="text-gray-600">Detected cuisine for your recipes:</p>
        <div className="space-y-2">
          {analyzed.map((item, index) => (
            <div
              key={index}
              className="flex justify-between p-3 border border-gray-200 rounded"
            >
              <span>{item.name}</span>
              <span className="font-semibold">{item.cuisine}</span>
            </div>
          ))}
        </div>
      </div>
    );

    onShowModal(content, 'Cuisine Detection');
  };

  const aiFeatures = [
    {
      icon: ChefHat,
      title: 'Recipe Suggestions',
      description: 'Get recipe ideas based on ingredients you have',
      action: handleIngredientSuggestions,
      color: 'bg-blue-500'
    },
    {
      icon: ShoppingCart,
      title: 'Smart Shopping List',
      description: 'Generate shopping list from favorite recipes',
      action: handleShoppingList,
      color: 'bg-green-500'
    },
    {
      icon: Lightbulb,
      title: 'Ingredient Substitutions',
      description: 'Find healthy alternatives for common ingredients',
      action: handleSubstitutions,
      color: 'bg-yellow-500'
    },
    {
      icon: Clock,
      title: 'Meal Planning',
      description: 'AI-powered weekly meal planning',
      action: handleMealPlanning,
      color: 'bg-purple-500'
    },
    {
      icon: Scale,
      title: 'Analyze Difficulty',
      description: 'Estimate difficulty level for all recipes',
      action: handleDifficultyAnalysis,
      color: 'bg-pink-500'
    },
    {
      icon: Globe,
      title: 'Detect Cuisine',
      description: 'Detect cuisine type for all recipes',
      action: handleCuisineDetection,
      color: 'bg-teal-500'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="text-blue-600" size={24} />
        <h2 className="text-xl font-bold text-gray-800">AI Kitchen Assistant</h2>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What ingredients do you have?
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={ingredientsInput}
            onChange={e => setIngredientsInput(e.target.value)}
            placeholder="e.g., chicken, tomatoes, garlic"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleIngredientSuggestions}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Suggest
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aiFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <button
              key={index}
              onClick={feature.action}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 text-left group"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 ${feature.color} text-white rounded-lg group-hover:scale-110 transition-transform`}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
  
};
