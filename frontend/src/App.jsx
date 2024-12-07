import { Header } from './components/Header';
import { PredictionForm } from './components/PredictionForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 w-full max-w-full md:max-w-screen-xl">
        <div className="w-full max-w-4xl mx-auto">
          <PredictionForm />
        </div>
      </main>
    </div>
  );
}

export default App;