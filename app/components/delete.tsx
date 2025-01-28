import React, {useState} from 'react';

interface DeleteButtonProps {
  notebookId: string;
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ notebookId, onDelete }) => {
  const [isDeleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    setDeleting(true)
    const response = await fetch(`/api/notebooks/${notebookId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setDeleting(false)
    if (response.ok) {
      onDelete(); // Call the onDelete prop to refresh the state or perform further actions
    } else {
      const errorData = await response.json();
      console.error('Error deleting notebook:', errorData);
    }
  };

  return (
    <button onClick={handleDelete} disabled={isDeleting} className='bg-red-500 w-[100px] text-white px-4 py-2 rounded-md mb-4' aria-label='Delete Button'>
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteButton;