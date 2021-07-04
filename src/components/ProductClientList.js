import {useProducts} from "../data/useProducts";
import {Row,Col, Skeleton, Form, InputNumber, Modal} from "antd";
import Card from "antd-mobile/es/card";
import React, {useEffect, useState} from "react";
import ShowError from "./ShowError";
import {
    IonCard, IonCardContent,
    IonCardSubtitle,
    IonCardTitle, IonCol, IonGrid, IonHeader, IonText,
    IonItem, IonModal, IonPage,
    IonRow, IonTitle, IonToolbar, IonIcon, IonButton,
    IonList, IonLabel, IonAvatar, IonSelect, IonSelectOption, IonAlert, IonImg, IonCardHeader
} from "@ionic/react";
import {useSearchProduct} from "../data/useSearchProduct";
import Search from "antd/es/input/Search";
import {arrowUpCircleOutline, cartOutline, trashOutline} from "ionicons/icons";
import moment from 'moment';
import API from "../data";
import {useRequests} from "../data/useRequests";
import {useRequestsByUser} from "../data/useRequestsByUser";
import "../theme/toolbar.css";


const ProductClientList = () => {

    const { products, isLoading, isError} = useProducts();

    const { requests,isLoadingRequest,isErrorRequest, mutate} = useRequests();

    const {mutateByUser} =useRequestsByUser();

    const [search, setSearch]=useState('');

    const {searchProduct}=useSearchProduct(search);

    const [cart, setCart]=useState([]);
    const [showCart, setShowCart]=useState(false);
    const [type, setType]=useState('');
    const [total, setTotal] = useState(0);
    const [showAlert1, setShowAlert1] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);

    console.log('search', searchProduct);

    console.log("productos", products);

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
        console.log('producto', value);
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
    }

    const updateCart =(index)=>{
        let total = 0;
        let quantity=document.querySelector( `#${index.cartName.split(" ").join("")}` ).value;
        console.log("nuevaCantidad", quantity);
        for (let i=0; i < cart.length; i++){
            if (index.cartId === cart[i].cartId){
                cart[i].cartPrice = parseFloat(((index.cartPrice/cart[i].cartQuantity) * quantity).toFixed(2));
                cart[i].cartQuantity = quantity;
            }
            total = total + parseFloat(cart[i].cartPrice);
        }
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
                    if (products[j].id === cart[i].cartId && products[j].stock > cart[i].cartQuantity) {
                        cart2.push(cart[i]);
                    }}}
                    if (cart2.length === cart.length){
                        let subtotal=0;
                        console.log("tipo entrega", type);
                        for (let i=0; i < cart.length; i++){
                            subtotal=subtotal + parseFloat(cart[i].cartPrice);
                        }
                        if (type==="deliver"){
                            try {
                                const surcharge=subtotal*0.1;
                                const total=subtotal+surcharge;
                                await API.post( '/requests', {
                                    date :moment().format('YYYY-MM-D'),
                                    subtotal: subtotal,
                                    type: type,
                                    surcharge: surcharge,
                                    total: total,
                                    status: "pending",
                                }); // post data to server
                                await afterCreate();
                            } catch( error ) {
                                console.error(
                                    'You have an error in your code or there are Network issues.',
                                    error
                                );
                            }
                        }
                        else{
                            try {
                                const surcharge=0;
                                const total=subtotal;
                                await API.post( '/requests', {
                                    date :moment().format('YYYY-MM-D'),
                                    subtotal: subtotal,
                                    type: type,
                                    surcharge: surcharge,
                                    total: total,
                                }); // post data to server
                                await afterCreate();
                            } catch( error ) {
                                console.error(
                                    'You have an error in your code or there are Network issues.',
                                    error
                                );
                            }
                        }
                        if (isLoadingRequest){
                            return <div>Cargando...</div>
                        }else{
                            if(isErrorRequest){
                                return <ShowError error={ isErrorRequest } />;
                            }else{
                                console.log("pedidos", requests)
                                const idR = requests[requests.length-1].id;
                                console.log("ultimo", idR);
                                for (let i=0; i < cart.length; i++){
                                    await API.post(`/requests/${idR+1}/details`,{
                                        product_id: cart[i].cartId,
                                        quantity: cart[i].cartQuantity,
                                        final_price: parseFloat(cart[i].cartPrice),
                                    })
                                    for (let j=0; j < products.length; j++){
                                        if (products[j].id === cart[i].cartId){
                                            let stock = products[j].stock - cart[i].cartQuantity;
                                            await API.put(`/products/${cart[i].cartId}` ,{
                                                stock: stock,
                                            })
                                        }
                                    }
                                }
                            }
                        }
                        setShowCart(false);
                        setCart([]);
                    }
                    else{
                        setShowAlert2(true);
                    }
        }else{
            setShowAlert1(true);
        }
    }

    const afterCreate = async () => {
        await mutate('/requests', async requests => {
            return {data: [{}, ...requests.data]};
        },false);

        await  mutateByUser('/request/user');
    };

    const handleShowCart = () =>{
        let total1 = 0;
        for (let i=0; i < cart.length; i++){
            total1 = total1 + parseFloat(cart[i].cartPrice);
        }
        setTotal(total1);
        setShowCart(true);
    }

    return (
        <>
            <IonGrid>
                <IonRow>
                    <IonToolbar>
                        <Search placeholder="input search text" onSearch={onSearch} enterButton />
                        <IonIcon icon={cartOutline} slot={"end"} style={{width: "35px",height: "35px" }} onClick={handleShowCart}/>
                    </IonToolbar>

            {
                searchProduct ?
                        searchProduct.filter(i => i.stock  > 0).map((search, i)=>(
                            <IonCol  size="6">
                                <IonCard key={i} onClick={()=>addCart(search)} >
                                    <IonImg src={ `http://localhost:8000/storage/${ search.image }` }
                                            style={{height: "100px"}}/>
                                    <IonCardHeader>
                                        <IonCardTitle>{search.name}</IonCardTitle>
                                    </IonCardHeader>

                                    <IonCardContent>
                                        <IonCardSubtitle>{search.price.toFixed(2)}</IonCardSubtitle>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        ))
                    :

                    products.filter(i => i.stock  > 0).map((product,i)=>(
                    <IonCol size="6">
                    <IonCard key={i} onClick={()=>addCart(product)} >
                        <IonImg style={{ height: "100px"}} src={ `http://localhost:8000/storage/${ product.image }` }
                        />
                        <IonCardHeader>
                            <IonCardTitle>{product.name}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonCardSubtitle>{product.price.toFixed(2)}</IonCardSubtitle>
                        </IonCardContent>
                    </IonCard>
                    </IonCol>
                ))
            }
                </IonRow>
            </IonGrid>

            <Modal  title="Carrito de compras"
                    visible={showCart}
                    closable={false}
                    footer={[
                        <IonButton htmlType='submit' onClick={onCreate}>Realizar Compra</IonButton>,
                        <IonButton onClick={()=>setShowCart(false)}>Cancelar</IonButton>
                    ]}
            >
                    <IonList>
                        {
                         cart.map((car,i)=>(
                            <IonItem key={i}>
                                <IonAvatar slot={"start"}>
                                    <img src={`http://localhost:8000/storage/${ car.cartImage }`} />
                                </IonAvatar>
                                <IonLabel>
                                    <IonRow>
                                    <IonCol>{car.cartName}</IonCol>
                                    <IonCol><InputNumber
                                        id={car.cartName.split(" ").join("")}
                                        defaultValue={car.cartQuantity}
                                        min={1}
                                        max={10}
                                        style={{width:"50px"}}/></IonCol>
                                    <IonCol>{car.cartPrice.toFixed(2)}</IonCol>
                                    </IonRow>
                                </IonLabel>
                                <IonIcon
                                    icon={arrowUpCircleOutline}
                                    style={{width:"25px", height:"25px"}}
                                    slot={"end"}
                                    onClick={()=>updateCart(car)}
                                />
                                <IonIcon
                                    icon={trashOutline}
                                    style={{width:"25px", height:"25px"}}
                                    slot={"end"}
                                    onClick={()=>deleteCart(i)}
                                />
                            </IonItem>
                            ))
                        }
                    </IonList>
                    <IonItem>
                        <IonLabel slot={"end"}> <div><p align={"right"}><strong>Subtotal: </strong>{total.toFixed(2)}</p></div></IonLabel>
                    </IonItem>
                    <IonText>
                        <h3>Tipo de entrega</h3>
                    </IonText>

                        <IonRow>
                            <IonCol>
                        <IonSelect value={type}
                                   placeholder={"Tipo de entrega"}
                                   onIonChange={e => setType(e.detail.value)}
                        >
                            <IonSelectOption value={"deliver"}>A domicilio</IonSelectOption>
                            <IonSelectOption value={"withdraw"}>En la tienda</IonSelectOption>
                        </IonSelect>
                            </IonCol>
                            <IonCol>
                                <IonItem>
                                <IonLabel>
                                    {
                                        type === "deliver"
                                            ? <><p align={"right"}>{(total * .1).toFixed(2)}</p></>
                                            : <><p align={"right"}>0.00</p></>
                                    }</IonLabel>
                                </IonItem>
                            </IonCol>
                        </IonRow>

                    <IonItem>
                        <IonLabel slot={"end"}><div><p align={"right"}><strong>Total: </strong>{
                                type === "deliver"
                                    ? (total * 1.1).toFixed(2)
                                    : total.toFixed(2)
                        }</p></div></IonLabel>
                    </IonItem>
            </Modal>
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
                message={'No puede realizar la compra porque no existe suficiente stock'}
                buttons={['OK']}
            />
        </>
    );
};

export default ProductClientList;