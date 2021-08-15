import React, {useState} from 'react';
import API from '../data/index';
import {Select,Card,Skeleton, Col, Form, Input, message, Upload, Row,Space,DatePicker} from 'antd';
import ErrorList from '../components/ErrorList';
import {translateMessage} from '../utils/translateMessage';
//import '../styles/register.css';
import {Link} from 'react-router-dom';
import {IonImg,IonButton, IonCol, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, IonSelect,IonDatetime} from "@ionic/react";
import {arrowBack} from "ionicons/icons";
import {useRequests} from "../data/useRequests";
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
    const {isLoading, isError, mutate} = useRequests();
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
                data.append( 'languages', values.languages);
                data.append( 'type', values.type );
                data.append( 'work_experience', values.work_experience);
                data.append( 'career', values.career);
                data.append( 'status', values.status );
                data.append( 'category_id', values.category_id );
                console.log('nuevos valores de postulaciones', data);

                try {
                    await API.post( '/postulations', data ); // post data to server
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
        await mutate('/postulations', async products => {
            return {data: [{}, ...products.data]};
        },false);
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
                        <Form.Item name='languages'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Escriba los lenguajes que domina'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input  placeholder='Lenguajes'/>
                        </Form.Item>
                        
                        <Form.Item name='type'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Tipo de Entrevista'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Select placeholder={'Tipo de Entrevista'}>
                                <Option value='online'>En Linea</Option>
                                <Option value='face'>Presencial</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name='work_experience'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Detalles de Experiencia'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input.TextArea  placeholder='Experiencia'/>
                        </Form.Item>
                        
                        <Form.Item name='career'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Escriba en que semestre esta'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input  placeholder='Semestre'/>
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