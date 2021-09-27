import React, { useState } from "react";
import { useRequestsByUser } from "../data/useRequestsByUser";
import ShowError from "./ShowError";
import {
    IonList,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonSkeletonText,
    IonCardContent,
    IonCardSubtitle, IonHeader, IonToolbar, IonTitle,
    IonGrid, IonRow, IonCol, IonIcon, IonButton
} from "@ionic/react";
import { useRequest } from "../data/useRequest";
import { useDetailRequest } from "../data/useDetailRequest";
import { arrowBack } from "ionicons/icons";
import "../theme/toolbar.css";
import { Modal } from "antd";


const RequestsByUser = () => {

    const { requestsByUser, isLoadingRequests, isErrorRequests } = useRequestsByUser();

    const [idRequest, setIdRequest] = useState('');
    const [showDetail, setShowDetail] = useState(false);

    const request = useRequest(idRequest);
    const detailRequest = useDetailRequest(idRequest);

    console.log("postulacion por usuario", requestsByUser);

    if (isLoadingRequests) {
        return <>
            <IonList>
                <IonItem>
                    <IonThumbnail slot={"start"}>
                        <IonSkeletonText />
                    </IonThumbnail>
                    <IonLabel>
                        <IonSkeletonText />
                    </IonLabel>
                </IonItem>
            </IonList>
            <IonList>
                <IonItem>
                    <IonThumbnail slot={"start"}>
                        <IonSkeletonText />
                    </IonThumbnail>
                    <IonLabel>
                        <IonSkeletonText />
                    </IonLabel>
                </IonItem>
            </IonList>
        </>
    }

    if (isErrorRequests) {
        return <ShowError error={isErrorRequests} />;
    }

    const handleShowDetail = (index) => {
        const id = requestsByUser[index].id;
        setIdRequest(id);
        setShowDetail(true);
    }
    console.log("detalle de la postulación", request.request);


    return (
        <>
            <IonList>
                {requestsByUser ?
                    requestsByUser.map((requests, i) => (
                        <IonItem key={i} onClick={() => handleShowDetail(i)}>
                            <IonLabel>
                                <div><p><strong>Nueva Postulación </strong></p></div>
                                <div><p><strong>Estado: </strong>{requests.status === "new"
                                    ? "Nueva"
                                    : requests.status === "pending"
                                        ? "Pendiente"
                                        : requests.status === "accepted"
                                            ? "Aceptado"
                                            : requests.status === "rejected"
                                                ? "Rechazado"
                                                : ""}</p></div>
                                <div><p><strong>Semestre: </strong>{requests.career}</p></div>
                                <div><p><strong>Tipo de entrevista: </strong>{requests.type === 'face'
                                    ? "Presencial"
                                    : "En Línea"
                                }
                                </p></div>
                            </IonLabel>

                        </IonItem>
                    ))
                    : ""
                }
            </IonList>

            {
                request.isLoading
                    ? <>
                        <IonList>
                            <IonItem>
                                <IonThumbnail slot={"start"}>
                                    <IonSkeletonText />
                                </IonThumbnail>
                                <IonLabel>
                                    <IonSkeletonText />
                                </IonLabel>
                            </IonItem>
                        </IonList>
                        <IonList>
                            <IonItem>
                                <IonThumbnail slot={"start"}>
                                    <IonSkeletonText />
                                </IonThumbnail>
                                <IonLabel>
                                    <IonSkeletonText />
                                </IonLabel>
                            </IonItem>
                        </IonList>
                    </>
                    : request.isError
                        ? ""
                        : <>
                            <Modal title="Detalle de Postulación" id={"modal"}
                                visible={showDetail}
                                closable={false}
                                footer={[
                                    <IonButton onClick={() => setShowDetail(false)}>Cerrar</IonButton>
                                ]}
                            >
                                {
                                    detailRequest.isLoading
                                        ? <>
                                            <IonList>
                                                <IonItem>
                                                    <IonThumbnail slot={"start"}>
                                                        <IonSkeletonText />
                                                    </IonThumbnail>
                                                    <IonLabel>
                                                        <IonSkeletonText />
                                                    </IonLabel>
                                                </IonItem>
                                            </IonList>
                                            <IonList>
                                                <IonItem>
                                                    <IonThumbnail slot={"start"}>
                                                        <IonSkeletonText />
                                                    </IonThumbnail>
                                                    <IonLabel>
                                                        <IonSkeletonText />
                                                    </IonLabel>
                                                </IonItem>
                                            </IonList>
                                        </>
                                        : detailRequest.isError
                                            ? " "
                                            : <>
                                                <IonList>
                                                    <IonCol>
                                                        <IonCardContent>
                                                            <IonCardSubtitle><strong>Nombre de la Publicación: </strong>{detailRequest.detailRequest.publication_name}</IonCardSubtitle>
                                                            <IonCardSubtitle><strong>Horas: </strong>{detailRequest.detailRequest.hour}</IonCardSubtitle>
                                                            <IonCardSubtitle><strong>Nombre: </strong>{detailRequest.detailRequest.name}</IonCardSubtitle>
                                                            <IonCardSubtitle><strong>Apellido: </strong>{detailRequest.detailRequest.last_name}</IonCardSubtitle>
                                                            <IonCardSubtitle><strong>Telefóno: </strong>{detailRequest.detailRequest.phone}</IonCardSubtitle>
                                                            <IonCardSubtitle><strong>Correo: </strong>{detailRequest.detailRequest.email}</IonCardSubtitle>
                                                            <IonCardSubtitle><strong>Lenguajes que domina: </strong>{detailRequest.detailRequest.languages}</IonCardSubtitle>
                                                            <IonCardSubtitle><strong>Semestre: </strong>{detailRequest.detailRequest.career}</IonCardSubtitle>
                                                            <IonCardSubtitle><strong>Tipo de entrevista: </strong>
                                                                {detailRequest.detailRequest.type === 'face'
                                                                    ? "Presencial"
                                                                    : "En Linea"
                                                                }</IonCardSubtitle>
                                                            <IonCardSubtitle><strong>Estado: </strong>
                                                                {detailRequest.detailRequest.status === "new"
                                                                    ? "Nueva"
                                                                    : detailRequest.detailRequest.status === "accepted"
                                                                        ? "Aceptado"
                                                                        : detailRequest.detailRequest.status === "rejected"
                                                                            ? "Rechazado"
                                                                            : ""}</IonCardSubtitle>
                                                            <IonCardSubtitle><strong>Experiencia Laboral: </strong>{detailRequest.detailRequest.work_experience}</IonCardSubtitle>
                                                        </IonCardContent>
                                                    </IonCol>
                                                </IonList>
                                            </>
                                }
                            </Modal>
                        </>
            }
        </>
    );
}
export default RequestsByUser;