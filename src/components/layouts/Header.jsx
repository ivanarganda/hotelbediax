import React, { useContext } from 'react';
import { FormContext } from '../../context/form';

export default function Header({ handleSearch }) {
  const { changeType, setOpenedModal } = useContext(FormContext);

  return (
    <header className="flex justify-between fixed top-0 z-10 items-center w-full bg-gray-600 text-primary-foreground px-6 py-4 shadow-md">
      <div className="flex items-center w-1/2">
        <h1 className="text-2xl font-bold text-gray-200">Destinations</h1>
      </div>
      <div className="w-auto">
        <button
          onClick={() => {
            changeType('create');
            setOpenedModal(true);
          }}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 transition duration-200"
          aria-label="Create new destination"
        >
          New
        </button>
      </div>
      <div className="flex items-center w-1/3 space-x-2">
        <input
          onChange={handleSearch}
          className="h-10 w-full rounded-md border border-input px-3 py-2 text-sm bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          type="search"
          placeholder="Search"
          aria-label="Search destinations"
        />
      </div>
    </header>
  );
}
