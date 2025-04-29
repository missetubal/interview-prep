import { useForm } from 'react-hook-form';
import { authFormSchema, AuthFormType } from './auth-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

export const useAuthForm = (type: FormType) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(authFormSchema(type)),
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    try {
      if (type === 'sign-up') {
        console.log('SIGN UP', values);
        toast.success('Account created successfuly. Please sign in.');
        router.push('/sign-in');
      } else {
        toast.success('Sign in successfully');
        router.push('/');
        console.log('SIGN IN', values);
      }
    } catch (error) {
      console.error(error);
      toast.error(`There was an error: ${error}`);
    }
  });

  return { form, onSubmit };
};
