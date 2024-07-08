import React, { useState, useEffect, useMemo } from "react";
import useUrls from './../hooks/useUrls';

// Create the context
const CountriesContext = React.createContext(); 

// Create the provider component
const CountriesProvider = ({ children }) => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { urls } = useUrls();

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(`${urls.ws}/countries`);
                const data = await response.json();
                setCountries(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    // Use useMemo to memoize the context value
    const value = useMemo(() => ({ countries, loading, error }), [countries, loading, error]);

    return (
        <CountriesContext.Provider value={value}>
            {children}
        </CountriesContext.Provider>
    );
};

// Export the context and provider
export { CountriesContext, CountriesProvider };
