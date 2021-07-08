const publicRoutes = {
  LOGIN: '/ingreso',
  REGISTER: '/registro',
  USERS: '/usuarios',
  USERS_ID: `/usuario/:id`,
  //HOME: '/',
  EMAIL: '/activacion',
  PROFILE: '/profile', //esto va en privadas
  EDITPROFILE: '/edit-profile', //esto va en privadas
  LOGOUT: '/logout',
  PRIVATE: '/privada',
  CLIENTPRODUCTS: '/student-publications',
  OWNERPRODUCTS: '/bussines-publications',
  REGISTERPRODUCT: '/register-publications',
  DAILYORDER: '/daily-order',
  NEWORDER: '/neworder',
  REPORTS: '/reports',
};

const privateRoutes = {
  //LOGOUT: '/logout',
  //PRIVATE: '/privada',
  //CLIENTPRODUCTS: '/student-publications',
  //OWNERPRODUCTS: '/bussines-publications',
  //REGISTERPRODUCT: '/register-publications',
  //DAILYORDER: '/daily-order',
  //NEWORDER: '/neworder',
  //REPORTS: '/reports',
  //EDITPROFILE: '/edit-profile'    
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes
};
export default Routes;