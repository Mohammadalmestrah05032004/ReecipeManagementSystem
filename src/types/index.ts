export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  status: 'favorite' | 'to-try' | 'made-before' | 'none';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  rating?: number; // 1-5 stars
  image?: string;
}

export interface SearchFilters {
  query: string;
  cuisine: string;
  maxPrepTime: number;
  difficulty: string;
  status: string;
  ingredient: string;
}

export interface AIFeature {
  id: string;
  title: string;
  description: string;
  action: () => void;
  icon: string;
}