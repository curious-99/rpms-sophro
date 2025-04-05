import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Login from './pages/Login';
import { SignUp } from './pages/SignUp';
import ForgotPassword from './pages/Forgot-Password';
import UpdatePassword from './pages/Forgot-Password/UpdatePassword/UpdatePassword';
import PasswordUpdated from './pages/Forgot-Password/PasswordUpdated/PasswordUpdated';
import LoginviaOTP from './pages/Login/LoginviaOTP';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardHome from './pages/Dashboard';
import PatientsTableExample from './pages/Patients/PatientsExample';
import NotificationsPanel from './pages/Notifications/Notifications';

function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Forgot Password Routes */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/forgot-password/update-password"
        element={<UpdatePassword />}
      />
      <Route
        path="/forgot-password/password-updated"
        element={<PasswordUpdated />}
      />

      {/* Login via OTP Route */}
      <Route path="/login-otp" element={<LoginviaOTP />} />

      {/* Dashboard Routes (using the DashboardLayout) */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="patients" element={<PatientsTableExample />} />
        <Route path="notifications" element={<NotificationsPanel />} />
        {/* Add other nested routes as needed */}
      </Route>
    </Routes>
  );
}

function App() {
  const base = '/rpms-web/';
  return (
    <BrowserRouter basename={base}>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
