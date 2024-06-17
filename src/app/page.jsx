"use client";

import { NewProducts } from "@/components/newProducts/page";
import { SessionProvider, useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  return (
    <SessionProvider session={session}>
      <main>
        <NewProducts />
      </main>
    </SessionProvider>
  );
};

export default Home;
