import React from 'react';
import {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import '../theme/app.css';
import "../theme/toolbar.css";
import Layouts from '../components/Layout';
import NewRequest from "../components/NewRequest";

const NewOrders = () => {
  return    (
    <>
        <IonPage>
            <IonHeader>
                <IonToolbar id={"toolbar"}>
                    <div slot={"start"} className="menu">
                        <Layouts />
                    </div>
                    <IonTitle id={"letter"}>Lista de Nuevas Publicaciones </IonTitle>
                </IonToolbar>
            </IonHeader>
            <NewRequest />
        </IonPage>
    </>
  );
};

export default NewOrders;

