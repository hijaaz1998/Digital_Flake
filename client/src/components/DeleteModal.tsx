import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-4 rounded shadow-lg z-10">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this item?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
