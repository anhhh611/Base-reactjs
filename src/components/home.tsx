import * as React from 'react';
import { IndexedObject } from '../utils/type';
import Footer from './User/footer';
import Header from './User/header';

const Home: React.FC<IndexedObject> = () => {
  return (
    <>
      <Header />
      <h1>Home page</h1>
      <div className="home-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2>SHOP</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="product-area">
        <div className="container"></div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
