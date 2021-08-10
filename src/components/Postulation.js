import React, {useState} from 'react';
import API from '../data/index';
import {Select,Card,Skeleton, Col, Form, Input, message, Upload, Row,Space,DatePicker} from 'antd';
import ErrorList from '../components/ErrorList';
import {translateMessage} from '../utils/translateMessage';
//import '../styles/register.css';
import {Link} from 'react-router-dom';
import {IonImg,IonButton, IonCol, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, IonSelect,IonDatetime} from "@ionic/react";
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
import registro from '../images/registro2.png'


const { Option } = Select;

function getBase64( file, callback ) {
    console.log( 'file', file );
    const reader = new FileReader();
    reader.addEventListener( 'load', () => callback( reader.result ) );
    reader.readAsDataURL( file );
}

const Postulation = () => {

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
                data.append( 'curriculum', values.curriculum[ 0 ] );

                console.log('nuevos valores de postulaciones', data);

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
        await mutate('/publications', async products => {
            return {data: [{}, ...products.data]};
        },false);
    };




    const normPhotoFile = e => {
        console.log( 'Upload event:', e );
        const file = e.file;
        const isJpgOrPng = file.type === 'document/pdf';
        if( !isJpgOrPng ) {
            message.error( 'El docuemnto debe ser PDF' );
            setFileList( [] );
            setImageUrl( null );
            return null;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if( !isLt2M ) {
            message.error( 'El documento debe ser menor a 2MB' );
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

    function onChange(date, dateString) {
        console.log(date, dateString);
    }
    return (
        <>
        
            <IonPage>
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
                        <Form.Item name='curriculum'
                                   label='Curriculum del Estudiante'
                                   valuePropName='fileList'
                                   getValueFromEvent={ normPhotoFile }
                                   rules={ [
                                       {
                                           required: true,
                                           message: 'Curriculum'
                                       }
                                   ] }
                        >
                            <Upload name='files'
                                    accept='document/pdf'
                                    listType='picture-card'
                                    multiple={ false }
                                    showUploadList={ false }
                                    beforeUpload={ () => false }
                                    fileList={ fileList }
                            >
                                { imageUrl
                                    ? <document src={ imageUrl } alt='Documento' style={ { width: '100px' } } />
                                    : <div>
                                        <PlusOutlined />
                                        <div className='ant-upload-text'>Subir documento PDF</div>
                                    </div> }
                            </Upload>
                        </Form.Item>

                        <Form.Item>
                        <Link to={ Routes.CLIENTPRODUCTS}>
                            <IonButton type='primary' htmlType='submit' className='login-form-button'>
                                Enviar
                            </IonButton>
                        </Link>
                        </Form.Item>
                    </Form>
           </IonPage>
        </>
    );
};

export default Postulation;