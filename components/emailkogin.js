import { signIn } from "next-auth/react"

export default function EmailLogin({ email }){
    <button onClick={() => signIn("email", { email })}>Sign in with Email</button>
}

