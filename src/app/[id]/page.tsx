import { JsonData } from '@prisma/client';
import prisma from '@/lib/db';
import JsonViewer from '@/components/JsonViewer';

export default async function SharedJsonPage({ params }: { params: Promise<{ id: string }> }) {
  // Await params because Next.js now wraps it in a promise
  const { id } = await params;

  // Fetch JSON data from your database using Prisma
  const jsonData: JsonData | null = await prisma.jsonData.findUnique({
    where: { id },
  });

  if (!jsonData) {
    return <div>Data not found</div>;
  }

  return (
    <div className="mt-8 space-y-4">
      <h1 className="text-2xl underline font-bold">{jsonData.name}</h1>
      {/* Use the client component here */}
      <JsonViewer content={jsonData.content} />
    </div>
  );
}
