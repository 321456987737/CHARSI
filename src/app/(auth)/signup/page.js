// app/(auth)/signup/page.js
'use client';

import { Suspense } from 'react';
import SignupForm from '@/componenets/auth/signupform';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
}
