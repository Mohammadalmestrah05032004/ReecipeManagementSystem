# Recipe Management System

A modern, feature-rich recipe management application with AI capabilities built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Features
- **Complete Recipe Management**: Add, edit, delete recipes with detailed information
- **Smart Status System**: Mark recipes as "favorite," "to try," or "made before"
- **Advanced Search**: Filter by name, ingredients, cuisine, prep time, difficulty, and status
- **AI-Powered Suggestions**: Get recipe recommendations based on available ingredients

### AI Features
- **Recipe Suggestions**: AI recommends recipes based on ingredients you have
- **Smart Shopping Lists**: Auto-generate shopping lists from your favorite recipes
- **Ingredient Substitutions**: Get healthy alternatives for common ingredients
- **Meal Planning**: AI-powered weekly meal planning
- **Auto-Detection**: Automatic cuisine type and difficulty detection
- **Smart Scaling**: Recipe serving size adjustments

### Advanced Features
- **Recipe Rating System**: 5-star rating for your recipes
- **Rich Metadata**: Prep time, cook time, servings, difficulty, cuisine, tags
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Local Storage**: Data persistence without external dependencies
- **Beautiful UI**: Modern design with smooth animations and micro-interactions

## 🛠️ Installation

1. Clone or download the project
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the provided local URL (typically `http://localhost:5173`)

## 📱 Usage

### Adding Recipes
1. Click the "Add Recipe" button
2. Fill in recipe details (name, description, ingredients, instructions)
3. Set prep time, cook time, and servings
4. Add tags for better organization
5. The AI will automatically detect cuisine type and difficulty

### Managing Recipes
- **Edit**: Click the edit icon on any recipe card
- **Delete**: Click the trash icon (with confirmation)
- **Rate**: Click on stars to rate recipes 1-5
- **Status**: Use heart (favorite), bookmark (to try), or checkmark (made before) buttons

### Smart Search
- Use the search bar for quick text search
- Click "Filters" for advanced filtering options
- Filter by cuisine, difficulty, status, ingredients, and prep time
- Clear all filters with the "Clear" button

### AI Assistant
- **Recipe Suggestions**: Enter ingredients you have and get recipe recommendations
- **Shopping List**: Generate a consolidated shopping list from favorite recipes
- **Substitutions**: View healthy alternatives for common ingredients
- **Meal Planning**: Get AI-generated weekly meal plans

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # React components
│   ├── RecipeCard.tsx   # Individual recipe display
│   ├── RecipeForm.tsx   # Add/edit recipe form
│   ├── SearchFilters.tsx # Search and filter interface
│   ├── AIPanel.tsx      # AI features panel
│   └── Modal.tsx        # Reusable modal component
├── hooks/
│   └── useRecipes.ts    # Recipe management logic
├── types/
│   └── index.ts         # TypeScript type definitions
├── utils/
│   ├── storage.ts       # Local storage helpers
│   └── aiHelpers.ts     # AI logic and algorithms
└── App.tsx              # Main application component
```

### Key Technologies
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for responsive styling
- **Lucide React** for beautiful icons
- **Local Storage** for data persistence
- **Vite** for fast development and building

### AI Implementation
The AI features use rule-based algorithms and pattern matching:
- **Cuisine Detection**: Keyword analysis of ingredients and recipe names
- **Difficulty Estimation**: Analysis of ingredient complexity and instruction count
- **Recipe Suggestions**: Ingredient matching algorithms
- **Substitutions**: Predefined healthy alternatives database

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6) - Main actions and highlights
- **Secondary**: Purple (#8B5CF6) - Secondary actions and accents
- **Success**: Green (#10B981) - Positive actions and "made before" status
- **Warning**: Amber (#F59E0B) - Warnings and medium difficulty
- **Error**: Red (#EF4444) - Destructive actions and high difficulty

### Typography
- **Headings**: Bold weights for clear hierarchy
- **Body**: Regular weight with 150% line spacing for readability
- **UI Elements**: Medium weight for labels and buttons

### Interactions
- **Hover States**: Subtle color and shadow changes
- **Animations**: Smooth transitions for all interactive elements
- **Micro-interactions**: Scale effects on button hover
- **Loading States**: Smooth transitions between states

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify (Bonus Feature)
The application is ready for deployment to any static hosting service. For Netlify:

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

## 🔮 Future Enhancements

### Planned Features
- **Multi-user Support**: User accounts and recipe sharing
- **Recipe Import**: Import recipes from URLs
- **Photo Upload**: Add images to recipes
- **Nutrition Facts**: Calorie and nutrition estimation
- **Recipe Collections**: Organize recipes into custom collections
- **Print Recipes**: Printer-friendly recipe cards
- **Export/Import**: Backup and restore recipe data

### Technical Improvements
- **Backend Integration**: Database storage and user authentication
- **PWA Features**: Offline support and mobile app experience
- **Advanced AI**: Machine learning for better recommendations
- **API Integration**: Recipe databases and nutrition APIs

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

---

**Built with ❤️ using React, TypeScript, and AI**