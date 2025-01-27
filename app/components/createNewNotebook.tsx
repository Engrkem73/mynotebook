import React from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'

const CreateNewNotebook = () => {
  return (
    <div className="flex justify-end w-4/5 md:w-3/5">
        <Link href="notebooks/new" className="bg-gray-600 rounded-md p-1 flex items-center gap-1">
            <Plus size={16} />
            <span className="text-sm">New Notebook</span>
        </Link>
    </div>
  )
}

export default CreateNewNotebook