import React from 'react';
import Navigation from './Navigation';
import {Col, Popover, Button} from 'antd';
import '../theme/app.css';



/**
 * Este componente renderiza los elementos comunes para toda la aplicación
 *
 * Header (menu), Content y Footer
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MainLayout = props => {
    console.log('props', props);

    return (

      <Col xs={ 2 } align='right' className='responsive-menu-button'>
        <Popover content={ <Navigation mode='vertical' /> }
          trigger='click'
          placement='bottomLeft'
          overlayClassName='responsive-menu-wrapper'
          >
          <Button type='primary' slot={"start"}>
            <svg viewBox='64 64 896 896'
              focusable='false'
              className=''
              data-icon='menu'
              width='1em'
              height='1em'
              fill='currentColor'
              aria-hidden='true'>
              <path d='M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z'></path>
            </svg>
          </Button>
        </Popover>
      </Col>
    );
};

export default MainLayout;
