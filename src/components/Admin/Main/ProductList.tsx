import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/EditOutlined';
import Button from '@mui/material/Button';
import axios from 'axios';
import { TProduct } from '../../../type/types';
import { callAPI } from '../../../shared/utils/apiCaller';
import { NavLink } from 'react-router-dom';
// Generate Order Data
const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function ProductList() {
  const [products, setProducts] = useState<TProduct[]>();
  //let { products } = this.state;
  useEffect(() => {
    callAPI('products2', 'GET', null).then((res: any) => {
      console.log('res.data', res.data);
      setProducts(res.data);
    });
  }, []);
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className="mx-1">
        <Button
          className="btn px-3 "
          variant="outlined"
          color="primary"
          startIcon={<AddCircleIcon />}
        >
          <NavLink to="/ProductAddEdit"> Add new product</NavLink>
        </Button>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>
                <img src={product.url1} />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.categoryId}</TableCell>
              <TableCell>{product.qty}</TableCell>
              <TableCell align="inherit">
                <Button
                  style={{ marginRight: '1em' }}
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
                <Button
                  style={{ paddingLeft: '2em', paddingRight: '2em' }}
                  variant="contained"
                  startIcon={<Edit />}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          phân trang
        </Link>
      </div>
    </React.Fragment>
  );
}
function props(props: any) {
  throw new Error('Function not implemented.');
}
