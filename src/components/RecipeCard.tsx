import React from 'react';
import { Recipe } from '../types';
import { Clock, Users, Star, Heart, Bookmark, CheckCircle, Edit, Trash2 } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Recipe['status']) => void;
  onRatingChange: (id: string, rating: number) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onEdit,
  onDelete,
  onStatusChange,
  onRatingChange
}) => {
  const statusConfig = {
    'favorite': { icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
    'to-try': { icon: Bookmark, color: 'text-blue-500', bg: 'bg-blue-50' },
    'made-before': { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
    'none': { icon: null, color: '', bg: '' }
  };

  const difficultyColors = {
    'Easy': 'text-green-600 bg-green-100',
    'Medium': 'text-yellow-600 bg-yellow-100',
    'Hard': 'text-red-600 bg-red-100'
  };

  const StatusIcon = statusConfig[recipe.status].icon;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-6xl font-bold opacity-20">
          {recipe.name.charAt(0).toUpperCase()}
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => onEdit(recipe)}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(recipe.id)}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
        {StatusIcon && (
          <div className={`absolute top-4 left-4 p-2 ${statusConfig[recipe.status].bg} rounded-lg`}>
            <StatusIcon size={16} className={statusConfig[recipe.status].color} />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl text-gray-800 line-clamp-1">{recipe.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[recipe.difficulty]}`}>
            {recipe.difficulty}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{recipe.prepTime + recipe.cookTime}m</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{recipe.servings}</span>
          </div>
          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{recipe.cuisine}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => onRatingChange(recipe.id, star)}
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                <Star
                  size={16}
                  className={star <= (recipe.rating || 0) ? 'fill-yellow-400 text-yellow-400' : ''}
                />
              </button>
            ))}
          </div>
          
          <div className="flex gap-1">
            <button
              onClick={() => onStatusChange(recipe.id, 'favorite')}
              className={`p-2 rounded-lg transition-colors ${
                recipe.status === 'favorite' ? 'bg-red-100 text-red-500' : 'hover:bg-gray-100'
              }`}
            >
              <Heart size={16} />
            </button>
            <button
              onClick={() => onStatusChange(recipe.id, 'to-try')}
              className={`p-2 rounded-lg transition-colors ${
                recipe.status === 'to-try' ? 'bg-blue-100 text-blue-500' : 'hover:bg-gray-100'
              }`}
            >
              <Bookmark size={16} />
            </button>
            <button
              onClick={() => onStatusChange(recipe.id, 'made-before')}
              className={`p-2 rounded-lg transition-colors ${
                recipe.status === 'made-before' ? 'bg-green-100 text-green-500' : 'hover:bg-gray-100'
              }`}
            >
              <CheckCircle size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};