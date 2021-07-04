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
            <IonCardSubtitle>Correo:  {currentUser.email}</IonCardSubtitle>
            <IonCardSubtitle>Casa:  {currentUser.home_number}</IonCardSubtitle>
            {currentUser.role==='ROLE_ADMIN'
            ?<IonCardSubtitle>Propietario de la Tienda Víveres Daniela</IonCardSubtitle>
            :<IonCardSubtitle>Arrendatario del Conjunto Luluncoto</IonCardSubtitle>
            }
          </IonCardHeader>
        </IonCard>
        </IonPage>
    </>
  );
};

export default Profile;