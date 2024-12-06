import { Header } from './components/Header';
import { PredictionForm } from './components/PredictionForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <PredictionForm />
        </div>
      </main>
    </div>
  );
}

export default App;