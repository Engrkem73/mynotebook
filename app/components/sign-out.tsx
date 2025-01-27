import { signOut } from "@/auth"
 
export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
   
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">Sign Out</button>
    </form>
  )
}