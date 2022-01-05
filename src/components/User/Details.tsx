import React, { useEffect, useState } from 'react';
import Header from './header';
import Footer from './footer';
import { TProduct } from '../../type/types';
import { productApi } from '../../application/api/productsApi';
import { useParams } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setProducts] = useState<TProduct>();

  console.log('id', id);

  useEffect(() => {
    // console.log('ádasdadasd');
    const fetchProduct = async () => {
      try {
        //gọi productApi : từ component sử dụng file api, từ api sẽ gọi axiosClient
        const response = await productApi.get(id);
        console.log('response', response.data.data);
        setProducts(response.data);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
    };
    fetchProduct();
  }, []);

  // useEffect(() => {
  //   const getAll = async () => {
  //     const actionResults = await dispatch(getCategories());
  //   };
  //   getAll();
  // }, []);
  // const categories = useSelector((state: RootStateOrAny) => state.categories);
  // const idtoName = categories.currentCategory.filter((val: any) => val.id == post?.categoryId);

  return (
    <>
      <Header />

      <div key={post?.id} className="detail container px-lg-5">
        <div className="row mx-lg-n5 frameDetail">
          <div className="col py-3 px-lg-5 ">
            <div className="subNav">
              <a className="subNavText" href="/">
                Home
              </a>
              /
              <a className="subNavText" href="/">
                {post?.categoryId}
              </a>
              /
              <a className="subNavText" href="/">
                {post?.name}
              </a>
            </div>
            <img className="imgPramary" src={post?.url1} alt="" />
            <div>
              <img className="imgItem" src={post?.url2} alt="" />
            </div>
          </div>
          <div className="col py-3 px-lg-5 ">
            <div>
              <h1 className="productName">{post?.name}</h1>
            </div>
            <div>
              <p className="productPrice">${post?.price}</p>
            </div>
            <form action="index.html" className="cart">
              <div className="quantity">
                <input
                  type="number"
                  size={4}
                  className="input-text qty text "
                  title="Qty"
                  defaultValue={1}
                  name="quantity"
                  min={1}
                  step={1}
                />
              </div>
              <button className="add_to_cart_button" type="submit">
                ADD TO CART
              </button>
            </form>
            <div className="select">
              <p>
                Category:
                <a className="selectLink" href="index.html">
                  {post?.categoryId}
                </a>
                Tags:
                <a className="selectLink" href="index.html">
                  awesome
                </a>
                ,
                <a className="selectLink" href="index.html">
                  best
                </a>
                ,
                <a className="selectLink" href="index.html">
                  sale
                </a>
                ,
                <a className="selectLink" href="index.html">
                  shoes.
                </a>
              </p>
            </div>
            <ul className="product-tab" role="tablist">
              <li role="presentation" className="active">
                <a
                  className="presentationText"
                  href="#home"
                  aria-controls="home"
                  role="tab"
                  data-toggle="tab"
                >
                  Description
                </a>
              </li>
              <li role="presentation">
                <a
                  className="presentationText"
                  href="#profile"
                  aria-controls="profile"
                  role="tab"
                  data-toggle="tab"
                >
                  Reviews
                </a>
              </li>
            </ul>
            <div className="contentProduct">
              <h1 className="descriptionText">Product Description</h1>
              <p className="textContentProduct">{post?.des}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Details;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
