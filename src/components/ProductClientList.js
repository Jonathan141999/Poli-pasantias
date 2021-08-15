import {useProducts} from "../data/useProducts";
import {message,Row,Col, Skeleton, InputNumber, Modal, Input,Form,Select} from "antd";
import Card from "antd-mobile/es/card";
import React, {useEffect, useState} from "react";
import ShowError from "./ShowError";
import {
    IonCard, IonCardContent,
    IonCardSubtitle,
    IonCardTitle, IonCol, IonText, IonItem,
    IonRow, IonToolbar, IonIcon, IonButton,
    IonList, IonLabel, IonAvatar, IonSelect, IonSelectOption, IonAlert, IonImg, IonBadge, IonLoading
} from "@ionic/react";
import {useSearchProduct} from "../data/useSearchProduct";
import Search from "antd/es/input/Search";
import {addCircleOutline, arrowUpCircleOutline, cartOutline, trashOutline} from "ionicons/icons";
import moment from 'moment';
import API from "../data";
import {useProduct} from "../data/useProduct";
import {useRequests} from "../data/useRequests";
import {useRequestsByUser} from "../data/useRequestsByUser";
import "../theme/toolbar.css";
import {useCategories} from "../data/useCategories";


const { Option } = Select;

const ProductClientList = () => {

    const { products, isLoading, isError} = useProducts();
    const {mutate} = useRequests();
    const categories = useCategories();
    const {requestsByUser, mutateByUser}=useRequestsByUser();
    const [search, setSearch]=useState('');
    const {searchProduct}=useSearchProduct(search);

    //Empresa
    const [idProduct, setIdProduct]=useState('')
    const [showInfo, setShowInfo] = useState(false);
    
    //const [showLoading, setShowLoading] = useState(false)
    //const [ form ] = Form.useForm();
    

    console.log("publicaciones", products);

    console.log("busqueda", searchProduct);

    const product = useProduct(idProduct);
    console.log('info publicacion', product);

    //Empresa Final
    const [cart, setCart]=useState([]);
    const [showCart, setShowCart]=useState(false);
    const [type, setType]=useState('');
    const [noStock, setNoStock]=useState('');
    const [total, setTotal] = useState(0);
    const [showAlert1, setShowAlert1] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    const [showAlert3, setShowAlert3] = useState(false);
    const [showAlert4, setShowAlert4] = useState(false);
    const [showAlert5, setShowAlert5] = useState(false);
    const [showLoading, setShowLoading] = useState(false);



    console.log('search', searchProduct);

    console.log("publicacion", products);

    useEffect(()=>{
        let total2 = 0;
        for (let i = 0; i < cart.length; i++) {
            total2 = total2 + parseFloat(cart[i].cartPrice);
        }
        setTotal(total2);
    },[cart]);

    if( isLoading ) {
        return <Row justify='center' gutter={ 30 }>
            {
                [ ...new Array( 9 ) ].map( ( _, i ) =>
                    <Col xs={ 24 } sm={ 12 } md={ 8 } style={ { marginBottom: 30 } } key={ i }>
                        <div style={ { textAlign: 'center' } }>
                            <Skeleton.Image style={ { width: 200 } } />
                            <Card title='' extra='' cover='' loading />
                        </div>
                    </Col>
                )
            }
        </Row>;
    }

    if( isError ) {
        return <ShowError error={ isError } />;
    }

    const onSearch = value =>{
        console.log('busqueda de publicacion', value);
        setSearch(value);

    };
    const addCart = (index) => {
        let cartId = index.id;
        let cartName = index.name;
        let cartImage = index.image;
        let cartQuantity = 1;
        let cartPrice = index.price * cartQuantity;
        let total1 = 0;

        const newCart={
            cartId,
            cartName,
            cartImage,
            cartQuantity,
            cartPrice
        }
        setCart ((prevState )=>[
            ...prevState,
            newCart
        ]);
        console.log("total", total1);
        console.log("carrito",cart);

        message.success('Producto agregado al carrito', 1)
    }

    const updateCart =(index)=>{
        let total = 0;
        let quantity=document.querySelector( `#${index.cartName.split(" ").join("")}` ).value;
        console.log("nuevaCantidad", quantity);
        if (quantity > 0){
        for (let i=0; i < cart.length; i++){
            if (index.cartId === cart[i].cartId){
                cart[i].cartPrice = parseFloat(((index.cartPrice/cart[i].cartQuantity) * quantity).toFixed(2));
                cart[i].cartQuantity = quantity;
            }
            total = total + parseFloat(cart[i].cartPrice);
        }}
        setTotal(total);
        console.log ("nuevoCarrito", cart);
    }

    const deleteCart =(index)=>{
        setCart ((prevState)=>{
            return prevState.filter((cart, i)=> i!== index);
        })


    }

    const onCreate = async () => {
        let cart2=[];
        if (cart.length > 0){
            for (let i=0; i<cart.length; i++) {
                for (let j = 0; j < products.length; j++) {
                    if (products[j].id === cart[i].cartId){
                        if(products[j].stock >= cart[i].cartQuantity) {
                            cart2.push(cart[i]);
                        }else{
                            setNoStock(cart[i].cartName + ', solo se dispone de '+ products[j].stock);
                        }}}}
                    console.log("no stock", noStock);
                    if (cart2.length === cart.length){
                        let subtotal=0;
                        console.log("tipo entrega", type);
                        for (let i=0; i < cart.length; i++){
                            subtotal=subtotal + parseFloat(cart[i].cartPrice);
                        }
                        setShowLoading(true);
                        if (type==="online"){
                            try {
                                const surcharge=subtotal*0.1;
                                const total=subtotal+surcharge;
                                await API.post( '/postulations', {
                                    date :moment().format('YYYY-MM-D'),
                                    subtotal: subtotal,
                                    type: type,
                                    surcharge: surcharge,
                                    total: total,
                                    status: "new",
                                });
                                await afterCreate();
                                setShowLoading(false);
                                setShowAlert5(true);
                            } catch( error ) {
                                console.error(
                                    'You have an error in your code or there are Network issues.',
                                    error
                                );
                            }
                        }
                        else{
                            if (type==="face"){
                                try {
                                    const surcharge=0;
                                    const total=subtotal;
                                    await API.post( '/postulations', {
                                        date :moment().format('YYYY-MM-D'),
                                        subtotal: subtotal,
                                        type: type,
                                        surcharge: surcharge,
                                        total: total,
                                        status: "new",
                                    }); // post data to server
                                    await afterCreate();
                                    setShowLoading(false);
                                    setShowAlert5(true);
                                } catch( error ) {
                                    console.error(
                                        'You have an error in your code or there are Network issues.',
                                        error
                                    );
                                }
                            }else{
                                setShowAlert4(true);
                                setShowLoading(false);
                            }
                        }
                            } else{
                        setShowAlert2(true);
                        setShowLoading(false);
                        setType();
                    }
                        }else{
            setShowAlert1(true);
            setType();
        }
    }

    const onConfirm =async ()=>{
      console.log("Prueba de función");
      console.log("postulacion", requestsByUser);
        setShowLoading(true);
        const idR = requestsByUser[requestsByUser.length - 1].id;
        console.log("ultimo", idR);
        for (let i = 0; i < cart.length; i++) {
            await API.post(`/postulations/${idR}/details`, {
                product_id: cart[i].cartId,
                quantity: cart[i].cartQuantity,
                final_price: parseFloat(cart[i].cartPrice),
            })
            for (let j = 0; j < products.length; j++) {
                if (products[j].id === cart[i].cartId) {
                    let stock = products[j].stock - cart[i].cartQuantity;
                    await API.put(`/publications/${cart[i].cartId}`, {
                        stock: stock,
                    })
                }
            }
        }
        setShowLoading(false);
        setShowCart(false);
        setCart([]);
        setType();
        setShowAlert3(true);

    };

    const afterCreate = async () => {
        await mutate('/postulations', async requests => {
            return {data: [{}, ...requests.data]};
        },false);

        await  mutateByUser('/postulation/user');
    };

    const handleShowCart = () =>{
        let total1 = 0;
        for (let i=0; i < cart.length; i++){
            total1 = total1 + parseFloat(cart[i].cartPrice);
        }
        setTotal(total1);
        setShowCart(true);
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
                                    <IonButton type='primary' htmlType='submit' className='login-form-button'>Podtular</IonButton>,
                                    <IonButton onClick={()=>setShowInfo(false)}>Cancelar</IonButton>
                                ]}
                        >        
                    <IonCard>
                        <IonImg style={{ height: "100px"}} src={ `http://localhost:8000/storage/${ product.image }` }
                                                />
                        <IonCardContent>
                        <IonCardSubtitle><strong>Dirección: </strong>{product.product.location}</IonCardSubtitle>
                            <IonCardSubtitle><strong>Telefóno: </strong>{product.product.phone}</IonCardSubtitle>
                            <IonCardSubtitle><strong>Correo de Contacto: </strong>{product.product.email}</IonCardSubtitle>
                            <IonCardSubtitle><strong>Empresa: </strong>{product.product.type}</IonCardSubtitle>
                            <IonCardSubtitle><strong>Horas: </strong>{product.product.hour}</IonCardSubtitle>
                            <IonCardSubtitle><strong>Carrera: </strong>{product.product.category_name}</IonCardSubtitle>
                            <IonCardSubtitle><strong>Fecha de Publicación: </strong>{product.product.publication_date}</IonCardSubtitle>
                            <IonCardSubtitle><strong>Detalle:</strong>{product.product.details}</IonCardSubtitle>
                        </IonCardContent>
                    </IonCard>
            <IonText>
                <h3><strong>Postulación</strong></h3>
            </IonText>
            <Form
                className="register-form"
                layout="vertical"
               //form={form}
                initialValues={{
                       remember: true,
                       }}
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
                </Form>
            <IonText>
                <h3><strong>Tipo de entrevista</strong></h3>
            </IonText>

            <IonRow>
                <IonCol>
                    <IonSelect value={type}
                       placeholder={"Tipo de entrega"}
                       onIonChange={e => setType(e.detail.value)}
                       okText={"Aceptar"}
                       cancelText={"Cancelar"}
                    >
                        <IonSelectOption value={"online"}>Online</IonSelectOption>
                        <IonSelectOption value={"face"}>Presencial</IonSelectOption>
                    </IonSelect>
                </IonCol>
            </IonRow>
            </Modal>
            </>
        }
            <IonAlert
                isOpen={showAlert1}
                onDidDismiss={()=>setShowAlert1(false)}
                cssClass={'my-custom-class'}
                header={'Carrito Vacio'}
                message={'No puede realizar la compra porque el carrito esta vacio'}
                buttons={['OK']}
            />
            <IonAlert
                isOpen={showAlert2}
                onDidDismiss={()=>setShowAlert2(false)}
                cssClass={'my-custom-class'}
                header={'Sin stock'}
                message={'No se puede realizar la compra porque no hay stock suficiente del producto ' + noStock + ' en stock'}
                buttons={['OK']}
            />
            <IonAlert
                isOpen={showAlert3}
                onDidDismiss={()=>setShowAlert3(false)}
                cssClass={'my-custom-class'}
                header={'Compra Exitosa'}
                message={'¡Su compra se realizo de manera exitosa!'}
                buttons={['OK']}
            />
            <IonAlert
                isOpen={showAlert4}
                onDidDismiss={()=>setShowAlert4(false)}
                cssClass={'my-custom-class'}
                header={'Tipo de entrega'}
                message={'No ha seleccionado un tipo de entrega'}
                buttons={['OK']}
            />
            <IonAlert
                isOpen={showAlert5}
                onDidDismiss={(()=>setShowAlert5(false))}
                cssClass={'my-custom-class'}
                header={'Nueva Compra'}
                message={'Usted debe confirmar su compra'}
                buttons={[{
                    text:'OK',
                    handler: onConfirm,
                }]}
            />
            <IonLoading
                isOpen={showLoading}
                onDidDismiss={()=>setShowLoading(false)}
                message={'Por favor espere...'}
            />
        </>
    );
};

export default ProductClientList;