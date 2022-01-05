import { Route, Switch } from 'react-router-dom';
import * as React from 'react';
// import { IndexedObject } from '../utils/type';
import PrivateRoute from './private-route';
import PublicRoute from './publicRoute';
import NoMatch from '../components/no_match';
import Home from '../components/home';
import RegisterPage from '../components/register';
import LoginPage from '../components/login';
import WelcomePage from '../components/User/welcome';
import Details from '../components/User/Details';
import Mainpage from '../components/Admin/Main/Mainpage';
import CategoryMainPage from '../components/Admin/Main/CategoryMainPage';
import ProductAddEdit from '../components/Admin/Main/ProductActionpage/ProductAddEdit';
import CategoryAddEdit from '../components/Admin/Main/ProductActionpage/CategoryAddEdit';
import { categoryUrl } from '../shared/constant/constant';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={WelcomePage} />
    <Route exact path="/details/:id" component={Details} />
    <Route exact path="/AdminPage" component={Mainpage} />
    <Route exact path="/ProductAddEdit" component={ProductAddEdit} />
    <Route exact path={categoryUrl} component={CategoryAddEdit} />
    <Route exact path="/admin/CategoryEdit/:categoryId" component={CategoryAddEdit} />
    <Route exact path="/admin/Category" component={CategoryMainPage} />
    <PublicRoute exact path="/login" component={LoginPage} />
    <PublicRoute exact path="/register" component={RegisterPage} />
    <PrivateRoute exact path="/home" component={Home} />
    <Route component={NoMatch} />
  </Switch>
);

export default Routes;
