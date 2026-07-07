import { RegisterForm } from '@/features/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <>
      <h1 className='mb-6 text-center text-xl font-bold text-white'>
        Register
      </h1>
      <RegisterForm />
    </>
  );
}
