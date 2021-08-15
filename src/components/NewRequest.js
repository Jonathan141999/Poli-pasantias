import React, {useState} from 'react';
import API from '../data/index';
import {useRequests} from '../data/useRequests';
import ShowError from "./ShowError";
import {translateMessage} from "../utils/translateMessage";
import {
    IonList,
    IonItem,
    IonLabel, IonButton,
    IonGrid, IonRow, IonCol, IonIcon
} from "@ionic/react";
import {useRequest} from "../data/useRequest";
import {useDetailRequest} from "../data/useDetailRequest";
import "../theme/toolbar.css";
import {bagCheck, bagHandle, checkmarkCircle, alertCircle, cart} from "ionicons/icons";
import {CloseOutlined} from '@ant-design/icons';
import Skeleton from './Skeleton';
import {Modal, message} from 'antd';

const NewRequest = () =>{
    const {requests, isLoadingRequest, isErrorRequest,mutate} = useRequests();

    const [idRequest, setIdRequest] = useState('');
    const [showDetail, setShowDetail] = useState(false);
    const [statusRequest, setStatusRequest] = useState('');
    //const [list, setList] = useState(requests);

    const request = useRequest(idRequest);
    const detailRequest = useDetailRequest(idRequest);
    console.log("pedidos", requests);
    

    if( isLoadingRequest ) {
        return <Skeleton />;       
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

    const onUpdate = async() => {
        let status='';
        if (request.request.status==='new'){
            status='pending';
            setStatusRequest(status);
        }
        if (request.request.status==='pending'){
            status='accepted';
            setStatusRequest(status);
        }
        if (request.request.status==='accepted'){
            status='rejected';
            setStatusRequest(status);
        }
    
        console.log("status", status);
        console.log('id', idRequest);
        try {
            await API.put( `/postulations/status/${idRequest}`, {
                status: status,
            } );
            

        } catch( error ) {
            console.error('You have an error in your code or there are Network issues.',error);
            message.error( translateMessage( error.message ) );
        }

    };

    

    return (
        <>
        <IonList>
            {
                requests.map( ( orders, i ) => (
                    <IonItem key={i} onClick={()=>handleShowDetail(i)}>
                        {orders.status==='new'
                        ?<IonIcon slot="end" icon={alertCircle} style={{width:"40px", height:"40px", color:"red"}}/>
                            :orders.status=== 'pending'
                            ?<IonIcon slot="end" icon={cart} style={{width:"40px", height:"40px", color:"orange"}}/>
                                :orders.status==='accepted'
                                ?<IonIcon slot="end" icon={bagHandle} style={{width:"40px", height:"40px", color:"blue"}}/>
                                    :orders.status==='rejected'
                                    ?<IonIcon slot="end" icon={bagCheck} style={{width:"40px", height:"40px", color:"green"}}/>
                                        :<IonIcon slot="end" icon={checkmarkCircle} style={{width:"40px", height:"40px", color:"green"}}/>
                        }
                        <IonLabel>
                            
                            {orders.type==='face'
                                ? <div><p><strong>Entrevista Personal</strong></p></div>
                                : <div><p><strong>Entrevista Online</strong></p></div>
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
                <Modal  title="Detalle de la postulación" className={"report"}
                        visible={showDetail}
                        closeIcon={<CloseOutlined onClick={()=>setShowDetail(false)}/>}
                        closable={true}
                        footer={request.request.status==='new'
                                ?<IonButton style={{margin:'auto', display:'block' }}  htmlType='submit' onClick={onUpdate}>
                                    Nueva Postulación
                                </IonButton>
                                :request.request.status==='pending'
                                ?<IonButton style={{margin:'auto', display:'block' }}  htmlType='submit' onClick={onUpdate}>
                                    Postulación Pendiente
                                </IonButton>
                                :request.request.status==='accepted'
                                ?<IonButton style={{margin:'auto', display:'block' }}  htmlType='submit' onClick={onUpdate}>
                                    Postulación Aceptada
                                </IonButton>
                                :request.request.status==='rejected'
                                ?<IonButton style={{margin:'auto', display:'block' }}  htmlType='submit' onClick={onUpdate}>
                                    Postulacion Rechazada
                                </IonButton>
                                :<IonButton style={{margin:'auto', display:'block' }}  htmlType='submit' onClick={onUpdate}>
                                    Finalizado
                                </IonButton>
                            }
                    >
                        <IonGrid>
                            <IonRow>
                                <IonCol><strong>Número de Postulación: </strong><h4>{request.request.id}</h4></IonCol>
                                <IonCol><strong>Fecha: </strong> {request.request.date}</IonCol>
                            </IonRow>
                            <IonRow>
                                {request.request.type==='face'
                                    ?<IonCol><strong>Tipo: </strong><h4>Presencial</h4></IonCol>
                                    :<IonCol><strong>Tipo: </strong><h4>Online</h4></IonCol>
                                }
                                {request.request.status==='new'
                                    ?<IonCol><strong>Estado: </strong> Nueva</IonCol>
                                    :request.request.status==='pending'
                                    ?<IonCol><strong>Estado: </strong> Pendiente</IonCol>
                                    :request.request.status==='accepted'
                                    ?<IonCol><strong>Estado: </strong> Aceptada</IonCol>
                                    :request.request.status==='rejected'
                                    ?<IonCol><strong>Estado: </strong> Rechazado</IonCol>
                                    :<IonCol><strong>Estado: </strong> Finalizado</IonCol>
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
                                                <p align={"center"}><strong>Nombre de la Publicación</strong></p>
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
                                                </IonRow>
                                            </IonLabel>
                                        </IonItem>))
                                }
                            </IonList>
                        </>
                    }
            </Modal>
            </>
        }
        </>
    );
}

export default NewRequest;