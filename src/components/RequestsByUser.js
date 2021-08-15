import React, {useState} from "react";
import {useRequestsByUser} from "../data/useRequestsByUser";
import ShowError from "./ShowError";
import {
    IonList,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonSkeletonText,
    IonProgressBar,
    IonPage, IonHeader, IonToolbar, IonTitle,
    IonGrid, IonRow, IonCol, IonIcon, IonButton
} from "@ionic/react";
import {useRequest} from "../data/useRequest";
import {useDetailRequest} from "../data/useDetailRequest";
import {arrowBack} from "ionicons/icons";
import "../theme/toolbar.css";
import {Modal} from "antd";


const RequestsByUser = () => {

    const {requestsByUser, isLoadingRequests, isErrorRequests}=useRequestsByUser();

    const [idRequest, setIdRequest] = useState('');
    const [showDetail, setShowDetail] = useState(false);

    const request = useRequest(idRequest);
    const detailRequest = useDetailRequest(idRequest);

    console.log("postulacion por usuario", requestsByUser);

    if( isLoadingRequests ) {
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

    if( isErrorRequests ) {
        return <ShowError error={ isErrorRequests } />;
    }

    const handleShowDetail=(index)=>{
        const id=requestsByUser[index].id;
        setIdRequest(id);
        setShowDetail(true);
    }
    console.log("detalle de la postulación", request.request);


    return (
      <>
          <IonList>
              { requestsByUser ?
                  requestsByUser.map( ( requests, i ) => (
                  <IonItem key={i} onClick={()=>handleShowDetail(i)}>
                       <IonLabel>
                          <div><p><strong>N° de pedidos: </strong>{requests.id}</p></div>
                          <div><p><strong>Estado: </strong>{requests.status === "new"
                              ? "Nueva"
                              : requests.status=== "pending"
                                  ? "Pendiente"
                                  : requests.status === "accepted"
                                      ? "Aceptado"
                                      : requests.status === "rejected"
                                          ? "Rechazado"
                                          : ""}</p></div>
                          <IonProgressBar style={{height: "15px"}} value={
                              requests.status === "new"
                                  ? 0.25
                                  : requests.status=== "pending"
                                  ? 0.5
                                  : requests.status === "accepted"
                                      ? 0.75
                                      : requests.status === "rejected"
                                          ? 1
                                          : 0
                          }
                          />
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
                      <Modal  title="Detalle de Postulación" id={"modal"}
                              visible={showDetail}
                              closable={false}
                              footer={[
                                  <IonButton onClick={()=>setShowDetail(false)}>Cerrar</IonButton>
                              ]}
                      >
                              <IonGrid>
                                  <IonRow>
                                      <IonCol><strong>Número de Solicitud: </strong><h2 align={"center"}>{request.request.id}</h2></IonCol>
                                      <IonCol><strong>Fecha: </strong> {request.request.date}</IonCol>
                                  </IonRow>
                              </IonGrid>
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
                                          <IonItem>
                                              <IonLabel>
                                                  <IonRow>
                                                      <IonCol>
                                                          <p align={"center"}><strong>Postulación</strong></p>
                                                      </IonCol>
                                                  </IonRow>
                                              </IonLabel>
                                          </IonItem>
                                          {
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
export default RequestsByUser;