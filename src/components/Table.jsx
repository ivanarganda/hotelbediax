import React, { useContext, useState, useEffect, useMemo, useCallback } from 'react';
import useDestinations from '../hooks/useDestinations';
import useLoader from '../hooks/useLoader';
import { Link } from 'react-router-dom';
import { FormContext } from '../context/form';

import icons from '../utils/icons.json';

const Dashboard = React.memo(({ filters , search , page , perPage }) => {
  const { destinations, loading, error } = useDestinations( filters , search || '' , page || 1 , perPage );
  const { changeId, changeType, getData, setOpenedModal } = useContext(FormContext);

  const searchCoincidences = (data, search) => {
    if (data === null || data === undefined ) {
      return '';
    }

    if ( search == '' ){
      return data;
    }
  
    // Convert to string if it isn't already
    if ( typeof search == 'number'){
      search = search.toString();
    }
  
    // Ensure search is a string
     data = data.toString();
  
    return data.replaceAll(search, `<b>${search}</b>`);
    
  };

  const renderDestinationsRows = useMemo(() => {
    if (destinations.length === 0) {
      return (
        <tr className="border-b transition-colors hover:bg-muted/50">
          <td className="p-4 text-center" colSpan="6">
            {error ? (
              <div className="text-red-500 animate-pulse">Error connecting to the server.</div>
            ) : (
              <div className="text-gray-500 animate-pulse">No destinations found.</div>
            )}
          </td>
        </tr>
      );
    }

    return destinations.map((destination) => {
      const { id, destination_name, country_name, description, type, country_code } = destination;



      return (
        <tr key={id} className="border-b transition-colors hover:bg-gray-100">
          <td className="p-4 align-middle" dangerouslySetInnerHTML={{ __html: searchCoincidences(id,search || filters?.id ) }}></td>
          <td className="p-4 align-middle" dangerouslySetInnerHTML={{ __html: searchCoincidences(destination_name,search || filters?.destination_name) }}></td>
          <td className="p-4 align-middle" dangerouslySetInnerHTML={{ __html: searchCoincidences(description,search || filters?.description) }}></td>
          <td className="p-4 align-middle" dangerouslySetInnerHTML={{ __html: `${searchCoincidences(country_code, search || filters?.country.split('--')[1])} (${searchCoincidences(country_name, search)})` }}></td>
          <td className="p-4 align-middle" dangerouslySetInnerHTML={{ __html: searchCoincidences(type,search || filters?.type) }}></td>
          <td className="p-4 align-middle">
            <div className="flex items-center space-x-2">
              <Link
                onClick={() => {
                  changeId(id);
                  getData(destinations);
                  setOpenedModal(true);
                  changeType('update');
                }}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-blue-500 text-white hover:bg-blue-700 h-10 w-10"
                aria-label="Update"
              >
                <span dangerouslySetInnerHTML={{ __html: icons.pen }}></span>
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-red-500 text-white hover:bg-red-700 h-10 w-10"
                aria-label="Delete"
              >
                <span dangerouslySetInnerHTML={{ __html: icons.trash }}></span>
              </Link>
            </div>
          </td>
        </tr>
      );
    });
  }, [destinations, error, changeType]); 

  return (
    <>
      <div className="flex w-full min-h-screen justify-center flex-grow mt-20">
        <div className="flex-1 flex flex-col items-center p-4">
          <div className="border bg-white text-gray-800 w-full shadow-lg rounded-md" data-v0-t="card">
            <div className="p-6 overflow-x-auto flex flex-col justify-center items-center">
              <div className="relative w-full overflow-auto">
                {loading ? useLoader() : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-gray-200">
                        <th className="h-12 px-4 text-left align-middle font-medium bg-gray-50 text-gray-700">
                          Identificator
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium bg-gray-50 text-gray-700">
                          Name
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium bg-gray-50 text-gray-700">
                          Description
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium bg-gray-50 text-gray-700">
                          Country Code
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium bg-gray-50 text-gray-700">
                          Type
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium bg-gray-50 text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderDestinationsRows}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Dashboard;
