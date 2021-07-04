import React from 'react';
import Routes from '../constants/routes';
import API from '../data/index';
import { Form, Input, message, Select} from 'antd';
import {
    LockOutlined,
    UserOutlined,
    MailOutlined,
    BookOutlined,
    ProfileOutlined,
} from '@ant-design/icons';
import ErrorList from '../components/ErrorList';
import {translateMessage} from '../utils/translateMessage';
import withoutAuth from '../hocs/withoutAuth';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import {useAuth} from '../providers/Auth';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons/lib';
import {IonButton, IonCol, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonTitle, IonToolbar,IonSelectOption} from "@ionic/react";
import NumberOutlined from "@ant-design/icons/lib/icons/NumberOutlined";
import {arrowBack} from "ionicons/icons";
import logo from '../images/logo.png';
import "../theme/toolbar.css";
import '../theme/register.css';


const RegisterUser = () => {

    const {setAuthenticated, setCurrentUser} = useAuth();
    const role = 'ROLE_CLIENT';

    const onFinish = async (userData) => {
        console.log('Received values of form: ', userData);
        const {name, email, home_number, password, password_confirmation} = userData;

        try {
            const user = await API.post('/register', {
                name,
                email,
                home_number,
                password,
                password_confirmation,
                role
            });

            console.log('User', user);

            localStorage.setItem('login', JSON.stringify(true)); // this is to sync auth state in local storage
            Cookies.set('token', user.data.token, {expires: 1});
            API.headers['Authorization'] = 'Bearer ' + user.data.token; // start sending authorization header
            delete user.data.token;
            setCurrentUser(user.data);
            setAuthenticated(true);
        } catch (e) {
            console.error('No se pudo registrar el usuario', e);
            setAuthenticated(false);
            const errorList = e.error && <ErrorList errors={e.error}/>;
            message.error(<>{translateMessage(e.message)}{errorList}</>);
        }
    };

    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar id={"toolbar"}>
                       <IonTitle className="iontitle" id={"letter"}>
                           <IonRow>
                               <IonCol size={2}>
                                   <Link to={ Routes.LOGIN}>
                                        <IonIcon id={"icon"} icon={arrowBack} slot="start" style={{width:"23px", height:"23px"}} className="ionicon" />
                                    </Link>
                               </IonCol>
                               <IonCol size={2}>
                                    Registro
                               </IonCol>
                           </IonRow>
                       </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <br></br>
                <IonImg src={logo} style={{width:"100px", height:"100px", display:"block", margin:"auto"}}/>
                <br></br>
                    <Form name='register-form'
                          className='register-form'
                          initialValues={{
                              email: '',
                              password: ''
                          }}
                          onFinish={onFinish}
                    >
                        <Form.Item name='name'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingresa tu nombre'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input prefix={<UserOutlined/>} placeholder='Nombre Completo'/>
                        </Form.Item>
                        <Form.Item name='last_name'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingresa tu apellido'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input prefix={<UserOutlined/>} placeholder='Apellido Completo'/>
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
                            <Input prefix={<NumberOutlined/>} placeholder='Número de telefóno'/>
                        </Form.Item>
                        <Form.Item name='email'
                                   rules={[
                                       {
                                            required: true,
                                            message: 'Ingresa tu email'
                                       },
                                       {
                                            type: 'email',
                                            message: 'Ingresa un correo válido'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input prefix={<MailOutlined/>} placeholder='Email'/>
                        </Form.Item>

                        <Form.Item name='password'
                                   rules={[
                                        {
                                            required: true,
                                            message: 'Ingresa tu contraseña',
                                        },
                                        {
                                            min: 6,
                                            message: 'La longitud de ser mínimo 6 caracteres',
                                        }
                                   ]}
                                   hasFeedback
                        >
                            <Input.Password prefix={<LockOutlined/>}
                                            iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                            placeholder='Contraseña'/>
                        </Form.Item>

                        <Form.Item name='password_confirmation'
                                   dependencies={['password']}
                                   hasFeedback
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Confirma tu contraseña',
                                       },
                                       ({getFieldValue}) => ({
                                           validator(rule, value) {
                                               if (!value || getFieldValue('password') === value) {
                                                   return Promise.resolve();
                                               }
                                               return Promise.reject('Las contraseñas no coinciden');
                                           },
                                       }),
                                   ]}
                        >
                            <Input.Password prefix={<LockOutlined/>}
                                            iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                            placeholder='Confirma tu contraseña'/>
                        </Form.Item>
            
                        <Form.Item name='role'
                                   hasFeedback
                        >
                            <Select prefix={<ProfileOutlined/>} placeholder='Escoge el rol'>
                                <IonSelectOption name='business'>Empresa</IonSelectOption>
                                <IonSelectOption name='student'>Estudiante</IonSelectOption>
                            </Select>
                            
                        </Form.Item>
                    
                        <Form.Item name='description'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingresa una pequeña descripción'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input prefix={<BookOutlined/>} placeholder='Descripción'/>
                        </Form.Item>
                        <Form.Item>
                            <IonButton type='primary' htmlType='submit' className='login-form-button'>
                                Registrar
                            </IonButton>
                        </Form.Item>
                    </Form>
           </IonPage>
        </>
    );
};

export default withoutAuth(RegisterUser);

