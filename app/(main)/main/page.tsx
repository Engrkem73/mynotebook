
import { auth } from '@/auth'
import SignIn from 'app/components/sign-in';
import {redirect} from 'next/navigation';



export default async function Home() {
  const session = await auth().catch((error) => {
    console.error('Error fetching session:', error);
    return null;
  });


  if (session) {
    return redirect('/');
  } else {
    return (
      <div className='flex flex-col items-center justify center bg-gray-800 w-[600px] h-[400px] pt-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-lg gap-4'>
        <h1 className='text-2xl font-bold mb-4'>Welcome to My Notebook</h1>
        <p className='mb-4'>Please log in to access your notebooks</p>
        <SignIn />
      </div>
    );
  }
}
