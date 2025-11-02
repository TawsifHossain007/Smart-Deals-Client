import React, { use } from 'react';
import Product from '../Product/Product';

const LatestProducts = ({LatestProductsPromise}) => {
    const products = use(LatestProductsPromise)
    return (
        <div className='pt-20'>
              <h2 className="text-5xl text-center">Recent <span className='text-primary'>Products</span></h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
            {
                products.map(product=> <Product product={product} key={product._id}></Product>)
            }
        </div>
        </div>
        
    );
};

export default LatestProducts;