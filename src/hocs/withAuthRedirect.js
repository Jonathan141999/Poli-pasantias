/**
 * Created by chalosalvador on 8/16/20
 */
 import { useAuth } from '../providers/Auth';
 import Loading from '../components/Loading';
 import React from 'react';
 import { Redirect } from 'react-router-dom';
 import Routes from '../constants/routes';
 
 /**
  * Support client-side conditional redirecting based on the user's
  * authenticated state.
  *
  * @param WrappedComponent The component that this functionality
  * will be added to.
  * @param LoadingComponent The component that will be rendered while
  * the auth state is loading.
  * @param expectedAuth Whether the user should be authenticated for
  * the component to be rendered.
  * @param location The location to redirect to.
  */
 export default function withAuthRedirect( {
   WrappedComponent,
   LoadingComponent = Loading,
   expectedAuth,
   location
 } ) {
   const WithAuthRedirectWrapper = props => {
 
     const { currentUser, isCheckingAuth, isAuthenticated } = useAuth();
     if( isCheckingAuth ) {
       return <LoadingComponent />;
     }
     if( expectedAuth !== isAuthenticated ) {
       if(!expectedAuth){
         if (currentUser.active){
           if (currentUser.role==='ROLE_STUDENT' || currentUser.role==="ROLE_STUDENT"){
             return <Redirect to={ {
               pathname: Routes.CLIENTPRODUCTS,
               state: { from: props.location }
           } } />
           }
           if (currentUser.role==="ROLE_BUSINESS" || currentUser.role==='ROLE_ADMIN'){
             return <Redirect to={ {
               pathname: Routes.OWNERPRODUCTS,
               state: { from: props.location }
           } } />
           }
         }else{
           return <Redirect to={ {
             pathname: Routes.EMAIL,
             state: { from: props.location }
           } } />
         }
       }else{
         return <Redirect to={ {
             pathname: Routes.LOGIN,
             state: { from: props.location }
         } } />
       }
     }
     return <WrappedComponent { ...props } />;
   };
   return WithAuthRedirectWrapper;
 }