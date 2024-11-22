"use client";

import { Session } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react";

interface LoginButtonProps {
  serverSession: Session | null;
}

export default function LoginButton({ serverSession }: LoginButtonProps) {
  const { data: session } = useSession();

  const activeSession = session || serverSession; 

  if (activeSession) {
    return (
      <>
        Signed in as {activeSession.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
