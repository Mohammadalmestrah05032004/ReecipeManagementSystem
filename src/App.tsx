import React, { useState } from 'react';
import { Recipe } from './types';
import { useRecipes } from './hooks/useRecipes';
import { RecipeCard } from './components/RecipeCard';
import { RecipeForm } from './components/RecipeForm';
import { SearchFiltersComponent } from './components/SearchFilters';
import { AIPanel } from './components/AIPanel';
import { Modal } from './components/Modal';
import { Plus, ChefHat, Sparkles } from 'lucide-react';

function App() {
  const {
    recipes,
    searchFilters,
    setSearchFilters,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getFilteredRecipes
  } = useRecipes();

  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [modalContent, setModalContent] = useState<{ content: React.ReactNode; title: string } | null>(null);

  const filteredRecipes = getFilteredRecipes();
  const cuisines = Array.from(new Set(recipes.map(r => r.cuisine))).sort();

  const handleSaveRecipe = (recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt' | 'difficulty' | 'cuisine'>) => {
    if (editingRecipe) {
      updateRecipe(editingRecipe.id, recipeData);
    } else {
      addRecipe(recipeData);
    }
    setShowForm(false);
    setEditingRecipe(null);
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setShowForm(true);
  };

  const handleDeleteRecipe = (id: string) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(id);
    }
  };

  const handleStatusChange = (id: string, status: Recipe['status']) => {
    updateRecipe(id, { status });
  };

  const handleRatingChange = (id: string, rating: number) => {
    updateRecipe(id, { rating });
  };

  const showModal = (content: React.ReactNode, title: string) => {
    setModalContent({ content, title });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl">
              <ChefHat size={32} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Recipe Management System
            </h1>
            <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl">
              <Sparkles size={32} />
            </div>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover, organize, and create amazing recipes with AI-powered features
          </p>
        </div>

        {/* Search and Filters */}
        <SearchFiltersComponent
          filters={searchFilters}
          onFiltersChange={setSearchFilters}
          cuisines={cuisines}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Recipes ({filteredRecipes.length})
              </h2>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus size={20} />
                Add Recipe
              </button>
            </div>

            {filteredRecipes.length === 0 ? (
              <div className="text-center py-12">
                <ChefHat size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No recipes found</h3>
                <p className="text-gray-500">
                  {recipes.length === 0 
                    ? "Start by adding your first recipe!"
                    : "Try adjusting your search filters or add a new recipe."
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRecipes.map(recipe => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onEdit={handleEditRecipe}
                    onDelete={handleDeleteRecipe}
                    onStatusChange={handleStatusChange}
                    onRatingChange={handleRatingChange}
                  />
                ))}
              </div>
            )}
          </div>

          {/* AI Panel */}
          <div className="lg:col-span-1">
            <AIPanel
              recipes={recipes}
              onShowModal={showModal}
            />
          </div>
        </div>

        {/* Recipe Form Modal */}
        {showForm && (
          <RecipeForm
            recipe={editingRecipe || undefined}
            onSave={handleSaveRecipe}
            onCancel={() => {
              setShowForm(false);
              setEditingRecipe(null);
            }}
          />
        )}

        {/* AI Modal */}
        <Modal
          isOpen={!!modalContent}
          onClose={() => setModalContent(null)}
          title={modalContent?.title || ''}
        >
          {modalContent?.content}
        </Modal>
      </div>

      {/* Footer with Thank You Message */}
      <footer className="mt-16 py-8 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            With sincere gratitude and appreciation
          </p>
          <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Thank you to Aspire Software Company
          </p>
          <p className="text-gray-600 mt-2">
            — Mohammad Almestrah
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;