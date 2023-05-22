import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { Feed } from './pages/Feed';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
