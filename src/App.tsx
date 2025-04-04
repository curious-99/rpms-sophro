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
import { UserRole } from './types/auth';

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: UserRole[] }) => {
  const location = useLocation();
  // TODO: Replace with actual auth check
  const userRole = 'DOCTOR'; // This should come from your auth context/state

  if (!allowedRoles.includes(userRole as UserRole)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

function AppContent() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Forgot Password Routes */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/forgot-password/update-password" element={<UpdatePassword />} />
      <Route path="/forgot-password/password-updated" element={<PasswordUpdated />} />
      <Route path="/login-otp" element={<LoginviaOTP />} />

      {/* Protected Routes */}
      <Route path="/doctor" element={
        <ProtectedRoute allowedRoles={['DOCTOR']}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<PatientsTableExample />} />
        <Route path="patients/:patientId" element={<DashboardHome />} />
        <Route path="notifications" element={<PatientsTableExample />} />
      </Route>

      <Route path="/patient" element={
        <ProtectedRoute allowedRoles={['PATIENT']}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<div>Patient Profile</div>} />
      </Route>

      <Route path="/caretaker" element={
        <ProtectedRoute allowedRoles={['CARETAKER']}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<div>CareTaker Profile</div>} />
      </Route>

      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<div>Admin Dashboard</div>} />
        <Route path="users" element={<div>User Management</div>} />
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
