import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from './pages/HomePage'
import Dashboard from './components/Dashboard'
import CategoryTable from './components/CategoryTable'
import SubcategoryTable from './components/SubCategoryTable'
import ProductTable from './components/ProductTable'
import AddCategory from './components/AddCategory'
import AddProduct from './components/AddProduct'
import AddSubcategory from './components/AddSubCategory'
import EditSubcategory from './components/EditSubCategory'
import EditCategory from './components/EditCategory'
import EditProduct from './components/EditProduct'
import { PrivateRoutes } from './components/PrivateRoute'
import AuthPage from './pages/AuthPage'

const App = () => {
  return (
    <>
      <Router>
        <Routes>

          <Route path='/' element={ <AuthPage /> }/>
          <Route path='/signup' element={ <AuthPage /> }/>
          <Route path='/forgot_password' element={ <AuthPage /> }/>

          <Route element={ <PrivateRoutes />}>
            <Route path='/home' element={ <HomePage children={ <Dashboard/> } /> }/>
            <Route path='/category' element={ <HomePage children={ <CategoryTable/> } /> }/>
            <Route path='/subcategory' element={ <HomePage children={ <SubcategoryTable/> } /> }/>
            <Route path='/products' element={ <HomePage children={ <ProductTable/> } /> }/>
            <Route path='/add_category' element={ <HomePage children={ <AddCategory/> } /> }/>
            <Route path='/add_product' element={ <HomePage children={ <AddProduct/> } /> }/>
            <Route path='/add_subcategory' element={ <HomePage children={ <AddSubcategory/> } /> }/>
            <Route path='/edit_subcategory/:id' element={ <HomePage children={ <EditSubcategory/> } /> }/>
            <Route path='/edit_category/:id' element={ <HomePage children={ <EditCategory/> } /> }/>
            <Route path='/edit_product/:id' element={ <HomePage children={ <EditProduct/> } /> }/>
          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App