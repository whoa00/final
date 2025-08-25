import React, { useState, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import './styles/App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/profile/Profile';
import Analytics from './pages/Analytics';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import { useAdminAuth } from './contexts/AdminAuthContext';
import HostCampRegister from './pages/host/HostCampRegister';
import NoticeList from './pages/notice/NoticeList';
import NoticeForm from './pages/notice/NoticeForm';
import NoticeDetail from './pages/notice/NoticeDetail';
import NoticeReform from './pages/notice/NoticeReform';
import HostDashboard from './pages/host/HostDashboard';
import ProfileReform from './pages/profile/ProfileReform';
import ReserveList from './pages/profile/ReserveList';
import RequestHost from './pages/profile/RequestHost';
import PointDetail from './pages/profile/PointDetail';
import CampsiteDetail from './pages/CampsiteDetail';
import DestinationList from './pages/DestinationList';
import BookingPage from './pages/Bookingpage';
import ChatWidget from './pages/ChatWidget';
import HostProfileReform from './pages/HostProfileReform';

const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdminAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login', { replace: true });
    }
  }, [isAdminAuthenticated, navigate]);
  return isAdminAuthenticated ? <>{children}</> : null;
};

const AppContent: React.FC = () => {
  const location = useLocation();

  // 로그인 관련 페이지에서는 ChatWidget 숨기기
  const hiddenPaths = ['/login', '/signup', '/admin/login'];
  const isHidden = hiddenPaths.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/campsite/:slug" element={<CampsiteDetail />} />
                <Route path="/booking/:slug" element={<BookingPage />} />
                <Route path="/destination/:categorySlug" element={<DestinationList />} />
                <Route path="host/dashboard" element={<HostDashboard />} />
                <Route path="/host/register" element={<HostCampRegister />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/profile/reform" element={<ProtectedRoute><ProfileReform /></ProtectedRoute>} />
                <Route path="/profile/reserve" element={<ProtectedRoute><ReserveList /></ProtectedRoute>} />
                <Route path="/profile/host" element={<ProtectedRoute><RequestHost /></ProtectedRoute>} />
                <Route path="/profile/point" element={<ProtectedRoute><PointDetail /></ProtectedRoute>} />
                <Route path="/analytics" element={<Analytics />}/>
                <Route path="/projects" element={<Projects />} />
                <Route path="/host/profile/edit" element={<HostProfileReform />} />
                <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
                <Route path="/admin/users" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
                <Route path="/admin/settings" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
                <Route path="/admin/analytics" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
                <Route path="/notice" element={<NoticeList />} />
                <Route path="/notice/form" element={<NoticeForm />} />
                <Route path="/notice/detail/:id" element={<NoticeDetail />} />
                <Route path="/notice/reform/:id" element={<NoticeReform />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>

      {/* ChatWidget은 숨길 경로 제외 후 렌더링 */}
      {!isHidden && <ChatWidget />}
    </>
  );
};

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: { colorPrimary: '#1890ff', borderRadius: 4 },
      }}
    >
      <Router>
        <AuthProvider>
          <AdminAuthProvider>
            <AppContent />
          </AdminAuthProvider>
        </AuthProvider>
      </Router>
    </ConfigProvider>
  );
};

export default App;
