import { Trophy } from 'lucide-react';

export const Header = () => {
  return (
    <header className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 overflow-hidden">
      <div className="absolute inset-0 bg-custom-bg bg-cover bg-center opacity-30"></div>

      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Trophy className="w-10 h-10 text-yellow-400 animate-pulse" />
          <h1 className="text-4xl font-bold tracking-tight">IPL Win Predictor</h1>
        </div>

        <p className="text-center text-lg max-w-2xl mx-auto text-gray-100">
          Second innings IPL prediction powered by machine learning
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-gray-100"></div>
    </header>
  );
};
