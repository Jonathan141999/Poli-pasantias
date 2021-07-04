import React from 'react';
import {Route, Switch} from 'react-router-dom';
import loadable from '@loadable/component';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Routes from '../constants/routes';
import NotFoundPage from '../pages/NotFoundPage';
import Loading from '../components/Loading';
import {Redirect} from "react-router";

/**
 * El módulo loadable (https://loadable-components.com/docs/code-splitting/)
 * Permite dividir los componentes en diferentes "bundles" (archivos js compilados)
 * de esta manera la aplicación puede ir cargando los compoenentes bajo demanda.
 * Solo cargará los componentes que sean utilizados por el usuario.
 *
 * Esto acelera la carga de la aplicación ya que de lo contrario tendríamos un solo
 * bundle de gran tamaño y el navegador demoraría en descargarlo para renderizar la aplicación.
 *
 * @type {{fallback: JSX.Element}}
 */
const loadableOptions = {fallback: <Loading/>};

//const AsyncHome = loadable(() => import( '../pages/Index' ), loadableOptions);
const AsyncLogin = loadable(() => import( '../pages/Login' ), loadableOptions);
const AsyncClientProducts = loadable(() => import( '../pages/ClientProducts' ), loadableOptions);
const AsyncOwnerProducts = loadable(() => import( '../pages/OwnerProducts' ), loadableOptions);
const AsyncRegister = loadable(() => import ('../pages/RegisterUser'),loadableOptions);
const AsyncRegisterProduct = loadable(() => import ('../pages/RegisterProduct'),loadableOptions);
const AsyncDailyOrder = loadable(() => import('../pages/DailyOrdersClient' ), loadableOptions);
const AsyncLogout = loadable(() => import( '../pages/Logout' ), loadableOptions);
const AsyncProfile = loadable(() => import( '../pages/Profile' ), loadableOptions);
const AsyncEmail = loadable(() => import( '../pages/Email' ), loadableOptions);
const AsyncNewOrder = loadable(() => import('../pages/NewOrders'), loadableOptions);
const AsyncReports = loadable(() => import('../pages/Reports'), loadableOptions);
const AsyncEditUser = loadable(() => import('../pages/EditUser'), loadableOptions);

/**
 * Este es el componente que se encarga de renderizar el componente adecuado
 * de acuerdo a la ruta en la que se encuentra el navegador.
 * <Switch> https://reactrouter.com/web/api/Switch
 * <PublicRoute> Utilizado para las páginas que son accesibles por todos los usuarios.
 * <PrivateRoute> Utilizado para lás páginas que son protegidas,
 *                este componente valida si existe una sesión activa.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const AppRouter = () => (
    <Switch>
        <Route exact path="/">
            <Redirect to="/ingreso" />
        </Route>

        <PublicRoute path={Routes.LOGIN} component={AsyncLogin}/>
        <PublicRoute path={Routes.REGISTER} component={AsyncRegister}/>
        <PublicRoute path={Routes.EMAIL} component={AsyncEmail}/>

        <PrivateRoute path={Routes.DAILYORDER} component={AsyncDailyOrder}/>
        <PrivateRoute path={Routes.PROFILE} component={AsyncProfile}/>
        <PrivateRoute path={Routes.CLIENTPRODUCTS} component={AsyncClientProducts}/>
        <PrivateRoute path={Routes.OWNERPRODUCTS} component={AsyncOwnerProducts}/>
        <PrivateRoute path={Routes.REGISTER} component={AsyncRegister}/>
        <PrivateRoute path={Routes.LOGOUT} component={AsyncLogout}/>
        <PrivateRoute path={Routes.REGISTERPRODUCT} component={AsyncRegisterProduct}/>
        <PrivateRoute path={Routes.NEWORDER} component={AsyncNewOrder}/>
        <PrivateRoute path={Routes.REPORTS} component={AsyncReports}/>
        <PrivateRoute path={Routes.EDITPROFILE} component={AsyncEditUser}/>

        <Route component={NotFoundPage}/>
    </Switch>
);

export default AppRouter;
