// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Login } from './Login';

// // Validation schema
// const loginSchema = z.object({
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(8, 'Password must be at least 8 characters')
// });

// type LoginFormData = z.infer<typeof loginSchema>;

// export const useLoginLogic = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting }
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema)
//   });

//   const onSubmit = async (data: LoginFormData) => {
//     try {
//       // TODO: Implement actual login API call here
//       console.log('Login attempt with:', data);

//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       // On successful login
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Login failed:', error);
//       // Handle login error (show error message, etc.)
//     }
//   };

//   return {
//     register,
//     handleSubmit,
//     errors,
//     isSubmitting,
//     showPassword,
//     setShowPassword,
//     onSubmit
//   };
// };

import { Login } from './Login';

const LoginContainer = () => {
  return <Login />;
};

export default LoginContainer;
