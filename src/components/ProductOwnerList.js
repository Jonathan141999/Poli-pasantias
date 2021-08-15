import {useProducts} from "../data/useProducts";
import {Row, Col, Skeleton, Form, Input, message, Modal, Pagination} from "antd";
import React, {useState} from "react";
import ShowError from "./ShowError";
import {Link} from 'react-router-dom';
import Routes from '../constants/routes';
import {
    IonButton,
    IonCard, IonCardContent, IonCardHeader,
    IonCardSubtitle,
    IonCardTitle, IonCol, IonGrid, IonHeader, IonImg,
    IonItem, IonModal, IonPage,
    IonDatetime,
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
    const [page ,setPage]=useState(0)
    const handleChangePages = (event, newPage) => {
        setPage(newPage);
    };
    

    const product = useProduct(idProduct);
    console.log('info product', product);

    const onUpdate = async values => {
        console.log( 'Received values of form: ', values );

        form.validateFields()
            .then( async( values ) => {
                try {
                    await API.put( `/publications/${idProduct}`, {
                        name: values.name,
                        location: values.location,
                        phone: values.phone,
                        hour: values.hour,
                        details: values.details,
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
                <IonRow style={{display:"block"}}>
                    
            {
                searchProduct ?
                    searchProduct.map((search, i)=>(
                        <IonCol width='100%'>
                            <IonCard key={i} onClick={()=>showDetail(search.id)} style={{margin:'auto', display:'block' }}>
                                <IonCardHeader>
                                     <IonImg src={search.image}
                                     style={{height: "100px"}}/>
                                     <IonCardTitle>{search.name}</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                     <IonCardSubtitle><strong>Dirección: </strong>{search.location}</IonCardSubtitle>
                                    <IonCardSubtitle><strong>Telefóno: </strong>{search.phone}</IonCardSubtitle>
                                    <IonCardSubtitle><strong>Horas: </strong>{search.hour}</IonCardSubtitle>
                                    <IonCardSubtitle><strong>Carrera: </strong>{search.category}</IonCardSubtitle>                                
                                    <IonCardSubtitle><strong>Fecha de Publicación: </strong>{search.created_at}</IonCardSubtitle>                                
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    ))
                    :
                    products ?
                products.map((product,i)=>(
                    <IonCol size="6">
                    <IonCard key={i} onClick={()=>showDetails(i)} style={{margin:'auto', display:'block' }}>
                    <IonCardHeader>
                         <IonImg src={product.image}
                                         style={{height: "100px"}}/>
                        
                            <IonCardTitle>{product.name}</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                        <IonCardSubtitle><strong>Dirección: </strong>{product.location}</IonCardSubtitle>
                            <IonCardSubtitle><strong>Telefóno: </strong>{product.phone}</IonCardSubtitle>
                            <IonCardSubtitle><strong>Horas: </strong>{product.hour}</IonCardSubtitle>
                            <IonCardSubtitle><strong>Carrera: </strong>{product.category}</IonCardSubtitle>
                            <IonCardSubtitle><strong>Fecha de Publicación: </strong>{product.created_at}</IonCardSubtitle>
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
                                    <Form.Item name='name'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingresa el nombre de una empresa'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <label>Nombre de la Empresa</label>
                            <Input  placeholder={product.product.name}/>
                        </Form.Item>
                
                        <Form.Item name='location'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingresa la dirección'
                                       },
                                   ]}
                                   hasFeedback
                        >
                            <label>Dirección</label>
                            <Input  placeholder={product.product.location}/>
                        </Form.Item>
                                    <Form.Item name='phone'
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Ingresa tu número telefónico'
                                        },
                                        {
                                            min: 10,
                                            max: 13,
                                            message: 'El número telefonico debe tener 10 dígitos'
                                        }
                                    ]}
                                    hasFeedback
                                >
                                    <label>Número telefónico</label>
                                    <Input  placeholder={product.product.phone}/>
                                </Form.Item>

                                <Form.Item name='hour'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Horas a ofertar'
                                            }
                                        ]}
                                        hasFeedback
                                >
                                    <label>Horas a Ofertar</label>
                                    <Input placeholder={product.product.hour}/>
                                </Form.Item>
                            
                        <Form.Item name='details'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Detalles de la práctica preprofesional'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <label>Detalles de la práctica preprofesional</label>
                            <Input.TextArea placeholder={product.product.details}/>
                        </Form.Item>
                        </Form>
                        </Modal>
                    </>
            }
            <Pagination style={{padding:"10px", textAlign:"center"}}
            defaultCurrent={1} total={3}
            page={page}
            onChangePage={handleChangePages}
            />
        </>
    );
};

export default ProductOwnerList;