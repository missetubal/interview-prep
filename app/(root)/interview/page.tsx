import { getCurrentUser } from '@/lib/actions';
import { Agent } from '@/src/components';

export const Interview = async () => {
  const user = await getCurrentUser();
  return (
    <>
      <h3>Interview Generator</h3>
      <Agent userName={user?.name ?? ''} userId={user?.id} type='generate' />
    </>
  );
};

export default Interview;
