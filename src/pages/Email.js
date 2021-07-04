import React from 'react';
import {
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonImg,
  IonButton,
} from "@ionic/react";
import logo from '../images/logo.png';
import {Link} from 'react-router-dom';
import Routes from '../constants/routes';
import '../theme/app.css';
import {mailUnreadOutline} from "ionicons/icons";

const EmailPage = () => (
  <>
    <IonPage>
          <IonHeader >
              <IonToolbar>
                <IonToolbar> 
                  <IonTitle slot="start">Confirmación de Email </IonTitle>
                </IonToolbar>
              </IonToolbar>
          </IonHeader>
        <IonIcon icon={mailUnreadOutline} style={{width:"100px", height:"100px", display:"block", margin:"auto" }} />
          <IonLabel style={{'text-align':"center"}} color="dark">
            <h2>¡Gracias por Suscribirte!</h2>
            <br/>
            <p>Para Usar la Aplicacion</p>
            <p>Debes confirmar tu direccion de correo-electronico registrado</p>
            <p>A tu CORREO debió llegar un enlace</p>
            <br/>
            <p>Cuando lo confirmes podrás Iniciar Sesión</p>
            <br/>
            <p>Atentamente,</p>
          </IonLabel>  
          <br/>
          <IonImg src={logo} style={{width:"50px", height:"50px", display:"block", margin:"auto"}}/>
          <br/>
          <Link to={Routes.LOGOUT}><IonButton style={{width:"200px", height:"30px", display:"block", margin:"auto"}}>Regresar al Inicio</IonButton></Link>
          
    </IonPage>
  </>
);

export default EmailPage;
