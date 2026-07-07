import { LoginForm } from '@/features/auth/LoginForm';

export default function LoginPage() {
  return (
    <>
      <h1 className='mb-6 text-center text-xl font-bold text-white'>
        Welcome Back!
      </h1>
      <LoginForm />
    </>
  );
}
