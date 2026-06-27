import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Question from './components/Question';
import PickCard from './components/PickCard';
import LoadingRitual from './components/LoadingRitual';
import Result from './components/Result';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/question" element={<Question />} />
        <Route path="/pick" element={<PickCard />} />
        <Route path="/loading" element={<LoadingRitual />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
