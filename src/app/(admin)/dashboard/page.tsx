"use client";

import { MySession } from "@/interfaces/mySession";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const DashboardPage = () => {
  const { data: session, status } = useSession() as MySession;

  const { push } = useRouter();

  useEffect(() => {
    console.log({ session });

    if (status === "unauthenticated") push("/login");
    if (session?.user?.role) {
      if (session.user.role !== "admin") push("/");
    }
  }, [status, session, push]);

  return (
    <>
      <div className="bg-gray-500 w-full flexc h-[15rem] rounded-lg text-white font-semibold">
        Dashboard Page
      </div>
    </>
  );
};

export default DashboardPage;
