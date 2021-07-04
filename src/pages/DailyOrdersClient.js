import React from 'react';
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Layouts from "../components/Layout";
import RequestsByUser from "../components/RequestsByUser";
import "../theme/toolbar.css";


const DailyOrdersClient = () => {
  return    (
      <>
        <IonPage>
          <IonHeader >
            <IonToolbar id={"toolbar"}>
              <div slot={"start"} className="menu">
                <Layouts />
              </div>
              <IonTitle id={"letter"} slot={"primary"}> Lista de Publiaciones Nuevas</IonTitle>
            </IonToolbar>
          </IonHeader>
        </IonPage>
        <RequestsByUser />

      </>
  )
};

export default DailyOrdersClient;




