import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Product () {
    const [product, setProduct] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8001/')
        .then(res => setProduct(res.data))
        .catch(err => console.log(err));
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete('http://localhost:8001/product/'+id)
            window.location.reload()
        }catch(err) {
            console.log(err);
        }
    }

  return (
    <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>
      <div className='w-80 bg-white rounded p-3'>
            <Link to="/add" className='btn btn-success'>Add</Link>
            <table className='table'>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.map((data, i)=> (
                            <tr key={i}>
                                <td>{data.Id}</td>
                                <td>{data.Name}</td>
                                <td>{data.Price}</td>
                                <td>{data.Stock}</td>
                                <td>{data.Category}</td>
                                <td>
                                    <Link to={`update/${data.Id}`}className='btn btn-primary'>Update</Link>
                                    <button className='btn btn-danger ms-2' onClick={e => handleDelete(data.Id)}>Delete</button>
                                </td>
                            </tr>
                        ))

                    }  
                </tbody>
            </table>
      </div>
    </div>
  )
}


export default Product;
