'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { JsonData } from '@prisma/client';
import { format } from 'date-fns';
import { ShareIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function JsonDataTable() {
  const [jsonDataList, setJsonDataList] = useState<JsonData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/json');
      const data = await response.json();

      setJsonDataList(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-text">Loading...</div>
    );
  }

  if (!jsonDataList.length) {
    return (
      <div className='no-data-text'>No data available, please add new entry!</div>
    );
  }

  return (
    <Table className="json-table">
      <TableHeader className="table-header">
        <TableRow>
          <TableHead className="table-head">Name</TableHead>
          <TableHead className="table-head">Created At</TableHead>
          <TableHead className="sr-only">Share</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="table-body">
        {jsonDataList.map((data) => (
          <TableRow key={data.id} className="table-row">
            <TableCell className="table-cell">{data.name}</TableCell>
            <TableCell className="table-cell">
              {format(new Date(data.createdAt), 'MMMM d, yyyy')}
            </TableCell>
            <TableCell className="table-cell share-cell">
              <Link href={`/${data.id}`} aria-label={`Share JSON data: ${data.name}`}>
                <ShareIcon className='share-icon' />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
