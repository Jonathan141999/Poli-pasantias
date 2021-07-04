import React from 'react';
import {
    IonList,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonSkeletonText,
} from "@ionic/react";


const Skeleton = () =>{
    
    return (
        <>
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
    );
} 

export default Skeleton;