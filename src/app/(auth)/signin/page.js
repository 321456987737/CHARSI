// app/(auth)/signin/page.js
'use client';

import { Suspense } from 'react';
import SigninForm from '@/componenets/auth/signinform';
export default function Page() {
  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <SigninForm />
    </Suspense>
  );
}
