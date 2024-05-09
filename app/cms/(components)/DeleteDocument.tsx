"use client"
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { deleteDocument } from '@/utils/actions/articles/delete-document'
import { Trash } from 'lucide-react'
import { useState } from 'react'

export default function DeleteDocument({ id }: { id: string }) {
  const [open, setOpen] = useState<boolean>(false);


  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Trash className='w-4 h-4' />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete document</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your document?
          </DialogDescription>
        </DialogHeader>
        <Button type="submit" onClick={async () => {
          try {
            const response = await deleteDocument(id)
            console.log('response', response)
            setOpen(false)
            return response
          } catch (error) {
            console.log('error', error)
            return error
          }
        }}>Delete</Button>
      </DialogContent>
    </Dialog>)
}