import { useState, useEffect } from 'react';
import { Recipe, SearchFilters } from '../types';
import { saveToStorage, loadFromStorage, generateId } from '../utils/storage';
import { estimateDifficulty, detectCuisine } from '../utils/aiHelpers';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    query: '',
    cuisine: '',
    maxPrepTime: 180,
    difficulty: '',
    status: '',
    ingredient: ''
  });

  useEffect(() => {
    const savedRecipes = loadFromStorage();
    if (savedRecipes?.recipes) {
      setRecipes(savedRecipes.recipes.map((recipe: any) => ({
        ...recipe,
        createdAt: new Date(recipe.createdAt),
        updatedAt: new Date(recipe.updatedAt)
      })));
    } else {
      // Initialize with sample recipes
      const sampleRecipes: Recipe[] = [
        {
          id: generateId(),
          name: 'Spaghetti Carbonara',
          description: 'Classic Italian pasta dish with eggs, cheese, and pancetta',
          ingredients: ['400g spaghetti', '200g pancetta', '4 eggs', '100g parmesan cheese', 'black pepper', 'salt'],
          instructions: [
            'Cook spaghetti according to package instructions',
            'Fry pancetta until crispy',
            'Beat eggs with parmesan and pepper',
            'Combine hot pasta with pancetta',
            'Add egg mixture and toss quickly'
          ],
          prepTime: 15,
          cookTime: 20,
          servings: 4,
          difficulty: 'Medium',
          cuisine: 'Italian',
          status: 'favorite',
          tags: ['pasta', 'quick', 'dinner'],
          createdAt: new Date(),
          updatedAt: new Date(),
          rating: 5
        },
        {
          id: generateId(),
          name: 'Chicken Tikka Masala',
          description: 'Creamy Indian curry with tender chicken pieces',
          ingredients: ['500g chicken breast', 'yogurt', 'garam masala', 'tomato sauce', 'cream', 'onion', 'ginger', 'garlic'],
          instructions: [
            'Marinate chicken in yogurt and spices',
            'Grill chicken pieces',
            'Make curry sauce with tomatoes and cream',
            'Combine chicken with sauce',
            'Simmer until heated through'
          ],
          prepTime: 30,
          cookTime: 40,
          servings: 4,
          difficulty: 'Medium',
          cuisine: 'Indian',
          status: 'made-before',
          tags: ['curry', 'spicy', 'dinner'],
          createdAt: new Date(),
          updatedAt: new Date(),
          rating: 4
        }
      ];
      setRecipes(sampleRecipes);
      saveToStorage({ recipes: sampleRecipes });
    }
  }, []);

  useEffect(() => {
    saveToStorage({ recipes });
  }, [recipes]);

  const addRecipe = (recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt' | 'difficulty' | 'cuisine'>) => {
    const newRecipe: Recipe = {
      ...recipeData,
      id: generateId(),
      difficulty: estimateDifficulty(recipeData.ingredients, recipeData.instructions),
      cuisine: detectCuisine(recipeData.ingredients, recipeData.name),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setRecipes(prev => [...prev, newRecipe]);
    return newRecipe;
  };

  const updateRecipe = (id: string, updates: Partial<Recipe>) => {
    setRecipes(prev => prev.map(recipe => 
      recipe.id === id 
        ? { 
            ...recipe, 
            ...updates, 
            updatedAt: new Date(),
            difficulty: updates.ingredients || updates.instructions 
              ? estimateDifficulty(updates.ingredients || recipe.ingredients, updates.instructions || recipe.instructions)
              : recipe.difficulty,
            cuisine: updates.ingredients || updates.name
              ? detectCuisine(updates.ingredients || recipe.ingredients, updates.name || recipe.name)
              : recipe.cuisine
          }
        : recipe
    ));
  };

  const deleteRecipe = (id: string) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== id));
  };

  const getFilteredRecipes = () => {
    return recipes.filter(recipe => {
      const matchesQuery = !searchFilters.query || 
        recipe.name.toLowerCase().includes(searchFilters.query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchFilters.query.toLowerCase());
      
      const matchesCuisine = !searchFilters.cuisine || recipe.cuisine === searchFilters.cuisine;
      const matchesPrepTime = recipe.prepTime <= searchFilters.maxPrepTime;
      const matchesDifficulty = !searchFilters.difficulty || recipe.difficulty === searchFilters.difficulty;
      const matchesStatus = !searchFilters.status || recipe.status === searchFilters.status;
      const matchesIngredient = !searchFilters.ingredient || 
        recipe.ingredients.some(ing => ing.toLowerCase().includes(searchFilters.ingredient.toLowerCase()));

      return matchesQuery && matchesCuisine && matchesPrepTime && matchesDifficulty && matchesStatus && matchesIngredient;
    });
  };

  return {
    recipes,
    searchFilters,
    setSearchFilters,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getFilteredRecipes
  };
};