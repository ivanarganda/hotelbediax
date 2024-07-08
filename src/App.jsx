import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import useLoader from './hooks/useLoader';
import Form from './components/Form';
import Snackbar_ from './components/Snackbar';

// Layouts
const Header = lazy(() => import('./components/layouts/Header'));

// Sections and functions
const Table = lazy(() => import('./components/Table'));
const Pagination = lazy(() => import('./components/Pagination'));
const SidebarLeft = lazy(() => import('./components/layouts/SidebarLeft'));

function App() {
  // Bar seacrch  
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    destination_name:'',
    description:'',
    country:'',
    type:''
  });

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }
  // Sidebarlef
  const handleFilters = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFilters({...filters, [name]: value });

    console.log( filters );
  }

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const handlePreviousPageChange = () => {
    setCurrentPage(currentPage - 1);
  }

  const handleNextPageChange = () => {
    setCurrentPage(currentPage + 1);
  }
  // Props
  const Pagination_ = <Pagination search={search} currentPage={currentPage} handlePreviousPageChange={handlePreviousPageChange} handlePageChange={handlePageChange} handleNextPageChange={handleNextPageChange} />

  return (
    <Router>
      <Suspense fallback={useLoader()}>
        <Header handleSearch={handleSearch} />
        <div className='w-full z-30 mt-24 -mb-20'>
          {Pagination_}
        </div>
        <div className='flex w-full flex-row justify-centter'>
          <SidebarLeft handleFilters={handleFilters}/>
          <Form />
          <Table filters={filters} search={search} page={currentPage} />
        </div>
        {Pagination_}
        <Snackbar_ />
      </Suspense>
    </Router>
  );
}

export default App;
