import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@material-ui/core';
import { Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink, RouteComponentProps, useHistory } from 'react-router-dom';
import { Label } from 'recharts';
import { AppState } from '../../../../reducer';
import { createEntity } from '../../../../reducer/productReducer';
import { TProduct } from '../../../../type/types';
export interface IProductCreatedProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<{ id: string }> {}
function ProductAddEdit(props: IProductCreatedProps) {
  const [state, setState] = useState<TProduct>();
  const history = useHistory();
  const onSubmit = (e: any) => {
    console.log('event', state);
    props.createEntity(state);
    history.goBack();
    e.preventDefault();
  };

  const handleInputChange = (event: any) => {
    setState((prevProps: any) => ({
      ...prevProps,
      [event.target.name]: event.target.value,
    }));
  };

  const onChangeSellect = (event: any) => {
    setState((prevProps: any) => ({
      ...prevProps,
      categoryId: event.target.value,
    }));
  };
  return (
    <Grid container justify="center" alignContent="center">
      <Grid item xs={6} md={4}>
        <Paper elevation={4} style={{ padding: '20px 15px', marginTop: '30px' }}>
          <Typography variant="h4" gutterBottom>
            Product
          </Typography>
          <Form onSubmit={onSubmit} onChange={handleInputChange}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Product Name</InputLabel>
              <Input name="name" fullWidth value={state?.name} />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Price</InputLabel>
              <Input name="price" fullWidth type="number" value={state?.price} />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Quantity</InputLabel>
              <Input name="qty" fullWidth type="number" value={state?.qty} />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Description</InputLabel>
              <Input name="des" fullWidth value={state?.des} />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Category Name</InputLabel>
              <Select
                displayEmpty
                name="categoryId"
                labelId="categoryId"
                id="categoryId"
                value={state?.categoryId}
                onChange={onChangeSellect}
              >
                <MenuItem value="1">Basic</MenuItem>
                <MenuItem value="2">Advance</MenuItem>
                <MenuItem value="3">Enterprise</MenuItem>
              </Select>
              <FormControl fullWidth margin="normal">
                <InputLabel>Image URL</InputLabel>
                <Input name="url1" fullWidth />
              </FormControl>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <div className="wrapButton">
                <Button style={{ marginRight: '1em' }} color="primary" type="submit">
                  ADD
                </Button>
                <Button color="primary" type="submit">
                  <NavLink style={{ color: '#FFF', textDecoration: 'none' }} to="/AdminPage">
                    CANCEL
                  </NavLink>
                </Button>
              </div>
            </FormControl>
          </Form>
        </Paper>
      </Grid>
    </Grid>
  );
}
const mapStateToProps = (storeState: AppState) => ({
  products: storeState.product.entities,
});

const mapDispatchToProps = {
  createEntity,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(ProductAddEdit);
