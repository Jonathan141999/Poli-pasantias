import React, {useState, useEffect} from 'react';
import API from '../data/index';
import {useRequests} from '../data/useRequests';
import ShowError from "./ShowError";
import {
    IonList,
    IonItem,
    IonLabel, IonFooter,
    IonModal, IonButton,
    IonPage, IonHeader, IonToolbar, IonTitle,
    IonGrid, IonRow, IonCol, IonIcon
} from "@ionic/react";
import {useRequest} from "../data/useRequest";
import {useDetailRequest} from "../data/useDetailRequest";
import "../theme/toolbar.css";
import {bagCheck, bagHandle, checkmarkCircle, alertCircle, closeCircle,arrowBack} from "ionicons/icons";
import Skeleton from './Skeleton';

const NewRequest = () =>{
    const {requests, isLoadingRequest, isErrorRequest} = useRequests();

    const [idRequest, setIdRequest] = useState('');
    const [showDetail, setShowDetail] = useState(false);
    //const [list, setList] = useState(requests);

    const request = useRequest(idRequest);
    const detailRequest = useDetailRequest(idRequest);
    console.log("pedidos", requests);
    

    if( isLoadingRequest ) {
        return <>
            <Skeleton />            
        </>
    }

    if( isErrorRequest ) {
        return <ShowError error={ isErrorRequest } />;
    }

    const handleShowDetail=(index)=>{
        const id=requests[index].id;
        setIdRequest(id);
        setShowDetail(true);
    }

    console.log("detalle_pedido", request.request);

    return (
        <>
        <IonList>
            {
                requests.map( ( orders, i ) => (
                    <IonItem key={i} onClick={()=>handleShowDetail(i)}>
                        {orders.status==='pending'
                        ?<IonIcon slot="end" icon={alertCircle}>Pendiente</IonIcon>
                            :orders.status=== 'accomplished'
                            ?<IonIcon slot="end" icon={checkmarkCircle}>Realizado</IonIcon>
                                :orders.status==='retired'
                                ?<IonIcon slot="end" icon={bagHandle}>Retirado</IonIcon>
                                    :orders.status==='delivered'
                                    ?<IonIcon slot="end" icon={bagCheck}>Entregado</IonIcon>
                                        :<IonIcon slot="end" icon={closeCircle}>Desconocido</IonIcon>
                        }
                        <IonLabel>
                            <div><h2><strong>Numero de solicitud </strong>{orders.id}</h2></div>
                            <div><p><strong>Numero de casa: </strong>{orders.usertype.home_number}</p></div>
                            <div><p><strong>Ordenado por: </strong>{orders.user.name}</p></div>
                            <div><p><strong>Total: </strong>{orders.total.toFixed(2)}</p></div>
                            {orders.type==='withdraw'
                                ? <div><p><strong>Orden para: </strong> Postulado</p></div>
                                : <div><p><strong>Orden a: </strong>Rechazado</p></div>
                            }
                        </IonLabel>
                    </IonItem>
                ))
            }
        </IonList>

        {
            request.isLoading
                ? <><Skeleton/></>
                : request.isError
                ? <ShowError error={request.isError}/>
                : <>
                <IonModal isOpen={showDetail} cssClass='my-custom-class'>
                    <IonPage>
                        <IonHeader>
                            <IonToolbar id={"toolbar"}>
                                <IonIcon
                                    id={"icon"}
                                    icon={arrowBack}
                                    slot="start"
                                    style={{margin:'5px', width:"25px", height:"25px"}}
                                    onClick={()=>setShowDetail(false)}/>
                                <IonTitle id={"letter"}>
                                    Detalle del pedido
                                </IonTitle>
                            </IonToolbar>
                        </IonHeader>
                        <IonGrid>
                            <IonRow>
                                <IonCol align={"center"}><strong>N° de Pedido: </strong><h4 >{request.request.id}</h4></IonCol>
                                <IonCol align={"center"}><strong>Fecha: </strong> {request.request.date}</IonCol>
                            </IonRow>
                            <IonRow>
                                {request.request.type==='withdraw'
                                    ?<IonCol align={"center"}><strong>Tipo: </strong><h4>Retirar</h4></IonCol>
                                    :<IonCol align={"center"}><strong>Tipo: </strong><h4>Domicilio</h4></IonCol>
                                }
                                {request.request.status==='pending'
                                    ?<IonCol><strong>Estado: </strong> Pendiente</IonCol>
                                    :request.request.status==='accomplished'
                                    ?<IonCol><strong>Estado: </strong> Realizado</IonCol>
                                    :request.request.status==='retired'
                                    ?<IonCol><strong>Estado: </strong> Retirado</IonCol>
                                    :request.request.status==='delivered'
                                    ?<IonCol><strong>Estado: </strong> Entregado</IonCol>
                                    :''
                                }  
                            </IonRow>
                        </IonGrid>
                        {
                            detailRequest.isLoading
                            ? <><Skeleton/></>
                            : detailRequest.isError
                            ? " "
                            : <><IonList>
                                <IonItem>
                                    <IonLabel>
                                        <IonRow>
                                            <IonCol>
                                                <p align={"center"}><strong>Producto</strong></p>
                                            </IonCol>
                                            <IonCol>
                                                <p align={"center"}><strong>Cantidad</strong></p>
                                            </IonCol>
                                            <IonCol>
                                                <p align={"center"}><strong>Precio</strong></p>
                                            </IonCol>
                                        </IonRow>
                                    </IonLabel>
                                </IonItem>
                                {
                                    detailRequest.detailRequest.map((detail, i)=>(
                                        <IonItem key={i}>
                                            <IonLabel>
                                                <IonRow>
                                                    <IonCol>
                                                        <p align={"center"}>{detail.product.name}</p>
                                                    </IonCol>
                                                    <IonCol>
                                                        <p align={"center"}>{detail.quantity}</p>
                                                    </IonCol>
                                                    <IonCol>
                                                        <p align={"center"}>{detail.finalprice.toFixed(2)}</p>
                                                    </IonCol>
                                                </IonRow>
                                            </IonLabel>
                                        </IonItem>))
                                }
                                <IonItem>
                                    <IonLabel>
                                        <IonRow>
                                            <IonCol/>
                                                <IonCol>
                                                    <p align={"right"}><strong>Subtotal:</strong></p>
                                                </IonCol>
                                                <IonCol>
                                                    <p align={"center"}>{request.request.subtotal.toFixed(2)}</p>
                                                </IonCol>
                                        </IonRow>
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>
                                        <IonRow>
                                            <IonCol/>
                                            <IonCol>
                                                <p align={"right"}><strong>Recargo:</strong></p>
                                            </IonCol>
                                            <IonCol>
                                                <p align={"center"}>{request.request.surcharge.toFixed(2)}</p>
                                            </IonCol>
                                        </IonRow>
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>
                                        <IonRow>
                                            <IonCol/>
                                                <IonCol>
                                                    <p align={"right"}><strong>Total:</strong></p>
                                                </IonCol>
                                                <IonCol>
                                                    <p align={"center"}>{request.request.total.toFixed(2)}</p>
                                                </IonCol>
                                        </IonRow>
                                    </IonLabel>
                                </IonItem>
                            </IonList>
                            <div>
                            {request.request.status==='pending'
                                ?<IonButton style={{margin:'auto', display:'block' }}>
                                    Poner en Realizado
                                </IonButton>
                                :request.request.status==='accomplished'
                                ?<IonButton style={{margin:'auto', display:'block' }}>
                                    Pedido por Retirar
                                </IonButton>
                                :request.request.status==='retired'
                                ?<IonButton style={{margin:'auto', display:'block' }}>
                                Pedido para Entregar
                                </IonButton>
                                :request.request.status==='delivered'
                                ?<IonButton style={{margin:'auto', display:'block' }}>
                                Pedido Entregado
                                </IonButton>
                                :<IonButton style={{margin:'auto', display:'block' }}>
                                Pedido Finalizado
                                </IonButton>
                            }
                            </div>
                        </>
                    }
                </IonPage>
            </IonModal></>
        }
        </>
    );
}

export default NewRequest;