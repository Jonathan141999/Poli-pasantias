const publicRoutes = {
  LOGIN: '/ingreso',
  REGISTER: '/registro',
  USERS: '/usuarios',
  USERS_ID: `/usuario/:id`,
  //HOME: '/',
  EMAIL: '/activacion',
  LOGOUT: '/logout',
  PRIVATE: '/privada',
  CLIENTPRODUCTS: '/student-publications',
  OWNERPRODUCTS: '/bussines-publications',
  REGISTERPRODUCT: '/register-publications',
  DAILYORDER: '/daily-order',
  PROFILE: '/profile',
  NEWORDER: '/neworder',
  REPORTS: '/reports',

};

const privateRoutes = {
    
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes
};
export default Routes;