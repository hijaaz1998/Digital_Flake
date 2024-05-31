import React from 'react';
import { HiOutlineExclamation } from 'react-icons/hi';

type ModalProps = {
  title: string
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteModal: React.FC<ModalProps> = ({ title, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-4 rounded shadow-lg z-10 max-w-md">
        <div className="flex items-center justify-center mb-4">
          <HiOutlineExclamation className="text-red-500 text-2xl mr-2" />
          <h2 className="text-lg font-bold">Confirm Deletion</h2>
        </div>
        <p className="mb-4">{title}</p>
        <div className="flex justify-center space-x-2">
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
