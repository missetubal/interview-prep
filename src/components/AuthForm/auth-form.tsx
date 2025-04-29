'use client';
import { Form } from '@/components/ui/form';
import Image from 'next/image';
import { useAuthForm } from './useAuthForm';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FormField } from '../FormField/form-field';

export const AuthForm = ({ type }: { type: FormType }) => {
  const { form, onSubmit } = useAuthForm(type);
  const isSignIn = type === 'sign-in';

  return (
    <div className='card-border lg:min-w-[566px]'>
      <div className='flex flex-col gap-6 card py-14 px-10'>
        <div className='flex flex-row gap-2 justify-center'>
          <Image src='/logo.svg' alt='logo' height={32} width={38} />
          <h2 className='text-primary-100'>PrepInterview</h2>
        </div>
        <h3>Practice job interviews with AI</h3>
        <Form {...form}>
          <form className='w-full space-y-6 mt-4 form' onSubmit={onSubmit}>
            {!isSignIn && (
              <FormField
                name='fullname'
                control={form.control}
                label='Fullname'
                placeholder='Your fullname'
              />
            )}
            <FormField
              name='email'
              control={form.control}
              label='Email'
              placeholder='Your email'
              type='email'
            />
            <FormField
              name='password'
              control={form.control}
              label='Password'
              placeholder='Your password'
              type='password'
            />
            <Button className='btn'>
              {isSignIn ? 'Sign in' : 'Create an account'}
            </Button>
          </form>
        </Form>

        <p className='text-center'>
          {isSignIn ? 'No account yet?' : 'Have an account already?'}
          <Link
            href={!isSignIn ? '/sign-in' : 'sign-up'}
            className='font-bold text-user-primary ml-1'
          >
            {isSignIn ? 'Sign in' : 'Sign up'}
          </Link>
        </p>
      </div>
    </div>
  );
};
