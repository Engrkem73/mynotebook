import SignOut from 'app/components/sign-out';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from "@/prisma";
import NotebooksList from './components/notebooks-list';
import Head from 'next/head';
import Footer from './components/footer';

export default async function Home() {
    const session = await auth();

    if(!session) return redirect('/main');

    const notebooks = await prisma.notebook.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return (
        <main> 
          <Head>
            <link rel="icon" href="/favicon.ico" type="image/jpeg" />
          </Head>
          <div className='notebook-container'>
            <div className='welcome-container'>
              <div className='welcome-left-padding'></div>
              <div className='welcome-content'>
                <h1>Welcome, {session.user.name}</h1>
                <SignOut/>
              </div>
            </div>
            <div className='main-content'>
            <div className='flex flex-row items-center justify-center w-full pt-10'>
              <h1 className='text-2xl font-bold mb-4'>Your Notebooks:</h1>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Link href="notebooks/new" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded inline-block">
                Create New Notebook
              </Link>
            </div>
            <NotebooksList notebooks={notebooks} />
          </div>
          </div>
          <Footer />
        </main>
    );
}