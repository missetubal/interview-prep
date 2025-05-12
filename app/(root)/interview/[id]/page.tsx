import { getCurrentUser } from '@/lib/actions';
import { getInterviewsById } from '@/lib/actions/general.actions';
import { getRandomInterviewCover } from '@/lib/utils';
import { Agent } from '@/src/components';
import { DisplayTechIcons } from '@/src/components/InterviewCard/display-tech-icons';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export const InterviewPage = async ({ params }: RouteParams) => {
  const { id } = await params;
  const interview = await getInterviewsById(id);
  const user = await getCurrentUser();

  console.log(interview);

  if (!interview) redirect('/');

  return (
    <>
      <div className='flex flex-row gap-4 justify-between'>
        <div className='flex flex-row gap-4 items-center max-sm:flex-col'>
          <div className='flex flex-row gap-4 items-center'>
            <Image
              src={getRandomInterviewCover()}
              alt='cover-image'
              width={40}
              height={40}
              className='rounded-4 object-cover size-[40px]'
            />
            <h3 className='capitalize'>{interview.role}</h3>
          </div>
          <DisplayTechIcons techStack={interview.techstack} />
        </div>
        <p className='bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize'>
          {interview.type}
        </p>
      </div>
      <Agent
        userName={user?.name!}
        type={'interview'}
        interviewId={interview.id}
        questions={interview.questions}
      />
    </>
  );
};

export default InterviewPage;
