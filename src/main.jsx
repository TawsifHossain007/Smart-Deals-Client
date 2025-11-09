import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Layout/RootLayout';
import Home from './Components/Home/Home';
import AllProducts from './Components/AllProducts/AllProducts';
import AuthProvider from './Context/AuthProvider';
import Register from './Components/Register/Register';
import MyProducts from './Components/MyProducts/MyProducts';
import MyBids from './Components/MyBids/MyBids';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CreateProduct from './Components/CreateProduct/CreateProduct';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index:true,
        Component: Home
      },
      {
        path: '/allProducts',
        Component: AllProducts
      },
      {
        path: "/register",
        Component: Register
      },
      {
        path: "/myproducts",
        Component: MyProducts
      },
      {
        path: "/mybids",
        Component: MyBids
      },
      {
        path: "/productDetails/:id",
        loader: ({params}) => fetch(`http://localhost:3100/latest-products/${params.id}`),
        Component: ProductDetails
      },
      {
        path: "/createProducts",
        Component: CreateProduct
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
      <RouterProvider router={router} />
     </AuthProvider>
  </StrictMode>,
)
