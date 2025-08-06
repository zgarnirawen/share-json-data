'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import JsonDataTable from './json-data-table';
import AddJsonDialog from './add-json-dialog';
import { useState } from 'react';

export default function JsonEditor() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSave = async (jsonName: string, jsonData: string) => {
    const response = await fetch('/api/json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: jsonName, content: jsonData }),
    });

    if (response.ok) {
      setRefreshKey((prev) => prev + 1);
      console.log('data successfully added');
    } else {
      console.log('something went wrong!');
    }
  };

  return (
    <Card className="max-w-5xl mx-auto my-8 shadow-lg border border-gray-200">
      <CardHeader className="space-y-1 pb-4 border-b border-gray-200">
        <CardTitle className="text-2xl font-bold">Saved JSON Data</CardTitle>
        <CardDescription className="text-gray-600">
          View and share your saved JSON data.
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto max-h-[500px]">
        <JsonDataTable key={refreshKey} />
      </CardContent>
      <CardFooter className="pt-4 border-t border-gray-200 flex justify-end">
        <AddJsonDialog onSave={handleSave} />
      </CardFooter>
    </Card>
  );
}
