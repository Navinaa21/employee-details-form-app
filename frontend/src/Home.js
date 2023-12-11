import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from'react-router-dom';
import './Style.css';


function Home() {
    const [ID, setID] = useState('')
    const [Name, setName] = useState('')
    const [Designation, setDesignation] = useState('')
    const [Salary, setSalary] = useState('')
    const [DOB, setDOB] = useState('')
    const navigate=useNavigate();
    const handleSubmit = (event) =>{
        console.log(ID,Name,Designation,Salary,DOB);
        event.preventDefault();
        axios.post('http://localhost:8081/',{ID,Name,Designation,Salary,DOB})
        .then(res =>{
            navigate('/');
        }).catch(err => console.log(err));
    }
    const [data,setData]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:8081/')
        .then(res => setData(res.data))
        .catch(err => console.log(err));   
    })

    const handleDelete=(ID)=>{
        axios.delete('http://localhost:8081/'+ID)
        .then(res => navigate('/'))
        .catch(err => console.log(err));
    }
  return (
    <div>
        <div className='container'>
                    <form onSubmit={handleSubmit}>
                        <h1>Employee Details</h1>
                        <div className='inputs'>
                            <div className='name'>ID</div>
                            <div classname='inputs'>
                                <input type='text' placeholder='Enter employee id' onChange={e => setID(e.target.value)}/>
                            </div>
                        </div>
                        <div className='inputs'>
                            <div className='name'>Name</div>
                            <div classname='inputs'>
                                <input type='text' placeholder='Enter Name' onChange={e => setName(e.target.value)}/>
                            </div>
                        </div>
                        <div className='inputs'>
                            <div className='name'>Designation</div>
                            <div classname='inputs'>
                                <input type='text' placeholder='Enter Designation' onChange={e => setDesignation(e.target.value)}/>
                            </div>
                        </div>
                        <div className='inputs'>
                            <div className='name'>Salary</div>
                            <div classname='inputs'>
                                <input type='text' placeholder='Enter Salary' onChange={e => setSalary(e.target.value)} />
                            </div>
                        </div>
                        <div className='inputs'>
                            <div className='name'>DOB</div>
                            <div classname='inputs'>
                                <input type='text' placeholder='YYYY-MM-DD' onChange={e => setDOB(e.target.value)}/>
                            </div>
                        </div>
                        <div>
                            <button >Submit</button>
                        </div>
                    </form>
                </div>
        <div id="tab" className='container'>
            <div className='main'>
                <h1> Employee Details Table</h1>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <div></div>
                            <th>Name</th>
                            <div></div>
                            <th>Designation</th>
                            <div></div>
                            <th>Salary</th>
                            <div></div>
                            <th>DOB</th>
                            <div></div>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map( (d ,i) => (
                            <tr>
                                <td>{d.ID}</td>
                                <div></div>
                                <td>{d.Name}</td>
                                <div></div>
                                <td>{d.Designation}</td>
                                <div></div>
                                <td>{d.Salary}</td>
                                <div></div>
                                <td>{d.DOB}</td>
                                <div></div>
                                <td>
                                    <button onClick={e=>handleDelete(d.ID)}>Delete</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div> 
    </div>
  )
}
export default Home