'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useState } from 'react';

interface AddJsonDialogProps {
  onSave: (name: string, value: string) => Promise<void>;
}

export default function AddJsonDialog({ onSave }: AddJsonDialogProps) {
  const [jsonName, setJsonName] = useState('');
  const [jsonData, setJsonData] = useState('');
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleSave = async () => {
    await onSave(jsonName, jsonData);
    setOpenModal(false);
    setJsonName('');
    setJsonData('');
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add JSON Data</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl rounded-lg p-6 bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-900">JSON Editor</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mb-6">
            Edit and save your JSON data.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label className="text-gray-700 font-medium">JSON Name</Label>
            <Input
              value={jsonName}
              placeholder="Enter JSON Name"
              className="rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setJsonName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-gray-700 font-medium">JSON Data</Label>
            <CodeMirror
              value={jsonData}
              height="400px"
              extensions={[json()]}
              onChange={(value) => setJsonData(value)}
              className="border rounded-md shadow-sm"
            />
          </div>

          <DialogFooter className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Close
              </Button>
            </DialogClose>
            <Button
              disabled={!jsonName || !jsonData}
              onClick={handleSave}
              className={`${
                !jsonName || !jsonData
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              Save
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
