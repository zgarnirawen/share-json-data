import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { JsonData } from '@prisma/client';

interface SharedJsonProps {
  params: {
    id: string;
  };
}

async function fetchJsonData(id: string): Promise<JsonData | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/json/${id}`, {
    // Important : for server-side fetching in Next.js 13+, on peut mettre `cache: 'no-store'` si besoin
    cache: 'no-store',
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function SharedJson({ params }: SharedJsonProps) {
  const jsonData = await fetchJsonData(params.id);

  if (!jsonData) {
    return <div className="mt-8">Aucune donnée trouvée.</div>;
  }

  return (
    <div className="mt-8 space-y-4">
      <h1 className="text-2xl underline font-bold">{jsonData.name}</h1>
      <CodeMirror
        value={jsonData.content || ''}
        height="400px"
        extensions={[json()]}
        editable={false}
        className="border shadow-sm"
      />
    </div>
  );
}
