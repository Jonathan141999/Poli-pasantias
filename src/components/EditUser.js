import React from 'react';
import Routes from '../constants/routes';
import API from '../data/index';
import { Form, Input, message, Select} from 'antd';
import Layouts from '../components/Layout';
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
import {IonButton, IonCol, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonTitle, IonToolbar,IonSelectOption,IonSelect} from "@ionic/react";
import NumberOutlined from "@ant-design/icons/lib/icons/NumberOutlined";
import {arrowBack} from "ionicons/icons";
import logo from '../images/update.jpg';
import "../theme/toolbar.css";
import '../theme/register.css';


const EditUserPage = () => {
    
    const {setAuthenticated, setCurrentUser} = useAuth();

    const onFinish = async (userData) => {
        console.log('Received values of form: ', userData);
        const {name,last_name, email, phone, password, password_confirmation,direction,role,description} = userData;

        try {
            const user = await API.put('/users/'+ user.id ,{
                phone,
                email,
                description
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
/*  
    const { user } = useAuth();
    const classes = useStyles();
    const { data, error } = useSWR(`/users/` + user.id, fetcher);
        console.log("data", data);
    const { register, handleSubmit, control, errors } = useForm();

    const [state, setState] = useState("");

    if (error)
        return <div>No se pueden cargar los datos del usuario a modificar</div>;
    if (!data) return <Loading />;

    const handleChange = (event) => {
        setState(event.target.value);
    };

    const onSubmit = async (data) => {
        console.log("data", data);
        try {
        const response = await api.put("/users/" + user.id, data);
        console.log("user", response);
        swal({
            title: "Perfil actualizado!",
            icon: "success",
            button: "Aceptar",
            timer: "3000",
        });
        return response;
        } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            swal({
            title: translateMessage(error.response.data.error),
            text: "No se pudo editar su perfil",
            icon: "error",
            button: "Aceptar",
            timer: "2000",
            });
            console.log(error.response.data);
            return Promise.reject(error.response);
            // return error.response;
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
        console.log(error.config);
        }
    };

    console.log("Id del usuario", user.id);
*/
    return (
        <>
            <IonPage>
                <div style={{padding: "18px"}}>
                    <IonImg src={logo} style={{width:"100px", height:"100px", display:"block", margin:"auto"}}/>
                </div>
                <br></br>
                    <Form name='register-form'
                          className='register-form'
                          initialValues={{
                              email: '',
                              password: ''
                          }}
                          onFinish={onFinish}
                    >
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

                        <Form.Item name='description'
                                   rules={[
                                     {
                                    required: true,
                                     message: 'Ingresa una pequeña descripción'
                                     }
                                   ]}
                                   hasFeedback
                        >
                            <Input.TextArea prefix={<BookOutlined/>} placeholder='Descripción, Ejemplo: Hobbie, Dedicación, Gustos,'/>
                        </Form.Item>
                        
                        <Form.Item>
                        <Link to={ Routes.PROFILE}>
                            <IonButton type='primary' htmlType='submit' className='login-form-button'>
                                Actualizar
                            </IonButton>
                        </Link>
                        </Form.Item>                     
                    </Form>
           </IonPage>
        </>
    );
};

export default EditUserPage;