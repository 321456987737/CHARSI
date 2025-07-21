// app/(auth)/signup/page.js
'use client';

import { Suspense } from 'react';
import SignupForm from '@/components/auth/SignupForm';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
}
