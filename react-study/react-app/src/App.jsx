import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import LoginForm from './components/LoginForm';
import Calendar from './components/Calendar';

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
