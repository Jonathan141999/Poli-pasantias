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
                  <IonTitle slot="start">Poli Pasantias</IonTitle>
                </IonToolbar>
              </IonToolbar>
          </IonHeader>
        <IonIcon icon={mailUnreadOutline} style={{width:"100px", height:"100px", display:"block", margin:"auto" }} />
          <IonLabel color="dark">
            <div style={{padding:"10px"}}>
              <h2 style={{'text-align':"center"}} >Confirmación de Email</h2>
              <br/>
              <p>Para utilizar la Aplicación</p>
              <p>Debes confirmar tu direccion de correo-electronico registrado</p>
              <p>A tu Correo debió llegar un enlace para confirmar tu cuenta</p>
              <br/>
              <p>Cuando lo confirmes podrás Iniciar Sesión</p>
              <br/>
            <p style={{'text-align':"center"}}>Atentamente, Poli Pasantias</p>
            </div>
          </IonLabel>  
          <Link to={Routes.LOGOUT}><IonButton style={{width:"200px", height:"30px", display:"block", margin:"auto"}}>Regresar al Inicio</IonButton></Link>
          
    </IonPage>
  </>
);

export default EmailPage;