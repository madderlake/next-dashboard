import { Card, Text, Title } from '@tremor/react';
import dynamic from 'next/dynamic';

/* import Search dynamically b/c Search references the window object directly */
const DynamicSearch = dynamic(() => import('../../components/Search'), {
  ssr: false,
});
import UsersTable from '@/components/UsersTable';
import prisma from '@/lib/prisma';
type Props = {
  searchParams: {
    q: string;
  };
};

export default async function Home({ searchParams }: Props) {
  const query = searchParams.q;
  const users = await prisma.user.findMany({
    where: {
      name: {
        // partial match
        contains: query,
        // also have the search be case insensitive
        mode: 'insensitive',
      },
      email: {
        contains: query,
        mode: 'insensitive',
      },
    },
  });

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A table of users retrieved from our Postgres database.</Text>
      <DynamicSearch />
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
    </main>
  );
}
