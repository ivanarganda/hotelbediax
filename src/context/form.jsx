import React, { useState, useEffect , useCallback } from "react";
import useUrls from "../hooks/useUrls";

// Create the context
const FormContext = React.createContext();

// Create the provider component
const FormProvider = ({ children }) => {

    const [contentForm, setContentForm] = useState({});
    const [openedModal, setOpenedModal] = useState(false);
    const [ id , setId ] = useState(0);
    const [ data , setData ] = useState({});
    const [type, setType] = useState('');
    const { urls } = useUrls();

    const changeId = ( id )=>{
        setId( id );
    }
    
    const getData = ( data )=>{
        setData( data );
    }

    // Only for update events
    const getDataUpdate = useCallback(async() => {

        const response = await fetch(`${urls.ws}/destination?id=${id}` , 
            {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
            }
          )
      
          const data_to_update = await response.json();

        if (data_to_update) {
        setContentForm(data_to_update[0]);
        }
    }, [id, data]);

    const changeType = useCallback(( option ) =>{
        setType( option )
    }, []);

    useEffect(() => {
        if (id) {
        // Fetch data
        if ( type == 'update' ){
            getDataUpdate();
        } 
        }
    }, [id, getDataUpdate]);

    return (
        <FormContext.Provider value={{type, changeType , changeId , getData , contentForm, setOpenedModal, openedModal }}>
            {children}
        </FormContext.Provider>
    );
};

// Export the context and provider
export { FormContext, FormProvider };
