import { Title } from '@tremor/react';

export default async function Loading() {
  return (
    <main className="flex items-center justify-center min-h-screen text-sm text-gray-500">
      <Title>Loading...</Title>
    </main>
  );
}
