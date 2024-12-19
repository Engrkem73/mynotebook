import React from 'react';

interface DeleteButtonProps {
  notebookId: string;
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ notebookId, onDelete }) => {
  const handleDelete = async () => {
    const response = await fetch(`/api/notebooks/${notebookId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      onDelete(); // Call the onDelete prop to refresh the state or perform further actions
    } else {
      const errorData = await response.json();
      console.error('Error deleting notebook:', errorData);
    }
  };

  return (
    <button onClick={handleDelete} className='continue-button'>
      Delete
    </button>
  );
};

export default DeleteButton;