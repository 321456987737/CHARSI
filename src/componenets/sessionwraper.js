"use client";
import {SessionProvider} from "next-auth/react";

export default function Sessionwraper({children}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

