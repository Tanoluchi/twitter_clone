import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage, Feed, RegisterPage, UserProfilePage, SoloTweet, Notification} from './pages';
import { PrivateRoute } from './components';
import { Layout } from './components/Layout';

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Layout />} >
          <Route element={<PrivateRoute />}>
            <Route path="/notification" element={<Notification/>} />
            <Route path="/tweet/:id" element={<SoloTweet/>} />
            <Route path="/:username" element={<UserProfilePage />} />
            <Route path="/" element={<Feed />} />
          </Route>
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
