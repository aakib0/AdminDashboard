import React, { useState } from "react";

export default function DriverModal({ user }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("menu");

  const close = () => {
    setOpen(false);
    setView("menu");
  };

  return (
    <div>
 
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1 rounded bg-emerald-500 text-white hover:bg-emerald-600 text-sm"
      >
        Actions
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 relative">

          
            <button
              onClick={close}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {view === "menu" && (
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setView("details")}
                  className="p-3 rounded border border-emerald-500 text-emerald-500 hover:bg-emerald-50"
                >
                  Details
                </button>
                <button
                  onClick={() => setView("documents")}
                  className="p-3 rounded border border-emerald-500 text-emerald-500 hover:bg-emerald-50"
                >
                  Documents
                </button>
                <button
                  onClick={() => setView("delete")}
                  className="p-3 rounded border bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}

           
            {view === "details" && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-emerald-600">Driver Details</h2>
                <p>
                  <strong>Name:</strong> {user.Name} <br />
                  <strong>ID:</strong> {user.ID} <br />
                  <strong>Bank:</strong> {user.bankName} <br />
                  <strong>Account:</strong> {user.accountNumber} <br />
                  <strong>IFSC:</strong> {user.IFSCCode}
                </p>
                <button
                  onClick={() => setView("menu")}
                  className="mt-4 px-4 py-2 rounded border border-emerald-500 text-emerald-500 hover:bg-emerald-50"
                >
                  Back
                </button>
              </div>
            )}

         
            {view === "documents" && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-emerald-600">Driver Documents</h2>
                <div className="flex gap-4">
                  <img
                    src={user.aadharFront}
                    alt="Aadhar"
                    className="h-32 w-40 object-cover rounded border"
                  />
                  <img
                    src={user.dlFront}
                    alt="License"
                    className="h-32 w-40 object-cover rounded border"
                  />
                </div>
                <button
                  onClick={() => setView("menu")}
                  className="mt-4 px-4 py-2 rounded border border-emerald-500 text-emerald-500 hover:bg-emerald-50"
                >
                  Back
                </button>
              </div>
            )}

            
            {view === "delete" && (
              <div>
                <h2 className="text-lg font-semibold mb-2 text-red-500">Delete Driver</h2>
                <p className="mb-4 text-sm text-gray-600">
                  Are you sure you want to delete this driver?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      alert(`Driver with ID ${user.ID} deleted.`);
                      close();
                    }}
                    className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={close}
                    className="px-4 py-2 rounded border border-emerald-500 text-emerald-500 hover:bg-emerald-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
