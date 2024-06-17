"use client";

import { useSession } from "next-auth/react";

export function Welcome() {
  const { data: session, status, update } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div>
      <div className="text-center w-fit">
        <h1 className="font-bold text-text1 p-2 my-2">
          Administrador: <span className="text-celeste">{session?.user?.name}</span>
        </h1>
      </div>
    </div>
  );
}
