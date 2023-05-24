import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage, Feed, RegisterPage, UserProfilePage } from './pages';
import { PrivateRoute } from './components';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/:username" element={<UserProfilePage />} />
          <Route path="/" element={<Feed />} />
        </Route>
    
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
