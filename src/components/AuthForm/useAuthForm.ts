import { useForm } from 'react-hook-form';
import { authFormSchema } from './auth-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/firebase/client';
import { signIn, signUp } from '@/lib/actions/auth.action';

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

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (type === 'sign-up') {
        const { fullname, email, password } = values;

        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success('Account created successfuly. Please sign in.');
        router.push('/sign-in');
      } else {
        const { email, password } = values;

        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredentials.user.getIdToken();

        if (!idToken) {
          toast.error('Sign in failed');
          return;
        }

        await signIn({ email, idToken });

        toast.success('Sign in successfully');
        router.push('/');
      }
    } catch (error) {
      console.error(error);
      toast.error(`There was an error: ${error}`);
    }
  });

  return { form, onSubmit };
};
