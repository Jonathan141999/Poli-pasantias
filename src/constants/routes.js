const publicRoutes = {
  LOGIN: '/ingreso',
  REGISTER: '/registro',
  USERS: '/usuarios',
  USERS_ID: `/usuario/:id`,
  //HOME: '/',
  EMAIL: '/activacion',
  //LOGOUT: '/logout',
  //PRIVATE: '/privada',
  //CLIENTPRODUCTS: '/student-publications',
  //OWNERPRODUCTS: '/bussines-publications',
  //REGISTERPRODUCT: '/register-publications',
  //DAILYORDER: '/daily-order',
  //NEWORDER: '/neworder',
  //REPORTS: '/reports',
  EDITPROFILE: '/edit-profile',
  POSTULATION: '/postulation'
};

const privateRoutes = {
  LOGOUT: '/logout',
  PRIVATE: '/privada',
  CLIENTPRODUCTS: '/student-publications',
  OWNERPRODUCTS: '/bussines-publications',
  REGISTERPRODUCT: '/register-publications',
  DAILYORDER: '/daily-order',
  NEWORDER: '/neworder',
  REPORTS: '/reports',
  PROFILE: '/profile',
  EDITPROFILE: '/edit-profile' 
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes
};
export default Routes;