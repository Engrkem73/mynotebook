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
        <main>
            <Head>
                <link rel="icon" href="/favicon.ico" type="image/jpeg" />
            </Head>
            <div className='justify-start'>
                <div className='flex flex-row items-center h-16'>
                    <h1 className='text-2xl font-bold flex-1 md:text-center text-left'>Welcome, {session.user.name}</h1>
                    <div className='flex-none pr-5'>
                      <SignOut />
                    </div>
                </div>
                <div className='flex flex-col justify-start items-center gap-4 h-screen pt-10'>
                    <div className=''>
                        <h1 className=''>My Notebooks:</h1>
                    </div>
                    <CreateNewNotebook/>
                    <NotebooksList notebooks={notebooks} />
                </div>
            </div>
            <Footer />
        </main>
    );
}