import React, { useEffect, useState } from 'react';
import axios from 'axios'

function ActionPending(){
    
    const [create , setCreate] = useState(true)
    const [main, setMain] = useState(false)
    const [enrollment, setEnrollment] = useState(false)
    const [data, setData] = useState([]);
    
    const [isChecked, setIschecked] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [show , setShow] = useState(false)

    useEffect( () => {
        handleCreate();
    }, [])

    async function handleCreate(){
        setCreate(true)
        setMain(false)
        setEnrollment(false)
        try {
            const response = await axios.get('http://localhost:5000/faculty/createdcourseneedapproval');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data for create:', error);
        }
    }

    async function handleMain(){
        setEnrollment(false)
        setMain(true)
        setCreate(false)
        try {
            const response = await axios.get('http://localhost:5000/faculty/courseneedadminapproval');
            console.log(response.data[0].eligibleBatches);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data for main:', error);
        }
    }
        
    async function handleEnrollment(){
        setMain(false)
        setEnrollment(true)
        setCreate(false)
        try {
            const response = await axios.get('http://localhost:5000/faculty/studentneedapproval');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data for enrollment:', error);
        }
    }

    const handleCheckboxChange = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id)); // Unselect row
        } else {
            setSelectedRows([...selectedRows, id]); // Select row
        }
    };
    
    function handleClick(){
        setShow(!show)
    }

    const handleAction = async (action) => {
        try {
            // Send selected row IDs and action to the backend
            await axios.post('http://localhost:5000/faculty/changecoursestatus', {
                ids: selectedRows,
                action: action,
            });
            setShow(false)
            alert(`${action} action applied successfully`);
            setSelectedRows([]);
            handleEnrollment();
        } catch (error) {
            console.error(`Error applying ${action} action:`, error);
        }
    };
    
    
    return (
    
    <div className='mt-[2rem] ml-[4rem]'>
        <div className='flex '>
            <button onClick={handleCreate} className='pl-1 border border-gray-500 bg-gray-300' > New Courses Created </button>
            <button onClick={handleMain} className='pl-1 border border-gray-500 bg-gray-300' > OfferedCourses </button>
            <button onClick={handleEnrollment} className='pl-1 border border-gray-500 bg-gray-300' >Enrollment</button>
        </div>
        {create &&
            (
                <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                    <thead>
                    <tr>
                        <th className='font-light'>Course Code</th>
                        <th className='font-light'>Course Name</th>
                        <th className='font-light'>Department</th>
                        <th className='font-light'>L-T-P-S-C</th>
                        <th className='font-light'>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data&&data.map((d,index) => (
                            <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white hover:bg-gray-200'} >
                                <td>{d.courseCode}</td>
                                <td>{d.courseName}</td>
                                <td>{d.departmentName}</td>
                                <td>{d.ltpsc}</td>
                                <td className='font-semibold'>Needs Admin Approval</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        }

        {main &&
            (
                <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                    <thead>
                    <tr>
                        <th className='font-light'>Academic Session</th>
                        <th className='font-light'>Course Code</th>
                        <th className='font-light'>Eligible Batches</th>
                        <th className='font-light'>Max Seats</th>
                        <th className='font-light'>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data && data.map((d,index) => (
                            <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white hover:bg-gray-200'} >
                                <td>2024-I</td>
                                <td>{d.courseCode}</td>
                                <td> {d.eligibleBatches &&  d.eligibleBatches.map( (e)=> (
                                    <h1>{e}</h1>))} </td>
                                <td>{d.maxSeats} </td>
                                <td className='font-semibold'>{d.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        }
    
        {
            enrollment &&
            (
                <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                    <thead>
                    <tr>
                        <th className='font-light'>Academic Session</th>
                        <th className='font-light'>Course Code</th>
                        <th className='font-light'>Student Name</th>
                        <th className='font-light'>Batch-year</th>
                        <th className='font-light'>Department</th>
                        <th className='font-light'>Status</th>
                        <th className='font-light'>

                        <div className="relative">
                            <button
                            className="px-2 py-1 bg-orange-500 text-white rounded"
                            onClick={handleClick}>Action</button>
                            {show && < div
                            className="absolute right-0 mt-1 w-32 bg-white shadow-lg border "
                            style={{ zIndex: 1000 }}>
                                <button
                                className="block w-full px-2 py-1 hover:bg-gray-200 text-left"
                                onClick={() => handleAction('Approve')}>Approve</button>
                                <button
                                className="block w-full px-2 py-1 hover:bg-gray-200 text-left"
                                onClick={() => handleAction('Reject')}>Reject</button>
                            </div>}
                        </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {data && data.map((d, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white hover:bg-gray-200'}>
                                <td>{d.offeringId?.sessionId.academicYear || 'N/A'} {d.offeringId?.sessionId.phase || 'N/A'} </td>
                                <td>{d.offeringId?.courseCode || 'N/A'}</td>
                                <td>{d.studentId?.userId?.name || 'N/A'}</td>
                                <td>{d.studentId?.enrollmentYear || 'N/A'}</td>
                                <td>{d.studentId?.department || 'N/A'}</td>
                                <td className='font-semibold'>{d.status}</td>
                                <td className='flex gap-2'>
                                    <input type="checkbox"
                                        onChange={() => handleCheckboxChange(d._id)}
                                        checked={selectedRows.includes(d._id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

                

                
            )
        }
    </div>
    )

};

export default ActionPending;
