import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { productApi } from '../../application/api/productsApi';
import { TProduct } from '../../type/types';

export const initialProduct: TProduct = {
  id: 0,
  name: '',
  category: '',
  categoryId: 0,
  price: 0,
  des: '',
  qty: 0,
  url1: '',
  url2: '',
};
type TProps = {
  listProduct: TProduct[];
};

function HomeList(props: TProps) {
  const [products, setProducts] = useState([]);
  // console.log(products);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        //gọi productApi : từ component sử dụng file api, từ api sẽ gọi axiosClient
        const response = await productApi.getAll(params);
        // console.log('response', response);
        setProducts(response.data);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
    };

    fetchProductList();
  }, []);

  const [pageNumber, setPageNumber] = useState(0);

  const productsPerPage = 8;
  const pagesVisited = pageNumber * productsPerPage;

  const displayProducts = products
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((post: TProduct) => {
      return (
        <div key={post.id} className="col-md-3 col-sm-6">
          {/* <div className="single-product">
            <Link to={'/details/' + post.id}>
              <img src={post.url1} alt="" />
            </Link>
            <div className={`product-name ${post.id}`}>
              <Link to={'/details/' + post.id}>{post.name}</Link>
            </div>
            <span>${post.price}</span>
            <div className="product-option">
              <a className="add_to_cart_button" href="#">
                Add to cart
              </a>
            </div>
          </div> */}

          <div className="single-product">
            <Link to={'/details/' + post.id}>
              <Link to={'/details/' + post.id}>
                <img src={post.url1} alt="" />
              </Link>
              <div className={`product-name ${post.id}`}>{post.name}</div>
              <span>${post.price}</span>
              <div className="product-option">
                <a className="add_to_cart_button" href="#">
                  Add to cart
                </a>
              </div>
            </Link>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected = 1 }) => {
    setPageNumber(selected);
  };

  return (
    <div className="row">
      {displayProducts}
      <ReactPaginate
        previousLabel={'«'}
        nextLabel={'»'}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={'paginationBttns'}
        previousLinkClassName={'previousBttn'}
        nextLinkClassName={'nextBttn'}
        disabledClassName={'paginationDisabled'}
        activeClassName={'paginationActive'}
        pageRangeDisplayed={10}
        marginPagesDisplayed={10}
      />
    </div>
  );
}

export default HomeList;
function params(params: any) {
  throw new Error('Function not implemented.');
}
