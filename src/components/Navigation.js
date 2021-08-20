import React, {useState} from 'react';
import Routes from '../constants/routes.js';
import {useAuth} from '../providers/Auth';
import {Menu} from 'antd';
import {LogoutOutlined, LoadingOutlined, PlusCircleOutlined, FormOutlined, NotificationOutlined, UserOutlined, MonitorOutlined} from '@ant-design/icons';
import {Link, useLocation} from 'react-router-dom';
import '../theme/navigation.css';
import '../theme/app.css';
import user from '../images/user.png';
import user1 from '../images/user1.png';
import {
    IonAvatar,
    IonItem,
    IonLabel,
  } from '@ionic/react';

const linkStyle = {};

const Navigation = (props) => {
    let location = useLocation();

    const [menuState, setMenuState] = useState({
        current: location.pathname, // set the current selected item in menu, by default the current page
        collapsed: true,
        openKeys: []
    });
    const {isAuthenticated, isCheckingAuth, currentUser} = useAuth();

    React.useEffect(() => {
        setMenuState({
            ...menuState,
            current: location.pathname
        });
    }, [location, isAuthenticated]);

    const handleClick = (e) => {
        console.log('click ', e);
        setMenuState({
            ...menuState,
            current: e.key
        });
    };

    return (
        <>
            
           <Menu
                mode={props.mode}
                onClick={handleClick}
                className='menu'
                theme='dark'
                //theme='light'
                selectedKeys={[menuState.current]}
                style={{
                    lineHeight: '64px',
                    width: 'fit-content'
                }}
            > 
                <IonItem>
                    {currentUser.role==='ROLE_ADMIN' || currentUser.role==='ROLE_BUSINESS'
                    ?<IonAvatar slot="end" style={{marginTop:"-18px"}}>
                        <img src={user1} />
                    </IonAvatar>
                    :<IonAvatar slot="end" style={{marginTop:"-18px"}}>
                    <img src={user} />
                    </IonAvatar>
                    }
                    <IonLabel>
                        <h3>{currentUser.name} {currentUser.last_name}</h3>
                        <p>{currentUser.email}</p>
                    </IonLabel> 
                </IonItem>
                {currentUser.role==='ROLE_ADMIN' || currentUser.role==='ROLE_BUSINESS'
                ?   <Menu.Item key={Routes.OWNERPRODUCTS} icon={<FormOutlined/>} >
                        <Link to={Routes.OWNERPRODUCTS} style={linkStyle}>Publicaciones</Link>
                    </Menu.Item>
                :   <Menu.Item key={Routes.CLIENTPRODUCTS} icon={<FormOutlined/>} >
                        <Link to={Routes.CLIENTPRODUCTS} style={linkStyle}>Inicio</Link>
                    </Menu.Item>
                }
                {currentUser.role==='ROLE_ADMIN' || currentUser.role==='ROLE_BUSINESS'
                ?   <Menu.Item key={Routes.REGISTERPRODUCT} icon={<PlusCircleOutlined/>} >
                        <Link to={Routes.REGISTERPRODUCT} style={linkStyle}>Registrar Publicación</Link>
                    </Menu.Item>
                :   <Menu.Item key={Routes.DAILYORDER} icon={<PlusCircleOutlined/>} >
                        <Link to={Routes.DAILYORDER} style={linkStyle}>Postulación</Link>
                    </Menu.Item>
                }
                {currentUser.role==='ROLE_ADMIN' || currentUser.role==='ROLE_BUSINESS'
                ?   <><Menu.Item key={Routes.NEWORDER} icon={<NotificationOutlined/>} >
                        <Link to={Routes.NEWORDER} style={linkStyle}>Nuevas Postulaciones</Link>
                    </Menu.Item>
                    <Menu.Item key={Routes.PROFILE} icon = {<UserOutlined/>}>
                        <Link to={Routes.PROFILE} style={linkStyle}>Perfil de Usuario</Link>
                    </Menu.Item></>
                :   <Menu.Item key={Routes.PROFILE} icon = {<UserOutlined/>}>
                        <Link to={Routes.PROFILE} style={linkStyle}>Perfil de Usuario</Link>
                    </Menu.Item>
                }
                <Menu.Item key={Routes.LOGIN}>
                    <Link to={Routes.LOGOUT} className='logout-link'>
                    {
                        isCheckingAuth
                        ? <LoadingOutlined/>
                        : <><LogoutOutlined/> Cerrar Sesión</>
                    }
                    </Link>
                 </Menu.Item>
                 
            </Menu>
        </>
    );
};

export default Navigation;

