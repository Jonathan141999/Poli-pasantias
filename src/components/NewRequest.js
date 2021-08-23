import React, { useState } from 'react';
import API from '../data/index';
import { useRequests } from '../data/useRequests';
import ShowError from "./ShowError";
import { translateMessage } from "../utils/translateMessage";
import {
    IonList,
    IonItem,
    IonLabel, IonButton,
    IonGrid, IonRow, IonCol, IonCardContent, IonCardSubtitle, IonText, IonCard
} from "@ionic/react";
import { useRequest } from "../data/useRequest";
import { useDetailRequest } from "../data/useDetailRequest";
import "../theme/toolbar.css";
import { bagCheck, bagHandle, checkmarkCircle, alertCircle, cart } from "ionicons/icons";
import { CloseOutlined } from '@ant-design/icons';
import Skeleton from './Skeleton';
import { Modal, message } from 'antd';

const NewRequest = () => {
    const { requests, isLoadingRequest, isErrorRequest, mutate } = useRequests();

    const [idRequest, setIdRequest] = useState('');
    const [showDetail, setShowDetail] = useState(false);
    const [statusRequest, setStatusRequest] = useState('');
    //const [list, setList] = useState(requests);

    const request = useDetailRequest(idRequest);
    console.log("pedidos", request);

    if (isLoadingRequest) {
        return <Skeleton />;
    }

    if (isErrorRequest) {
        return <ShowError error={isErrorRequest} />;
    }

    const handleShowDetail = (index) => {
        const id = requests[index].postulation_id;
        setIdRequest(id);
        setShowDetail(true);
    }


    const onAccept = async () => {
        let status = "accepted"
        try {
            await API.put(`/postulations/status/${idRequest}`, {
                status: status,
            });
            setShowDetail(false);
            message.success('Actualizacion exitosa');
        } catch (error) {
            console.error('You have an error in your code or there are Network issues.', error);
            message.error(translateMessage(error.message));
        }
    };

    const onPending = async () => {
        let status = "pending"
        try {
            await API.put(`/postulations/status/${idRequest}`, {
                status: status,
            });
            setShowDetail(false);
            message.success('Actualizacion exitosa');

        } catch (error) {
            console.error('You have an error in your code or there are Network issues.', error);
            message.error(translateMessage(error.message));
        }
    }

    const onReject = async () => {
        let status = "rejected"
        try {
            await API.put(`/postulations/status/${idRequest}`, {
                status: status,
            });
            setShowDetail(false);
            message.success('Actualizacion exitosa');
        } catch (error) {
            console.error('You have an error in your code or there are Network issues.', error);
            message.error(translateMessage(error.message));
        }

    }



    return (
        <>
            <IonList>
                {
                    requests.map((orders, i) => (
                        <IonItem key={i} onClick={() => handleShowDetail(i)}>
                            <IonLabel>

                                {orders.type === 'face'
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
                    ? <><Skeleton /></>
                    : request.isError
                        ? <ShowError error={request.isError} />
                        : <>
                            <Modal title="Detalle de la postulación" className={"report"}
                                visible={showDetail}
                                closeIcon={<CloseOutlined onClick={() => setShowDetail(false)} />}
                                closable={true}
                                footer={
                                    <>
                                        <IonButton variant="success" style={{ margin: 'auto', display: 'block', background: 'green' }} htmlType='submit' onClick={() => onAccept()}>
                                            Acceptar
                                        </IonButton>
                                        <IonButton style={{ margin: 'auto', display: 'block' }} htmlType='submit' onClick={() => onPending()}>
                                            Revisando
                                        </IonButton>
                                        <IonButton style={{ margin: 'auto', display: 'block' }} htmlType='submit' onClick={() => onReject()}>
                                            Rechazado
                                        </IonButton></>
                                }
                            >
                                <IonGrid>
                                    <IonRow>
                                        <IonLabel>
                                            <IonText>
                                                <h4 align="center" ><strong>Número de Postulacion:</strong>{request.detailRequest.postulation_id}</h4>
                                            </IonText>
                                        </IonLabel>
                                        <IonLabel>
                                            <IonText>
                                                <h4 align="center" ><strong>Datos del Estudiante:</strong></h4>
                                            </IonText>
                                        </IonLabel>
                                        <IonCol>
                                            <IonCardContent>
                                                <IonCardSubtitle><strong>Nombre: </strong>{request.detailRequest.name}</IonCardSubtitle>
                                                <IonCardSubtitle><strong>Apellido: </strong>{request.detailRequest.last_name}</IonCardSubtitle>
                                                <IonCardSubtitle><strong>Teléfono: </strong>{request.detailRequest.phone}</IonCardSubtitle>
                                                <IonCardSubtitle><strong>Correo: </strong>{request.detailRequest.email}</IonCardSubtitle>
                                                <IonCardSubtitle><strong>Dirección: </strong>{request.detailRequest.direction}</IonCardSubtitle>
                                                <IonCardSubtitle><strong>Leguajes: </strong>{request.detailRequest.languages}</IonCardSubtitle>
                                                <IonCardSubtitle><strong>Semestre: </strong>{request.detailRequest.career}</IonCardSubtitle>
                                                <IonCardSubtitle><strong>Experiencia Laboral: </strong>{request.detailRequest.work_experience}</IonCardSubtitle>
                                            </IonCardContent>
                                            <IonLabel>
                                                <IonText>
                                                    <h4 align="center" ><strong>Datos de la Empresa:</strong></h4>
                                                </IonText>
                                            </IonLabel>
                                            <IonCol>
                                                <IonCardContent>
                                                    <IonCardSubtitle><strong>Nombre de la Empresa: </strong>{request.detailRequest.publication_name}</IonCardSubtitle>
                                                    <IonCardSubtitle><strong>Horas a ofertar: </strong>{request.detailRequest.hour}</IonCardSubtitle>
                                                    <IonCardSubtitle><strong>Detalles: </strong>{request.detailRequest.details}</IonCardSubtitle>
                                                </IonCardContent>
                                            </IonCol>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        {request.detailRequest.type === 'face'
                                            ? <IonCol><strong>Tipo: </strong><h4>Presencial</h4></IonCol>
                                            : <IonCol><strong>Tipo: </strong><h4>Online</h4></IonCol>
                                        }
                                        {request.detailRequest.status === 'new'
                                            ? <IonCol><strong>Estado: </strong> Nueva</IonCol>
                                            : request.detailRequest.status === 'pending'
                                                ? <IonCol><strong>Estado: </strong> Pendiente</IonCol>
                                                : request.detailRequest.status === 'accepted'
                                                    ? <IonCol><strong>Estado: </strong> Aceptada</IonCol>
                                                    : request.detailRequest.status === 'rejected'
                                                        ? <IonCol><strong>Estado: </strong> Rechazado</IonCol>
                                                        : <IonCol><strong>Estado: </strong> Finalizado</IonCol>
                                        }
                                    </IonRow>
                                </IonGrid>
                            </Modal>
                        </>
            }
        </>
    );
}

export default NewRequest;