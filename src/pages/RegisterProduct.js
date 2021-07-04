import React, {useState} from 'react';
import API from '../data/index';
import {Select,Card,Skeleton, Col, Form, Input, message, Upload, Row} from 'antd';
import ErrorList from '../components/ErrorList';
import {translateMessage} from '../utils/translateMessage';
//import '../styles/register.css';
import {Link} from 'react-router-dom';
import {IonImg,IonButton, IonCol, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar} from "@ionic/react";
import {arrowBack} from "ionicons/icons";
import {useProducts} from "../data/useProducts";
import ShowError from "../components/ShowError";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import {useCategories} from "../data/useCategories";
import "../theme/toolbar.css";
import Layouts from '../components/Layout';
import '../theme/app.css';
import '../theme/login.css';
import viveres from '../images/viveres.jpg'


const { Option } = Select;


function getBase64( file, callback ) {
    console.log( 'file', file );
    const reader = new FileReader();
    reader.addEventListener( 'load', () => callback( reader.result ) );
    reader.readAsDataURL( file );
}

const RegisterProduct = () => {

    const [ form ] = Form.useForm();
    const {isLoading, isError, mutate} = useProducts();
    const [ imageUrl, setImageUrl ] = useState( null );
    const [ fileList, setFileList ] = useState( [] );
    const categories = useCategories();

    const onCreate = async values => {
        console.log( 'Received values of form: ', values );


        form.validateFields()
            .then( async( values ) => {
                console.log( 'values', values );


                // use form data to be able to send a file to the server
                const data = new FormData();
                data.append( 'image', values.image[ 0 ] );
                data.append( 'affair', values.affair);
                data.append( 'details', values.details );
                data.append( 'hour', values.hour );
                data.append( 'location', values.location);
                data.append( 'phone', values.phone );
                data.append( 'publication_date', values.publication_date );
                data.append( 'category_id', values.category_id );

                console.log('nuevos valores', data);

                try {
                    await API.post( '/publications', data ); // post data to server
                    form.resetFields();
                    await afterCreate();
                    setFileList( [] );
                    setImageUrl( null );
                } catch( e ) {
                    const errorList = e.error && <ErrorList errors={ e.error } />;
                    message.error( <>{ translateMessage( e.message ) }{ errorList }</> );
                }
            } )
            .catch( info => {
                console.log( 'Validate Failed:', info );
            } );

    };

    const afterCreate = async () => {
        await mutate('//publications', async products => {
            return {data: [{}, ...products.data]};
        },false);
    };




    const normPhotoFile = e => {
        console.log( 'Upload event:', e );
        const file = e.file;
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if( !isJpgOrPng ) {
            message.error( 'La imagen debe tener formato JPG o PNG' );
            setFileList( [] );
            setImageUrl( null );
            return null;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if( !isLt2M ) {
            message.error( 'La imagen debe ser menor a 2MB' );
            setFileList( [] );
            setImageUrl( null );
            return null;
        }

        if( file.status === 'removed' ) {
            setFileList( [] );
            setImageUrl( null );
            return null;
        }

        getBase64( e.file, imageUrl => setImageUrl( imageUrl ) );

        if( Array.isArray( e ) ) {
            return e;
        }

        console.log( 'e.file', e.file );
        console.log( 'e.fileList', e.fileList );
        setFileList( [ file ] );

        return e && [ e.file ];
    };

    if (isLoading) {
        return <Row>
            {
                [...new Array(9)].map((_, i) =>
                    <Col xs={24} sm={12} md={8} style={{marginBottom: 30}} key={i}>
                        <div style={{textAlign: 'center'}}>
                            <Skeleton.Image style={{width: 200}}/>
                            <Card title='' extra='' cover='' loading/>
                        </div>
                    </Col>
                )
            }
        </Row>;
    }

    if (isError) {
        return <ShowError error={isError}/>;
    }

    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar id={"toolbar"}>
                       <IonTitle id={"letter"}>
                            <div slot={"start"} className="menu">
                                <Layouts />
                            </div>
                            Registro de publicaciones
                       </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <br/>
                    <IonImg src={viveres} style={{width:"125px", height:"125px", display:"block", margin:"auto"}}/>
                <br/>
                    <Form
                        className='login-form'
                        form={form}
                          initialValues={{
                              remember: true,
                          }}
                          onFinish={onCreate}
                    >
                        <Form.Item name='affair'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingresa un asunto'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input  placeholder='Nombre del Producto'/>
                        </Form.Item>
                
                        <Form.Item name='details'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingresa el detalle de la práctica preprofesional'
                                       },
                                   ]}
                                   hasFeedback
                        >
                            <Input.TextArea  placeholder='Detalle de la práctica preprofesional'/>
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
                            <Input  placeholder='Horas'/>
                        </Form.Item>
                        
                        <Form.Item name='location'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Dirección'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input  placeholder='Dirección'/>
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
                            <Input  placeholder='Número de telefóno'/>
                        </Form.Item>
                        
                        <Form.Item name='publication_date'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Fecha de Publicación'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input  placeholder='Fecha de Publicación'/>
                        </Form.Item>

                        <Form.Item name='category_id'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingresa una categoría'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Select placeholder={'Categorías'}>
                                {
                                    categories.isLoading
                                    ? <div>Cargando...</div>
                                    : categories.isError
                                    ? <ShowError error={categories.isError} />
                                    : categories.categories.map((category, i)=>
                                    <Option value={category.id} key={i}>{category.name}</Option>
                                    )
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <IonButton type='primary' htmlType='submit' className='login-form-button'>
                                Registrar Publicación
                            </IonButton>
                        </Form.Item>
                    </Form>
           </IonPage>
        </>
    );
};

export default RegisterProduct;
