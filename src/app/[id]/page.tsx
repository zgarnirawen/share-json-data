// src/app/[id]/page.tsx
import { JsonData } from '@prisma/client';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

interface PageProps {
  params: {
    id: string;
  };
}

async function getData(id: string): Promise<JsonData | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/json/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function SharedJsonPage({ params }: PageProps) {
  const jsonData = await getData(params.id);

  if (!jsonData) {
    return <div>Data not found</div>;
  }

  return (
    <div className="mt-8 space-y-4">
      <h1 className="text-2xl underline font-bold">{jsonData.name}</h1>
      <CodeMirror
        value={jsonData.content}
        height="400px"
        extensions={[json()]}
        editable={false}
        className="border shadow-sm"
      />
    </div>
  );
}
