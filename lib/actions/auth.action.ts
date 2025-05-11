'use server';

import { auth, db } from '@/firebase/admin';
import { cookies } from 'next/headers';

const ONE_WEEK = 60 * 60 * 24 * 7;
export const signUp = async (params: SignUpParams) => {
  const { email, name, uid } = params;

  try {
    const userRecord = await db.collection('users').doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: 'User already exists. Please sign in instead.',
      };
    }

    await db.collection('users').doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: 'Account created successfully. Please sign in.',
    };
  } catch (err: any) {
    console.error('Error creating an user', err);

    if (err.code === 'auth/email-already-exists') {
      return {
        success: false,
        message: 'This email is already in use',
      };
    }
    return {
      success: false,
      message: 'Failed to create an account.',
    };
  }
};

export const setSessionCookie = async (idToken: string) => {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000,
  });

  cookieStore.set('session', sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });
};

export const signIn = async (params: SignInParams) => {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: 'User does not exists. Create an account instead.',
      };
    }

    await setSessionCookie(idToken);
  } catch (err) {
    console.error(err);

    return {
      success: false,
      error: 'Failed to log into an account ',
    };
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db
      .collection('users')
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const isAuthenticated = async () => {
  const user = await getCurrentUser();

  return !!user;
};

export const getInterviewsByUserId = async (
  userId: string
): Promise<Interview[] | null> => {
  const interviews = await db
    .collection('interviews')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
};

export const getLatestInterviews = async (
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> => {
  const { userId, limit = 20 } = params;
  const interview = await db
    .collection('interviews')
    .orderBy('createdAt', 'desc')
    .where('finalized', '==', true)
    .where('userId', '!=', userId)
    .limit(limit)
    .get();

  return interview.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
};
