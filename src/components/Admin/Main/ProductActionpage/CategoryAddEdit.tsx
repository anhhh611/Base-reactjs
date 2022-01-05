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
import { useEffect, useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink, RouteComponentProps, useHistory, useParams } from 'react-router-dom';
import { Label } from 'recharts';
import { AppState } from '../../../../reducer';
import { createEntity, updateEntity, getEntity } from '../../../../reducer/categoryReducer';
import { TCategory } from '../../../../type/types';

export interface ICategoryCreatedProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<{ categoryId: string }> {}

function CategoryAddEdit(props: ICategoryCreatedProps) {
  const history = useHistory();
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.categoryId);
  const { category } = props;
  console.log('isNew', props.match.params.categoryId);
  const saveEntity = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);

    const entity = {
      name: formDataObj.name,
    } as TCategory;

    if (isNew) {
      props.createEntity(entity);
    } else {
      props.updateEntity(entity);
    }
    history.replace('/admin/category');
  };
  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.categoryId);
    }
  }, []);
  return (
    <Grid container justify="center" alignContent="center">
      <Grid item xs={6} md={4}>
        <Paper elevation={4} style={{ padding: '20px 15px', marginTop: '30px' }}>
          <Typography variant="h4" gutterBottom>
            Category
          </Typography>
          <Form onSubmit={saveEntity}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Category Name</InputLabel>
              <Input id="name" name="name" fullWidth value={isNew ? '' : category?.name} />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <div>
                <Button
                  style={{
                    paddingLeft: '2em',
                    paddingRight: '2em',
                    marginRight: '1em',
                    marginLeft: '11em',
                  }}
                  color="primary"
                  type="submit"
                >
                  {isNew ? 'Add' : 'Edit'}
                </Button>
                <Button type="submit">
                  <NavLink style={{ color: '#FFF', textDecoration: 'none' }} to="/admin/category">
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
  categories: storeState.category.entities,
  updating: storeState.category.updating,
  category: storeState.category.entity,
});

const mapDispatchToProps = {
  createEntity,
  updateEntity,
  getEntity,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAddEdit);
