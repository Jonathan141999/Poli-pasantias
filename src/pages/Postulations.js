import React from 'react';
import {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
//import Postulation from "../components/Postulation";
import '../theme/app.css';
import Layouts from '../components/Layout';
import '../theme/toolbar.css';
import Postulation from '../components/Postulation';



const PostulationsPage = () => {


    return    (
        <>
        <IonPage>
            <IonHeader >
                <IonToolbar id={"toolbar"}>
                        <div slot={"start"} className="menu">
                            <Layouts />
                        </div>
                        <IonTitle id={"letter"}>Postulación </IonTitle>
                    </IonToolbar>
            </IonHeader>
            <Postulation/>
        </IonPage>
    </>
    )};

export default PostulationsPage;