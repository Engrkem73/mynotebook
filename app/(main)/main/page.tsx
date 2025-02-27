import { auth } from '@/auth'
import SignIn from 'app/components/sign-in';
import {redirect} from 'next/navigation';

export default async function Home() {
  const session = await auth().catch((error: Error) => {
    console.error('Error fetching session:', error);
    return null;
  });

  if (session) {
    return redirect('/');
  } else {
    return (
      <main className='bg-gradient-to-b from-black to-[#363535] flex flex-col items-center justify-center w-[600px] h-[400px] pt-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg gap-4'>
        <h1 className='text-2xl font-bold mb-4'>Welcome to My Notebook</h1>
        <p className='mb-4'>Please log in to access your notebooks</p>
        <SignIn />
      </main>
    );
  }
}
