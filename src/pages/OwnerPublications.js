import React, {useState, useEffect} from 'react';
import {
    IonHeader, IonIcon, IonPopover,
    IonPage, IonItem, IonList,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import ProductOwnerList from "../components/ProductOwnerList";
import Layouts from '../components/Layout';
import '../theme/app.css';
import "../theme/toolbar.css";
import {useRequests} from "../data/useRequests";
import {notifications} from "ionicons/icons";

const OwnerProductsPage = () => {


    const {requests}=useRequests();
    const [data, setData]= useState([]);
    const [popoverState, setPopoverState] = useState(false);
    const [newState, setNewState] = useState(true);
    //console.log( 'longitud', requests.lenght); 
    
    useEffect ( () => {
        if (requests && newState){
            const newData= requests.filter(i => i.status  === 'new' );
            console.log('nueva lon ', newData.length);
            setData(newData);
            setNewState(false);
        }
    });

    const handleStatus = () =>{
        setPopoverState(true);
    }

    return    (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar id={"toolbar"}>
                        <div slot={"start"} className="menu">
                            <Layouts />
                        </div>
                        <IonTitle id={"letter"}>Publicaciones </IonTitle>
                        {data.length > 0
                        ?<IonIcon slot={"end"} onClick={handleStatus} icon={notifications} style={{color:'red',width:"25px", height:"25px", 'margin-right':'8px'}} />
                        :<IonIcon slot={"end"} icon={notifications} style={{color:'white',width:"25px", height:"25px", 'margin-right':'8px'}}/>
                        }
                    </IonToolbar>
                </IonHeader>
                <ProductOwnerList/>
            </IonPage>
            <IonPopover isOpen={popoverState} cssClass='my-custom-class'
            onDidDismiss={() => setPopoverState(false)}>
                {
                    data.length === 1 
                    ? <div style={{background:'#45BAF9'}}><h3 style={{'text-align':'center'}}>Usted tiene {data.length} postulación</h3></div>
                    : <div style={{background:'#45BAF9'}}><h3 style={{'text-align':'center'}}>Usted tiene {data.length} postulaciones nuevas</h3></div>
                }
                
                {
                    data.map((orders, i)=>(
                        <IonList key={i}>
                            <IonItem>
                                {orders.publication_name} 
                                <br/>
                                Estudiante: {orders.name} {orders.last_name} </IonItem>
                        </IonList>
                    ))
                }       
            </IonPopover>
        </>
    );
};


export default OwnerProductsPage;
