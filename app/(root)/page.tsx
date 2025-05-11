import { Button } from '@/components/ui/button';
import {
  getCurrentUser,
  getInterviewsByUserId,
  getLatestInterviews,
} from '@/lib/actions/auth.action';
import { InterviewCard } from '@/src/components/InterviewCard/interview-card';
import { dummyInterviews } from '@/src/constants';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const user = await getCurrentUser();
  const [userInterviews, latestInterviews] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  console.log(userInterviews);
  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Get Interview-Ready with AI-Powered practice & Feedback</h2>
          <p className='text-lg'>
            Practice on real interview questions & get instant feedback
          </p>
          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href='/interview'>Start an Interview</Link>
          </Button>
        </div>
        <Image
          height={400}
          width={400}
          src='/robot.png'
          alt='robo'
          className='max-sm:hidden'
        />
      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>
        <div className='interviews-section'>
          {userInterviews && userInterviews.length > 0 ? (
            userInterviews.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>You haven't taken any interviews yest</p>
          )}
        </div>
      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take an Interview</h2>
        <div className='interviews-section'>
          {latestInterviews && latestInterviews.length > 0 ? (
            latestInterviews.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  );
}
