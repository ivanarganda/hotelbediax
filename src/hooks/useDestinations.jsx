import React, { useState, useEffect, useMemo, useCallback } from 'react';
import useUrls from './useUrls';

const fetchDestinationsFromAPI = async (filters, search, page, signal) => {
    const { urls } = useUrls();
    const json_data = {
        filtersSidebar: filters,
        search: search || '',
        page: page
    };
    const response = await fetch(`${urls.ws}/destinations`, 
        {   signal , 
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(json_data)
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
};

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const useDestinations = (filtersSidebar, search = '', page = 1) => {
    const [destinations, setDestinations] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const debouncedSearch = useDebounce(search, 2000);
    const filters = useMemo(() => filtersSidebar, [filtersSidebar]);

    const fetchDestinations = useCallback(async (signal) => {
        try {
            setLoading(true);
            const data = await fetchDestinationsFromAPI(filters, debouncedSearch, page, signal);
            setDestinations(data);
            setLoading(false);
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error(error);
                setError(true);
                setLoading(false);
            }
        }
    }, [filters, debouncedSearch, page]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetchDestinations(signal);

        return () => {
            controller.abort();
        };
    }, [fetchDestinations]);

    return { destinations, loading, error };
};

export default useDestinations;
