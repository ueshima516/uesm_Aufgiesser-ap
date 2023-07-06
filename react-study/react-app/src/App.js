import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import LoginForm from './components/LoginForm';
import MyCalendar from './components/MyCalender';

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/calendar" element={<MyCalendar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
