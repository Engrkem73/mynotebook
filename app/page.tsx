import { auth, signIn, signOut } from '@/auth'
import SignIn from './components/sign-in';
import SignOut from './components/sign-out';

/**
 * Home page component
 */
export default async function Home() {
  const session = await auth().catch((error) => {
    console.error('Error fetching session:', error);
    return null;
  });

  console.log('Session:', session);

  // If user is not logged in, show login form
  if (!session) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>Welcome to Notebook App</h1>
        <p>Please log in to access your notebooks</p>
        <SignIn />
      </div>
    );
  }

  // If user is logged in, show notebook list/create UI
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Welcome {session?.user?.name}</h1>
      <p>Your Notebooks:</p>
      <ul>
        <li>Notebook 1</li>
        <li>Notebook 2</li>
      </ul>
      <SignOut />
      <br />
      <button>Create New Notebook</button>
    </div>
  );
}
