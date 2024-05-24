import React from 'react';
import AdminNav from '../../components/admin/nav/AdminNav';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
export default async function layout({ children }) {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
  }
  if (session && session.user) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if ( user.role != 'admin') {
      redirect('/');
    }
  }

  return (
    <section className="mx-auto h-full w-full max-w-screen-xl items-center justify-center  px-2 min-h-screen">
      <AdminNav />

      {children}
    </section>
  );
}
