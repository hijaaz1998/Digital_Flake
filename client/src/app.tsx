import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import Dashboard from './components/Dashboard'
import CategoryTable from './components/CategoryTable'
import SubcategoryTable from './components/SubCategoryTable'
import ProductTable from './components/ProductTable'
import AddCategory from './components/AddCategory'
import AddProduct from './components/AddProduct'
import AddSubcategory from './components/AddSubCategory'

const App = () => {
  return (
    <>
      <Router>
        <Routes>

          <Route path='/' element={ <LoginPage /> }/>
          <Route path='/signup' element={ <SignupPage /> }/>

          <Route path='/home' element={ <HomePage children={ <Dashboard/> } /> }/>
          <Route path='/category' element={ <HomePage children={ <CategoryTable/> } /> }/>
          <Route path='/subcategory' element={ <HomePage children={ <SubcategoryTable/> } /> }/>
          <Route path='/products' element={ <HomePage children={ <ProductTable/> } /> }/>
          <Route path='/add_category' element={ <HomePage children={ <AddCategory/> } /> }/>
          <Route path='/add_product' element={ <HomePage children={ <AddProduct/> } /> }/>
          <Route path='/add_subcategory' element={ <HomePage children={ <AddSubcategory/> } /> }/>
        </Routes>
      </Router>
    </>
  )
}

export default App