import {useProducts} from "../data/useProducts";
import {Row, Col, Skeleton, Form, Input, message, Modal} from "antd";
import React, {useState} from "react";
import ShowError from "./ShowError";
import {
    IonButton,
    IonCard, IonCardContent, IonCardHeader,
    IonCardSubtitle,
    IonCardTitle, IonCol, IonGrid, IonHeader, IonImg,
    IonItem, IonModal, IonPage,
    IonRow, IonThumbnail, IonTitle, IonToolbar,
} from "@ionic/react";
import API from "../data";
import {useProduct} from "../data/useProduct";
import {translateMessage} from "../utils/translateMessage";
import {useSearchProduct} from "../data/useSearchProduct";
import Search from "antd/es/input/Search";
import "../theme/toolbar.css";



//publicaiones de de la empresa puede publicar y ver en card
const ProductOwnerList = () => {

    const { products, isLoading, isError, mutate } = useProducts();
    const [idProduct, setIdProduct]=useState('')
    const [showInfo, setShowInfo] = useState(false);
    const [ form ] = Form.useForm();

    const [search, setSearch]=useState('');

    const {searchProduct}=useSearchProduct(search);

    console.log("publicaciones", products);

    console.log("busqueda", searchProduct);

    const product = useProduct(idProduct);
    console.log('info product', product);

    const onUpdate = async values => {
        console.log( 'Received values of form: ', values );

        form.validateFields()
            .then( async( values ) => {
                try {
                    await API.put( `/publications/${idProduct}`, {
                        affair: values.affair,
                        stock: values.details,
                        location:values.location,
                        phone: values.phone,
                    } ); // post data to server
                    form.resetFields();
                    await afterCreate();
                    setShowInfo(false);

                } catch( error ) {
                    console.error(
                        'You have an error in your code or there are Network issues.',
                        error
                    );
                    message.error( translateMessage( error.message ) );
                }
            } )
            .catch( info => {
                console.log( 'Validate Failed:', info );
            } );

    };

    const afterCreate = async () => {
        await mutate('/publications');
    };

    const onSearch = value =>{
        console.log('publicaciones', value);
        setSearch(value);
    };

    if( isLoading ) {
        return <Row justify='center' gutter={ 30 }>
            {
                [ ...new Array( 9 ) ].map( ( _, i ) =>
                    <Col xs={ 24 } sm={ 12 } md={ 8 } style={ { marginBottom: 30 } } key={ i }>
                        <div style={ { textAlign: 'center' } }>
                            <Skeleton.Image style={ { width: 200 } } />
                            <IonCard title='' extra='' cover='' loading />
                        </div>
                    </Col>
                )
            }
        </Row>;
    }

    if( isError ) {
        return <ShowError error={ isError } />;
    }

    const showDetails = (index)=>{
        const id=products[index].id;
        setIdProduct(id);
        setShowInfo(true);
    }

    const showDetail = (index)=>{
        const id=index;
        setIdProduct(id);
        setShowInfo(true);
    }


    return (
        <>
            <IonGrid>
                <IonRow>
                    <IonToolbar>
                        <Search placeholder="input search text" onSearch={onSearch} enterButton />
                    </IonToolbar>
            {
                searchProduct ?
                    searchProduct.map((search, i)=>(
                        <IonCol>
                            <IonCard key={i} onClick={()=>showDetail(search.id)}>
                                         <IonCardHeader>
                                             <IonCardTitle>{search.affair}</IonCardTitle>
                                         </IonCardHeader>

                                <IonCardContent>
                                    <IonCardSubtitle><strong>Detalle: </strong>{product.details}</IonCardSubtitle>
                                    <IonCardSubtitle><strong>Horas: </strong>{product.hour}</IonCardSubtitle>
                                    <IonCardSubtitle><strong>Dirección: </strong>{product.location}</IonCardSubtitle>                                
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    ))
                    :
                    products ?
                products.map((product,i)=>(
                    <IonCol size="6">
                    <IonCard key={i} onClick={()=>showDetails(i)} >
                        <IonCardHeader>
                            <IonCardTitle>{product.affair}</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonCardSubtitle><strong>Detalle: </strong>{product.details}</IonCardSubtitle>
                            <IonCardSubtitle><strong>Horas: </strong>{product.hour}</IonCardSubtitle>
                            <IonCardSubtitle><strong>Dirección: </strong>{product.location}</IonCardSubtitle>
                            <IonCardSubtitle><strong>Telefóno: </strong>{product.phone}</IonCardSubtitle>
                            <IonCardSubtitle><strong>Fecha de Publicación: </strong>{product.publication_date}</IonCardSubtitle>
                            <IonCardSubtitle><strong>Categoria </strong>{product.category_id}</IonCardSubtitle>
                        </IonCardContent>
                    </IonCard>
                    </IonCol>
                ))
                : "Cargando..."
            }
                </IonRow>
            </IonGrid>
            {
                product.isLoading
                    ? <div>Cargando...</div>
                    : product.isError
                    ? <ShowError error={product.isError}/>
                    : <>
                        <Modal  title="Publicaciones" style={{background:"blue"}}
                                visible={showInfo}
                                closable={false}
                                footer={[
                                    <IonButton type='primary' htmlType='submit' className='login-form-button' onClick={onUpdate}>
                                        Actualizar
                                    </IonButton>,
                                    <IonButton onClick={()=>setShowInfo(false)}>Cancelar</IonButton>
                                ]}
                        >
                        <Form
                            form={form}
                            initialValues={{
                                 remember: true,
                                }}
                                    //onFinish={onUpdate}
                                >
                                    <Form.Item name='affair'
                                               hasFeedback
                                     >
                                        <Input  placeholder={product.product.affair}/>
                                    </Form.Item>
                                    <Form.Item name='details'
                                               hasFeedback
                                    >
                                        <Input  placeholder={product.product.details}/>
                                    </Form.Item>
                                    <Form.Item name='location'
                                               hasFeedback
                                    >
                                        <Input  placeholder={product.product.location}/>
                                    </Form.Item>
                                    <Form.Item name='phone'
                                               hasFeedback
                                    >
                                        <Input  placeholder={product.product.phone}/>
                                    </Form.Item>
                                    <Form.Item name='publication_date'
                                               hasFeedback
                                    >
                                        <Input  placeholder={product.product.publication_date}/>
                                    </Form.Item>
                                </Form>
                        </Modal>
                    </>
            }
        </>
    );
};

export default ProductOwnerList;