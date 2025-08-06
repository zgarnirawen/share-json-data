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
      <div className="text-center py-10 text-gray-500 font-medium">Loading...</div>
    );
  }

  if (!jsonDataList.length) {
    return (
      <div className='text-center text-gray-500 mt-6 italic'>
        No data available, please add new entry!
      </div>
    );
  }

  return (
    <Table className="min-w-full divide-y divide-gray-200">
      <TableHeader className="bg-gray-50">
        <TableRow>
          <TableHead className="text-left px-4 py-2 font-semibold text-gray-700">
            Name
          </TableHead>
          <TableHead className="text-left px-4 py-2 font-semibold text-gray-700">
            Created At
          </TableHead>
          <TableHead className="sr-only">Share</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white divide-y divide-gray-200">
        {jsonDataList.map((data) => (
          <TableRow
            key={data.id}
            className="hover:bg-gray-100 transition-colors"
          >
            <TableCell className="px-4 py-2">{data.name}</TableCell>
            <TableCell className="px-4 py-2">
              {format(new Date(data.createdAt), 'MMMM d, yyyy')}
            </TableCell>
            <TableCell className="px-4 py-2 text-blue-600">
              <Link href={`/${data.id}`} aria-label={`Share JSON data: ${data.name}`}>
                <ShareIcon className='h-5 w-5 hover:text-blue-800 transition-colors' />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
