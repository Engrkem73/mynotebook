import SignOut from 'app/components/sign-out';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from "@/prisma";
import NotebooksList from './components/notebooks-list';
import Head from 'next/head';
import Footer from './components/footer';
import CreateNewNotebook from './components/createNewNotebook';

export default async function Home() {
    const session = await auth();

    if (!session) return redirect('/main');

    const notebooks = await prisma.notebook.findMany({
        where: {
            userId: session.user.id,
        },
    });

    return (
        <main className="bg-gradient-to-b from-black to-[#363535] overflow-auto">
            <Head>
                <link rel="icon" href="/favicon.ico" type="image/jpeg" />
            </Head>
            <div className='p-4 h-full flex flex-col'>
                <div className='flex flex-row items-center h-1/10'>
                    <h1 className='text-2xl font-bold flex-1 md:text-center text-left'>Welcome, {session.user.name}</h1>
                    <div className='flex-none pr-5'>
                      <SignOut />
                    </div>
                </div>
                <div className='flex flex-col justify-start items-center gap-4 h-9/10 pt-10'>
                    <div className=''>
                        <h1 className='text-xl font-semibold'>My Notebooks:</h1>
                    </div>
                    <CreateNewNotebook/>
                    <NotebooksList notebooks={notebooks} />
                </div>
            </div>
            <Footer />
        </main>
    );
}