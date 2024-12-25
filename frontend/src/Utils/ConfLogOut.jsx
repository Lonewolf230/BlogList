import React from "react";

export default function ConfLogOut({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-center pb-6">Are you sure?</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded-lg">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-lg">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}


