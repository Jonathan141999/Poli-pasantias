import React from 'react';
import Routes from '../constants/routes';
import API from '../data/index';
import { Form, Input, message, Select } from 'antd';
import Layouts from '../components/Layout';
import {
    LockOutlined,
    UserOutlined,
    MailOutlined,
    BookOutlined,
    ProfileOutlined,
} from '@ant-design/icons';
import ErrorList from '../components/ErrorList';
import { translateMessage } from '../utils/translateMessage';
import withoutAuth from '../hocs/withoutAuth';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../providers/Auth';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons/lib';
import { IonButton, IonCol, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonTitle, IonToolbar, IonSelectOption, IonSelect } from "@ionic/react";
import NumberOutlined from "@ant-design/icons/lib/icons/NumberOutlined";
import { arrowBack } from "ionicons/icons";
import logo from '../images/update.jpg';
import "../theme/toolbar.css";
import '../theme/register.css';
import withAuth from '../hocs/withAuth';
//import Loading from './Loading';
const EditUserPage = (props) => {

    const { currentUser } = useAuth();

    const onFinish = async (userData) => {
        console.log('Los Datos del formulario son: ', userData);
        console.log(currentUser);
        const { email, phone, description } = userData;
        try {
            await API.put('/users/' + currentUser.id, {
                phone,
                email,
                description
            });
            message.success("Usuario Acutalizado Correctamente");
        } catch (e) {
            console.error('No se pudo actualizar los campos', e);
            const errorList = e.error && <ErrorList errors={e.error} />;
            message.error(<>{translateMessage(e.message)}{errorList}</>);
        }
    };

    return (
        <>
            <IonPage>
                <div style={{ padding: "18px" }}>
                    <IonImg src={logo} style={{ width: "100px", height: "100px", display: "block", margin: "auto" }} />
                </div>
                <br></br>
                <IonRow style={{ padding: "10px" , display: "block"  }}>
                    <Form name='register-form'
                        onFinish={onFinish}
                    >
                        <Form.Item name='phone'
                            rules={[
                                {
                                    required: true,
                                    message: 'Ingresa tu n??mero telef??nico'
                                },
                                {
                                    min: 10,
                                    max: 13,
                                    message: 'El n??mero telef??nico debe tener 10 d??gitos'
                                }
                            ]}
                            hasFeedback
                        >
                            <Input prefix={<NumberOutlined />} placeholder='N??mero de telef??no' />
                        </Form.Item>
                        <Form.Item name='email'
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: 'Ingresa tu email'
                                },
                                {
                                    type: 'email',
                                    whitespace: true,
                                    message: 'Ingresa un correo v??lido'
                                }
                            ]}
                            hasFeedback
                        >
                            <Input prefix={<MailOutlined />} placeholder='Email' />
                        </Form.Item>

                        <Form.Item name='description'
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: 'Ingresa una peque??a descripci??n'
                                }
                            ]}
                            hasFeedback
                        >
                            <Input.TextArea prefix={<BookOutlined />} placeholder='Descripci??n, Ejemplo: Hobbie, Gustos o Pasatiempo' />
                        </Form.Item>

                        <Form.Item>
                            <Link to={Routes.PROFILE}>
                                <IonButton type='primary' htmlType='submit' className='login-form-button'>
                                    Actualizar
                                </IonButton>
                            </Link>
                        </Form.Item>
                    </Form>
                </IonRow>
            </IonPage>
        </>
    );
};

export default EditUserPage;