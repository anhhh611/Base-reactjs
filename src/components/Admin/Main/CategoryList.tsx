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
import { TCategory } from '../../../type/types';
import axios from 'axios';
import { callAPI } from '../../../shared/utils/apiCaller';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { AppState } from '../../../reducer';
import { deleteEntity, getAllCategories } from '../../../reducer/categoryReducer';
import { connect } from 'react-redux';
import { categoryUrl, HomePath } from '../../../shared/constant/constant';
import { IndexedObject } from '../../../utils/type';

export interface IPropsType
  extends StateProps,
    TProps,
    DispatchProps,
    RouteComponentProps<IndexedObject> {}

type TProps = {
  confirmDele: (id: number) => void;
};

const CategoryList: React.FC<IPropsType> = (props) => {
  useEffect(() => {
    props.getAllCategories();
  }, []);

  const confirmDelete = (id: number) => {
    const conf = window.confirm('Xóa đi, xóa mạnh vào');
    if (conf) {
      props.confirmDele(id);
    }
  };

  const { categories } = props;

  return (
    <React.Fragment>
      <div className="mx-1">
        <Button
          className="btn px-3 "
          variant="outlined"
          color="primary"
          startIcon={<AddCircleIcon />}
        >
          <NavLink to={categoryUrl}>Add new category</NavLink>
        </Button>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell align="right">
                <Button
                  style={{ marginRight: '1em' }}
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => confirmDelete(category.id)}
                >
                  Delete
                </Button>

                <NavLink
                  style={{ color: '#FFF', textDecoration: 'none' }}
                  to={`CategoryEdit/${category.id}`}
                >
                  <Button
                    style={{ paddingLeft: '2em', paddingRight: '2em', color: '#fff' }}
                    variant="contained"
                    startIcon={<Edit />}
                  >
                    Edit {HomePath}
                  </Button>
                </NavLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <Link color="primary" href="javascript:;">
          phân trang
        </Link>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (storeState: AppState) => ({
  categories: storeState.category.entities,
});

const mapDispatchToProps = {
  getAllCategories,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
