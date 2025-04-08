import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, Navigate, Outlet } from 'react-router-dom';

// Example components for different routes
const Home = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Home Page</h1>
    <p>Welcome to our Pokemon application!</p>
    <div className="mt-4">
      <Link to="/pokemon" className="text-blue-500 hover:underline">View Pokemon List</Link>
    </div>
  </div>
);

const PokemonList = () => {
  // Example Pokemon data
  const pokemons = [
    { id: 1, name: 'Bulbasaur', type: 'Grass' },
    { id: 2, name: 'Charmander', type: 'Fire' },
    { id: 3, name: 'Squirtle', type: 'Water' },
    { id: 4, name: 'Pikachu', type: 'Electric' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pokemon List</h1>
      <ul className="list-disc pl-5">
        {pokemons.map(pokemon => (
          <li key={pokemon.id} className="mb-2">
            <Link to={`/pokemon/${pokemon.id}`} className="text-blue-500 hover:underline">
              {pokemon.name} ({pokemon.type})
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
      </div>
    </div>
  );
};

const PokemonDetail = () => {
  const { id } = useParams();
  

  const pokemons = {
    1: { id: 1, name: 'Bulbasaur', type: 'Grass', description: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokemon.' },
    2: { id: 2, name: 'Charmander', type: 'Fire', description: 'Obviously prefers hot things. Said to cause rain when it sneezes.' },
    3: { id: 3, name: 'Squirtle', type: 'Water', description: 'After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.' },
    4: { id: 4, name: 'Pikachu', type: 'Electric', description: 'When several of these POKéMON gather, their electricity could build and cause lightning storms.' },
  };

  const pokemon = pokemons[id as keyof typeof pokemons];

  if (!pokemon) {
    return <div className="p-4">Pokemon not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{pokemon.name}</h1>
      <div className="mb-2">
        <span className="font-semibold">Type:</span> {pokemon.type}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Description:</span> {pokemon.description}
      </div>
      <div className="mt-4">
        <Link to="/pokemon" className="text-blue-500 hover:underline">Back to Pokemon List</Link>
      </div>
    </div>
  );
};

// Example of a protected route component
const ProtectedRoute = () => {
  const isAuthenticated = true; // This would come from my auth state

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const Login = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <p>This is a login page. In a real app, you would have a form here.</p>
      <div className="mt-4">
        <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
      </div>
    </div>
  );
};

const About = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">About Us</h1>
    <p>This is a demo application to showcase routing in React.</p>
    <div className="mt-4">
      <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
    </div>
  </div>
);

// Main navigation component
const Navigation = () => (
  <nav className="bg-gray-800 text-white p-4">
    <ul className="flex space-x-4">
      <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
      <li><Link to="/pokemon" className="hover:text-gray-300">Pokemon</Link></li>
      <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
      <li><Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link></li>
    </ul>
  </nav>
);

// Dashboard component (protected route)
const Dashboard = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    <p>This is a protected dashboard page. Only authenticated users can see this.</p>
    <div className="mt-4">
      <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
    </div>
  </div>
);

// Main App component with routing setup
const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="container mx-auto mt-4">
          <Routes>
            {/* Basic routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            
            {/* Nested routes */}
            <Route path="/pokemon" element={<PokemonList />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={
              <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <div className="mt-4">
                  <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
