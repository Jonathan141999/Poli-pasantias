import {useProducts} from "../data/useProducts";
import {Row, Col, Skeleton, Form, Input, message, Modal} from "antd";
import React, {useState} from "react";
import ShowError from "./ShowError";
import {
    IonButton,
    IonCard, IonCardContent, IonCardHeader,
    IonCardSubtitle,
    IonCardTitle, IonCol, IonGrid, IonHeader, IonImg,
    IonItem, IonModal, IonPage,
    IonRow, IonThumbnail, IonTitle, IonToolbar,
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
    const [ form ] = Form.useForm();

    const [search, setSearch]=useState('');

    const {searchProduct}=useSearchProduct(search);

    console.log("productos", products);

    console.log("busqueda", searchProduct);

    const product = useProduct(idProduct);
    console.log('info product', product);

    const onUpdate = async values => {
        console.log( 'Received values of form: ', values );

        form.validateFields()
            .then( async( values ) => {
                try {
                    await API.put( `/products/${idProduct}`, {
                        name: values.name,
                        stock: parseInt(product.product.stock) + parseInt(values.stock),
                        price: values.price,
                    } ); // post data to server
                    form.resetFields();
                    await afterCreate();
                    setShowInfo(false);

                } catch( error ) {
                    console.error(
                        'You have an error in your code or there are Network issues.',
                        error
                    );
                    message.error( translateMessage( error.message ) );
                }
            } )
            .catch( info => {
                console.log( 'Validate Failed:', info );
            } );

    };

    const afterCreate = async () => {
        await mutate('/products');
    };

    const onSearch = value =>{
        console.log('producto', value);
        setSearch(value);
    };

    if( isLoading ) {
        return <Row justify='center' gutter={ 30 }>
            {
                [ ...new Array( 9 ) ].map( ( _, i ) =>
                    <Col xs={ 24 } sm={ 12 } md={ 8 } style={ { marginBottom: 30 } } key={ i }>
                        <div style={ { textAlign: 'center' } }>
                            <Skeleton.Image style={ { width: 200 } } />
                            <IonCard title='' extra='' cover='' loading />
                        </div>
                    </Col>
                )
            }
        </Row>;
    }

    if( isError ) {
        return <ShowError error={ isError } />;
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
            <IonGrid>
                <IonRow>
                    <IonToolbar>
                        <Search placeholder="input search text" onSearch={onSearch} enterButton />
                    </IonToolbar>
            {
                searchProduct ?
                    searchProduct.map((search, i)=>(
                        <IonCol  size="6">
                            <IonCard key={i} onClick={()=>showDetail(search.id)} >
                                    <IonImg src={ `http://localhost:8000/storage/${ search.image }` }
                                         style={{height: "100px"}}/>
                                         <IonCardHeader>
                                             <IonCardTitle>{search.name}</IonCardTitle>
                                         </IonCardHeader>

                                <IonCardContent>
                                    <IonCardSubtitle>{search.price.toFixed(2)}</IonCardSubtitle>
                                    <IonCardSubtitle><strong>Stock: </strong>{search.stock}</IonCardSubtitle>
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
                        <IonCardHeader>
                            <IonCardTitle>{product.name}</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonCardSubtitle>{product.price.toFixed(2)}</IonCardSubtitle>
                            <IonCardSubtitle><strong>Stock: </strong>{product.stock}</IonCardSubtitle>
                        </IonCardContent>
                    </IonCard>
                    </IonCol>
                ))
                : "Cargando..."
            }
                </IonRow>
            </IonGrid>
            {
                product.isLoading
                    ? <div>Cargando...</div>
                    : product.isError
                    ? <ShowError error={product.isError}/>
                    : <>
                        <Modal  title="Producto" style={{background:"blue"}}
                                visible={showInfo}
                                closable={false}
                                footer={[
                                    <IonButton type='primary' htmlType='submit' className='login-form-button' onClick={onUpdate}>
                                        Actualizar
                                    </IonButton>,
                                    <IonButton onClick={()=>setShowInfo(false)}>Cancelar</IonButton>
                                ]}
                        >
                                <IonRow>
                                    <IonCol/>
                                    <IonCol>
                                        <IonItem>
                                            <IonThumbnail style={{width: "100px", height:"100px"}}>
                                                <IonImg src={ `http://localhost:8000/storage/${ product.product.image }` }
                                                />
                                            </IonThumbnail>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol/>
                                </IonRow>

                                <Form
                                    form={form}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    //onFinish={onUpdate}
                                >
                                    <Form.Item name='name'
                                               hasFeedback
                                     >
                                        <Input  placeholder={product.product.name}/>
                                    </Form.Item>
                                    <Form.Item name='stock'
                                               hasFeedback
                                    >
                                        <Input  placeholder={product.product.stock}/>
                                    </Form.Item>
                                    <Form.Item name='price'
                                               hasFeedback
                                    >
                                        <Input  placeholder={product.product.price}/>
                                    </Form.Item>
                                </Form>
                        </Modal>
                    </>
            }
        </>
    );
};

export default ProductOwnerList;