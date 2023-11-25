import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AddProd () {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [category, setCategory] = useState('')
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8001/add', {name, price, stock, category})
        .then(res => {
            console.log(res);
            navigate('/');
        }).catch(err => console.log(err));
    }

  return (
    <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Add Product</h2>
                <div className='mb-2'>
                    <label htmlFor="">Name</label>
                    <input type='text' placeholder='Enter Product' className='form-control' onChange={e => setName(e.target.value)} required/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Price</label>
                    <input type='number' placeholder='Enter Price' className='form-control' onChange={e => setPrice(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="">Stock</label>
                    <input type='text' placeholder='Enter Stock' className='form-control' onChange={e => setStock(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="">Category</label><br/>
                    <select onChange={e => setCategory(e.target.value)} required>
                        <option>Select Category</option>
                        <option>Food</option>
                        <option>Beverages</option>
                    </select>
                </div>
                <br/><button className='btn btn-success'>Add</button>
                <Link to={'/'} className='btn btn-danger ms-2'>Cancel</Link>
            </form>
        </div>
      
    </div>
  )
}

export default AddProd;
