import {useProducts} from "../data/useProducts";
import {Row, Col, Skeleton, Form, Input, message, Modal, Card} from "antd";
import React, {useState} from "react";
import {
    IonButton,
    IonCard, IonCardContent,
    IonCardSubtitle, IonImg,
    IonCardTitle, IonCol,
    IonRow, IonToolbar, IonLoading,
} from "@ionic/react";
import API from "../data";
import {useProduct} from "../data/useProduct";
import {translateMessage} from "../utils/translateMessage";
import {useSearchProduct} from "../data/useSearchProduct";
import Search from "antd/es/input/Search";
import "../theme/toolbar.css";




const ProductOwnerList = () => {

    const { products, isLoading, isError, mutate } = useProducts();
    const [idProduct, setIdProduct]=useState('')
    const [showInfo, setShowInfo] = useState(false);
    const [showLoading, setShowLoading] = useState(false)
    const [ form ] = Form.useForm();

    const [search, setSearch]=useState('');

    const {searchProduct}=useSearchProduct(search);

    console.log("publicaciones", products);

    console.log("busqueda", searchProduct);

    const product = useProduct(idProduct);
    console.log('info publicacion', product);

    const onUpdate = async values => {
        console.log( 'Received values of form: ', values );

        form.validateFields()
            .then( async( values ) => {
                setShowLoading(true);
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
                    setShowLoading(false);
                    setShowInfo(false);

                } catch( error ) {
                    console.error(
                        'You have an error in your code or there are Network issues.',
                        error
                    );
                    setShowLoading(false);
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
        console.log('publicacions', value);
        setSearch(value);
    };

    if( isLoading ) {
        return <Row justify='center' gutter={ 30 }>
            {
                [ ...new Array( 9 ) ].map( ( _, i ) =>
                    <Col xs={ 24 } sm={ 12 } md={ 8 } style={ { marginBottom: 30 } } key={ i }>
                        <div style={ { textAlign: 'center' } }>
                            <br/>
                            <Skeleton.Image style={ { width: 200 } } />
                            <Card title='' extra='' cover='' loading />
                        </div>
                    </Col>
                )
            }
        </Row>;
    }

    if( isError ) {
        return "";
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
                    <IonToolbar>
                        <Search placeholder="Ingrese nombre del la publicación" onSearch={onSearch} enterButton />
                    </IonToolbar>
                    <IonRow style={{display:"block"}}>
            {
                searchProduct ?
                    searchProduct.map((search, i)=>(
                        <IonCol  size="6">
                            <IonCard key={i} onClick={()=>showDetail(search.id)} >
                            <IonImg style={{ height: "100px"}} src={ `http://localhost:8000/storage/${ search.image }` }
                                                />
                                <IonCardContent>
                                    <IonCardTitle><p>{search.name}</p></IonCardTitle>
                                    <IonCardSubtitle><strong>Dirección: </strong>{search.location}</IonCardSubtitle>
                                    <IonCardSubtitle><strong>Horas: </strong>{search.hour}</IonCardSubtitle>
                                    <IonCardSubtitle><strong>Carrera: </strong>{search.category}</IonCardSubtitle>                                
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    ))
                    :
                    products ?
                products.map((product,i)=>(
                    <IonCol size="6">
                    <IonCard key={i} onClick={()=>showDetails(i)} >
                        <IonImg style={{ height: "100px"}} src={ `http://localhost:8000/storage/${ product.image }` }
                                                />
                        <IonCardContent>
                            <IonCardTitle><p>{product.name}</p></IonCardTitle>
                            <IonCardSubtitle><strong>Dirección: </strong>{product.location}</IonCardSubtitle>
                            <IonCardSubtitle><strong>Horas: </strong>{product.hour}</IonCardSubtitle>
                            <IonCardSubtitle><strong>Carrera: </strong>{product.category}</IonCardSubtitle>
                        </IonCardContent>
                    </IonCard>
                    </IonCol>
                ))
                : "Cargando..."
            }
                </IonRow>
            {
                product.isLoading
                    ? <div>Cargando...</div>
                    : product.isError
                    ? " "
                    : <>
                        <Modal  title="Publicaciones" style={{background:"blue"}}
                                visible={showInfo}
                                closable={false}
                                footer={[
                                    <IonButton type='primary' htmlType='submit' className='login-form-button' onClick={onUpdate}>Actualizar</IonButton>,
                                    <IonButton onClick={()=>setShowInfo(false)}>Cancelar</IonButton>
                                ]}
                        >

                                <Form
                                    className="register-form"
                                    layout="vertical"
                                    form={form}
                                    initialValues={{
                                        remember: true,
                                    }}
                                >
                                    <Form.Item label="Nombre de Empresa" name='name' hasFeedback>
                                        <Input  placeholder={product.product.name}/>
                                    </Form.Item>
                                    <Form.Item label="Dirección" name='location'>
                                        <Input placeholder={product.product.location}/>
                                    </Form.Item>
                                    <Form.Item label="Telefono" name='phone'>
                                        <Input type="number" min="7" max="13" placeholder={product.product.phone}/>
                                    </Form.Item>
                                    <Form.Item label="Horas a Ofertar" name='hour'>
                                        <Input placeholder={product.product.hour}/>
                                    </Form.Item>
                                    <Form.Item label="Descripcion de la práctica preprofesional" name='details'>
                                        <Input.TextArea placeholder={product.product.details}/>
                                    </Form.Item>
                                </Form>
                        </Modal>
                    </>
            }
            <IonLoading
                isOpen={showLoading}
                onDidDismiss={()=>setShowLoading(false)}
                message={'Por favor espere...'}
            />
        </>
    );
};

export default ProductOwnerList;