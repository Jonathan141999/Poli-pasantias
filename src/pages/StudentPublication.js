import React, { useState, useEffect } from 'react';
import {
    IonHeader, IonIcon, IonPopover,
    IonPage, IonCol, IonList,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonItem,
} from "@ionic/react";
import ProductClientList from "../components/ProductClientList";
import '../theme/app.css';
import Layouts from '../components/Layout';
import '../theme/toolbar.css';
import { useRequestsByUser } from "../data/useRequestsByUser";
import { notifications } from "ionicons/icons";

const ClientProductsPage = () => {

    const { requestsByUser } = useRequestsByUser();
    const [data, setData] = useState([]);
    const [popoverState, setPopoverState] = useState(false);
    const [newState, setNewState] = useState(true);

    useEffect(() => {
        if (requestsByUser && newState) {
            const newData = requestsByUser.filter(i => i.status === 'new');
            console.log('nueva lon ', newData.length);
            setData(newData);
            setNewState(false);
        }
    });

    console.log("Postulaciones por estudiante", requestsByUser);

    const handleStatus = () => {
        setPopoverState(true);
    }

    return (
        <>
            <IonPage>
                <IonHeader >
                    <IonToolbar id={"toolbar"}>
                        <div slot={"start"} className="menu">
                            <Layouts />
                        </div>
                        <IonTitle id={"letter"}>Publicaciones </IonTitle>
                        {data.length > 0
                            ? <IonIcon slot={"end"} onClick={handleStatus} icon={notifications} style={{ color: 'red', width: "25px", height: "25px", 'margin-right': '8px' }} />
                            : <IonIcon slot={"end"} icon={notifications} style={{ color: 'white', width: "25px", height: "25px", 'margin-right': '8px' }} />
                        }
                    </IonToolbar>
                </IonHeader>
                <ProductClientList />
            </IonPage>
            <IonPopover isOpen={popoverState} cssClass='my-custom-class'
                onDidDismiss={() => setPopoverState(false)}>
                <div style={{ background: '#45BAF9' }}><h3 style={{ 'text-align': 'center' }}>Su Postulación ha sido enviada</h3></div>
                {
                    data.map((orders, i) => (
                        <IonList key={i}>
                            <IonItem>
                                 {orders.publication_name} 
                                 <br/>
                                 Postulación: {orders.status==="new"
                                 ?"Nueva"
                                 :""
                                 }
                                </IonItem>                            
                        </IonList>
                    ))
                }
            </IonPopover>
        </>
    )
};
export default ClientProductsPage;
