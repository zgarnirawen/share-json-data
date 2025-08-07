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
        <Button className="btn-primary">Add JSON Data</Button>
      </DialogTrigger>
      <DialogContent className="dialog-content">
        <DialogHeader>
          <DialogTitle className="dialog-title">JSON Editor</DialogTitle>
          <DialogDescription className="dialog-description">
            Edit and save your JSON data.
          </DialogDescription>
        </DialogHeader>

        <div className="form-grid">
          <div className="form-group">
            <Label className="label">JSON Name</Label>
            <Input
              value={jsonName}
              placeholder="Enter JSON Name"
              className="input-standard"
              onChange={(e) => setJsonName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <Label className="label">JSON Data</Label>
            <CodeMirror
              value={jsonData}
              height="400px"
              extensions={[json()]}
              onChange={(value) => setJsonData(value)}
              className="code-editor"
            />
          </div>

          <DialogFooter className="dialog-footer">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="btn-secondary">
                Close
              </Button>
            </DialogClose>
            <Button
              disabled={!jsonName || !jsonData}
              onClick={handleSave}
              className={(!jsonName || !jsonData) ? 'btn-disabled' : 'btn-primary'}
            >
              Save
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
