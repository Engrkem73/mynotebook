import SignOut from 'app/components/sign-out';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
    const session = await auth().catch((error) => {
        console.error('Error fetching session:', error);
        return null;
      });

      if(!session) return redirect('/main');

return (
    <div className='notebook-container'>
      <div className='welcome-container'>
        <div className='welcome-left-padding'></div>
        <div className='welcome-content'>
          <h1>Welcome {session?.user?.name}</h1>
          <SignOut/>
        </div>
      </div>
      <div className='flex flex-row items-center justify-center w-full pt-10'>
        <h1 className='text-2xl font-bold mb-4'>Your Notebooks:</h1>
      </div>
      <ul>
        <li>Notebook 1</li>
        <li>Notebook 2</li>
      </ul>
   
      <br />
      <button>Create New Notebook</button>
    </div>
  );
}