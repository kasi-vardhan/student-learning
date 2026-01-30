import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import InputPage from './pages/InputPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResultPage from './pages/ResultPage';
import QuizPage from './pages/QuizPage';
import AIChat from './components/AIChat';
import LofiPlayer from './components/LofiPlayer';
import SummaryPage from './pages/SummaryPage';
import FlashcardPage from './pages/FlashcardPage';
import ForgotPassword from './pages/ForgotPassword';
import { getStudents } from './services/studentService';

// Private Route Component
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

function App() {
  const [userStyle, setUserStyle] = React.useState('Average Learner');

  const fetchLatestStyle = async () => {
    try {
      const students = await getStudents();
      if (students.length > 0) {
        setUserStyle(students[0].learningStyle);
      }
    } catch (error) {
      console.error("Error fetching style", error);
    }
  };

  return (
    <Router>
      <AuthProvider>
        <AppContent userStyle={userStyle} fetchLatestStyle={fetchLatestStyle} />
      </AuthProvider>
    </Router>
  );
}

const AppContent = ({ userStyle, fetchLatestStyle }) => {
  const { currentUser } = useAuth();
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light');

  React.useEffect(() => {
    if (currentUser) {
      fetchLatestStyle();
    }
  }, [currentUser]);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/input"
            element={
              <PrivateRoute>
                <InputPage fetchLatestStyle={fetchLatestStyle} />
              </PrivateRoute>
            }
          />
          <Route
            path="/result"
            element={
              <PrivateRoute>
                <ResultPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <PrivateRoute>
                <QuizPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/summary"
            element={
              <PrivateRoute>
                <SummaryPage userStyle={userStyle} />
              </PrivateRoute>
            }
          />
          <Route
            path="/flashcards"
            element={
              <PrivateRoute>
                <FlashcardPage userStyle={userStyle} />
              </PrivateRoute>
            }
          />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
      {currentUser && <AIChat userStyle={userStyle} />}
      {currentUser && <LofiPlayer />}
      <Footer />
    </div>
  );
};

export default App;
