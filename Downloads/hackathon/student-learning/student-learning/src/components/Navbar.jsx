import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BrainCircuit, LayoutDashboard, Home, Info, LogOut, Sun, Moon, Sparkles, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we are on the auth pages to apply specific styling
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch {
      console.error("Failed to log in.");
    }
  }

  return (
    <nav className={`navbar ${isAuthPage ? 'navbar-transparent' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <BrainCircuit size={28} className="logo-icon" />
          <span>EduSegment AI</span>
        </Link>
        <div className="flex items-center gap-4">
          <ul className="navbar-menu">
            <li>
              <Link to="/" className="nav-item">
                <Home size={18} />
                Home
              </Link>
            </li>
            {currentUser && (
              <>
                <li>
                  <Link to="/input" className="nav-item">
                    <BrainCircuit size={18} />
                    Analyze
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="nav-item">
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/summary" className="nav-item">
                    <Sparkles size={18} />
                    AI Summary
                  </Link>
                </li>
                <li>
                  <Link to="/flashcards" className="nav-item">
                    <BookOpen size={18} />
                    AI Flashcards
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/about" className="nav-item">
                <Info size={18} />
                About
              </Link>
            </li>
          </ul>
          <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          {currentUser ? (
            <Button variant="outline" onClick={handleLogout} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              <LogOut size={16} style={{ marginRight: '5px' }} /> Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button style={{ padding: '0.5rem 1.5rem' }}>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
