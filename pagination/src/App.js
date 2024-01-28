import React, { useState, useEffect } from 'react';
import './App.css'

function App () {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    // Simulating API call to fetch data
    const fetchData = async () => {
      try {
        // Replace the API endpoint with your actual API endpoint
        const response = await fetch(` https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
        setTotalPages(Math.ceil(result.length / itemsPerPage));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Calculate the range of items to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  return (
    <div>
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      <h1>Employee Data Table</h1>
      

      <table >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody >
          {data.slice(startIndex, endIndex).map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <button>{currentPage}</button>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default App;