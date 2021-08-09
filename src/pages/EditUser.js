import React from 'react';
import {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import EditUser from "../components/EditUser";
import Layouts from '../components/Layout';
import '../theme/app.css';
import "../theme/toolbar.css";

const EditUserPage = () => {


    return    (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar id={"toolbar"}>
                        <div slot={"start"} className="menu">
                            <Layouts />
                        </div>
                        <IonTitle id={"letter"}>Actualizar Perfil</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <EditUser/>
            </IonPage>
        </>
    );
};

export default EditUserPage;