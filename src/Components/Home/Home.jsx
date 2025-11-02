import React from 'react';
import LatestProducts from '../LatestProducts/LatestProducts';

const LatestProductsPromise = fetch('http://localhost:3100/latest-products').then(res=>res.json())

const Home = () => {
    return (
        <div className='bg-gray-100'>
            <LatestProducts LatestProductsPromise={LatestProductsPromise}></LatestProducts>
        </div>
    );
};

export default Home;