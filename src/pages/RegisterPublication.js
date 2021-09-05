import React, {useState} from 'react';
import API from '../data/index';
import {Select,Card,Skeleton, Col, Form, Input, message, Upload, Row,Space,DatePicker} from 'antd';
import ErrorList from '../components/ErrorList';
import {translateMessage} from '../utils/translateMessage';
//import '../styles/register.css';
import {Link} from 'react-router-dom';
import {IonImg,IonLoading, IonButton, IonCol, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, IonAlert,IonDatetime} from "@ionic/react";
import {arrowBack} from "ionicons/icons";
import {useProducts} from "../data/useProducts";
import ShowError from "../components/ShowError";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import {useCategories} from "../data/useCategories";
import "../theme/toolbar.css";
import Layouts from '../components/Layout';
import '../theme/app.css';
import '../theme/login.css';
import Routes from '../constants/routes';
import registro from '../images/registro.png'


const { Option } = Select;

function getBase64( file, callback ) {
    console.log( 'file', file );
    const reader = new FileReader();
    reader.addEventListener( 'load', () => callback( reader.result ) );
    reader.readAsDataURL( file );
}

const RegisterPublication = () => {

    const [ form ] = Form.useForm();
    const {isLoading, isError, mutate} = useProducts();
    const [ imageUrl, setImageUrl ] = useState( null );
    const [ fileList, setFileList ] = useState( [] );
    const [showAlert1, setShowAlert1] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const categories = useCategories();

    const onCreate = async values => {
        console.log( 'Received values of form: ', values );


        form.validateFields()
            .then( async( values ) => {
                console.log( 'values', values );


                // use form data to be able to send a file to the server
                const data = new FormData();
                data.append( 'name', values.name);
                data.append( 'location', values.location );
                data.append( 'phone', values.phone);
                data.append( 'email', values.email);
                data.append( 'hour', values.hour );
                data.append( 'type', values.type);
                data.append( 'details', values.details);
                data.append( 'image', values.image[ 0 ] );
                data.append( 'category_id', values.category_id );

                console.log('nuevos valores de publicaciones', data);

                try {
                    await API.post( '/publications', data ); // post data to server
                    form.resetFields();
                    await afterCreate();
                    setFileList( [] );
                    setImageUrl( null );
                    setShowLoading(false);
                    message.success('Publicación registrada con éxito');
                } catch( e ) {
                    
                    const errorList = e.error && <ErrorList errors={ e.error } />;
                    message.error( <>{ translateMessage( e.message ) }{ errorList }</> );
                    message.error('Nose pudo registrar la publicación');
                }
            } )
            .catch( info => {
                console.log( 'Validate Failed:', info );
            } );

    };

    const afterCreate = async () => {
        await mutate('/publications', async products => {
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
                            <div slot={"start"} className="menu">
                                <Layouts />
                            </div>
                            <IonTitle id={"letter"}>Registro de Publicación </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <br/>
                    <IonImg src={registro} style={{width:"125px", height:"125px", display:"block", margin:"auto"}}/>
                <br/>
                    <Form
                        className='login-form'
                        form={form}
                          initialValues={{
                              remember: true,
                          }}
                          onFinish={onCreate}
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
                            <Input  placeholder='Nombre de la Publicación'/>
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

                        <Form.Item name='email'
                                   rules={[
                                       {
                                            required: true,
                                            message: 'Email Empresarial'
                                       },
                                       {
                                            type: 'email',
                                            message: 'Ingresa un correo válido'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input placeholder='Email de la Empresa'/>
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
                        
                        <Form.Item name='type'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Tipo de Empresa'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Select placeholder={'Tipo de Empresa'}>
                                <Option value='public'>Pública</Option>
                                <Option value='private'>Privada</Option>
                            </Select>
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
                            <Input.TextArea  placeholder='Detalles de la práctica'/>
                        </Form.Item>
                        
                        <Form.Item name='image'
                                   label='Imagen del logo de la Empresa'
                                   valuePropName='fileList'
                                   getValueFromEvent={ normPhotoFile }
                                   rules={ [
                                       {
                                           required: true,
                                           message: 'Imagen del logo'
                                       }
                                   ] }
                        >
                            <Upload name='files'
                                    accept='image/jpeg,image/png'
                                    listType='picture-card'
                                    multiple={ false }
                                    showUploadList={ false }
                                    beforeUpload={ () => false }
                                    fileList={ fileList }
                            >
                                { imageUrl
                                    ? <img src={ imageUrl } alt='Foto' style={ { width: '100px' } } />
                                    : <div>
                                        <PlusOutlined />
                                        <div className='ant-upload-text'>Subir logo</div>
                                    </div> }
                            </Upload>
                        </Form.Item>

                        <Form.Item name='category_id'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Escoge una carrera'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Select placeholder={'Escoge una carrera'}>
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
                    <IonLoading
                    isOpen={showLoading}
                    onDidDismiss={()=>setShowLoading(false)}
                    message={'Por favor espere...'}
                    />
                    <IonAlert
                    isOpen={showAlert1}
                    onDidDismiss={()=>setShowAlert1(false)}
                    cssClass={'my-custom-class'}
                    header={'Registro Exitoso'}
                    message={'Se Registro correctamente'}
                    buttons={['Aceptar']}
                    />
           </IonPage>
        </>
        
    );
};

export default RegisterPublication;
