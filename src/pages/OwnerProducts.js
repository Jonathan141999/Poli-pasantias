import React from 'react';
import {
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import ProductOwnerList from "../components/ProductOwnerList";
import Layouts from '../components/Layout';
import '../theme/app.css';
import "../theme/toolbar.css";

const OwnerProductsPage = () => {


    return    (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar id={"toolbar"}>
                        <div slot={"start"} className="menu">
                            <Layouts />
                        </div>
                        <IonTitle id={"letter"}>Publicaciones </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ProductOwnerList/>
            </IonPage>
        </>
    );
};

export default OwnerProductsPage;
