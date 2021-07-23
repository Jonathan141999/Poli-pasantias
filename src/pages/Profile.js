import React from 'react';
import Routes from '../constants/routes';
import {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardSubtitle,
    IonCardHeader,
    IonCardTitle,
    IonImg,
    IonButton
} from "@ionic/react";
import {Link} from 'react-router-dom';
import { Form, Input, message, Select} from 'antd';
import '../theme/app.css';
import "../theme/toolbar.css";
import Layouts from '../components/Layout';
import user from '../images/user.png';
import {useAuth} from '../providers/Auth';

const Profile = () => {
  const {currentUser} = useAuth();
  return    (
    <>
        <IonPage>
            <IonHeader>
                <IonToolbar id={"toolbar"}>
                    <div slot={"start"} className="menu">
                        <Layouts />
                    </div>
                    <IonTitle id={"letter"}>Perfil de Usuario </IonTitle>
                </IonToolbar>
            </IonHeader>
          <IonCard>
          <IonImg  src={user} style={{width:"150px", height:"150px"}}/>
          <IonCardHeader>
          <IonCardTitle>Nombre: {currentUser.name}</IonCardTitle>
            <IonCardTitle>Apellido: {currentUser.last_name}</IonCardTitle>
            <IonCardSubtitle>Telefóno: {currentUser.phone}</IonCardSubtitle>
            <IonCardSubtitle>Correo: {currentUser.email}</IonCardSubtitle>
            <IonCardSubtitle>Dirección: {currentUser.direction}</IonCardSubtitle>
            <IonCardSubtitle>Descripcion:  {currentUser.description}</IonCardSubtitle>
        
            {currentUser.role==='ROLE_BUSINESS' || currentUser.role==='ROLE_ADMIN'
            ?<IonCardSubtitle>Empresa</IonCardSubtitle>
            :<IonCardSubtitle>Estudiante de la Escuela Politécnica Nacional</IonCardSubtitle>
            }
            <Form.Item>
              <Link to={ Routes.EDITPROFILE}>
                <IonButton type='primary'>
                    Actualizar Perfil
                </IonButton>
              </Link>
            </Form.Item>
          </IonCardHeader>
        </IonCard>
        </IonPage>
    </>
  );
};
                  
export default Profile;