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
    <Card className="json-editor-card">
      <CardHeader className="json-editor-header">
        <CardTitle className="json-editor-title">Saved JSON Data</CardTitle>
        <CardDescription className="json-editor-description">
          View and share your saved JSON data.
        </CardDescription>
      </CardHeader>
      <CardContent className="json-editor-content">
        <JsonDataTable key={refreshKey} />
      </CardContent>
      <CardFooter className="json-editor-footer">
        <AddJsonDialog onSave={handleSave} />
      </CardFooter>
    </Card>
  );
}
