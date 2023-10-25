import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import DashboardPage from "./pages/DashboardPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import PastePage from './pages/PastePage';
import { useSelector } from 'react-redux';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from "./pages/NotFound.tsx";

function App() {
  const isLogged = useSelector((state: any) => state.user.isLogged);
  return (
    <BrowserRouter>
        <Routes>
            {/*REFACTOR PAGE COMPONENT*/}
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/paste/:user/:paste_id" element={<PastePage />} />
            <Route path="/dashboard" element={isLogged === "true" ? <DashboardPage /> : <Navigate to="/" />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signup" element={isLogged === "true" ? <Navigate to="/" /> : <SignUpPage />} />
            <Route path="/signin" element={isLogged === "true" ? <Navigate to="/" /> : <SignInPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
