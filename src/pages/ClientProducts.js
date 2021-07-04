import React from 'react';
import {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import ProductClientList from "../components/ProductClientList";
import '../theme/app.css';
import Layouts from '../components/Layout';
import '../theme/toolbar.css';



const ClientProductsPage = () => {


    return    (
        <>
        <IonPage>
            <IonHeader >
                <IonToolbar id={"toolbar"}>
                        <div slot={"start"} className="menu">
                            <Layouts />
                        </div>
                        <IonTitle id={"letter"}>Lista de Publicaciones </IonTitle>
                    </IonToolbar>
            </IonHeader>
            <ProductClientList/>
        </IonPage>
    </>
    )};

export default ClientProductsPage;
