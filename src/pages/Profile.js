import React from 'react';
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
} from "@ionic/react";
import '../theme/app.css';
import "../theme/toolbar.css";
import Layouts from '../components/Layout';
import user from '../images/avatar.png';
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
            {currentUser.role==='ROLE_BUSINESS'
            ?<IonCardSubtitle>Empresa</IonCardSubtitle>
            :<IonCardSubtitle>Estudiante de la Escuala Politécnica Nacional</IonCardSubtitle>
            }
          </IonCardHeader>
        </IonCard>
        </IonPage>
    </>
  );
};

export default Profile;