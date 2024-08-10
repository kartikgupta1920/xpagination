import React, { useEffect, useState } from "react";
import styles from './EmployeeTable.module.css';

const EmployeeTable = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() =>{
        fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(() => alert('Failed to fetch data'))
    }, []);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };
    const handleNextPage = () => {
        
        if (currentPage < Math.ceil(data.length / rowsPerPage)) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const lastRow = currentPage * rowsPerPage;
    const firstRow = lastRow - rowsPerPage;
    const currentData = data.slice(firstRow, lastRow);


    return(
        <div className={styles.employeetablecontainer}>
            <h2>Employee Data Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.paginationcontrols}>
                <button onClick={handlePrevPage} disabled={currentPage ===0}>
                    Previous
                </button>
                <span>{currentPage}</span>
                <button onClick={handleNextPage} disabled={currentPage === Math.ceil(data.length / rowsPerPage)}>
                Next
                </button>
            </div>
        </div>
    )
}

export default EmployeeTable;