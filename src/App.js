import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Product from './Product';
import AddProd from './AddProd';
import UpdateProd from './UpdateProd';


const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Product />}></Route>
        <Route path='/add' element={<AddProd />}></Route>
        <Route path='/update/:id' element={<UpdateProd />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
