import { useProducts } from "../data/useProducts";
import { Row, Col, Skeleton, Form, Input, message, Modal, Card, Button, Select } from "antd";
import React, { useState, useEffect } from "react";
import {
    IonButton,
    IonCard, IonCardContent,
    IonCardSubtitle, IonImg,
    IonCardTitle, IonCol,
    IonRow, IonToolbar, IonLoading,
} from "@ionic/react";
import API from "../data";
import { useProduct } from "../data/useProduct";
import { translateMessage } from "../utils/translateMessage";
import { useSearchProduct } from "../data/useSearchProduct";
import { useCategories } from "../data/useCategories";
import Search from "antd/es/input/Search";
import "../theme/toolbar.css";
import nodata from '../images/nodata.png';
const { Option } = Select;

const ProductOwnerList = () => {

    const { products, isLoading, isError, mutate } = useProducts();
    const [idProduct, setIdProduct] = useState('')
    const [showInfo, setShowInfo] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [form] = Form.useForm();
    const { categories } = useCategories();
    const [changeOption, setChangeOption] = useState('');
    const [search, setSearch] = useState('');
    const { searchProduct } = useSearchProduct(search);
    const product = useProduct(idProduct);

    const onUpdate = async values => {
        console.log('Received values of form: ', values);

        form.validateFields()
            .then(async (values) => {
                setShowLoading(true);
                try {
                    await API.put(`/publications/${idProduct}`, {
                        name: values.name,
                        location: values.location,
                        phone: values.phone,
                        hour: values.hour,
                        details: values.details,
                    }); // post data to server
                    form.resetFields();
                    await afterCreate();
                    setShowLoading(false);
                    setShowInfo(false);

                } catch (error) {
                    console.error(
                        'You have an error in your code or there are Network issues.',
                        error
                    );
                    setShowLoading(false);
                    message.error(translateMessage(error.message));
                }
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });

    };

    const afterCreate = async () => {
        await mutate('/publications');
    };

    if (isLoading) {
        return <Row justify='center' gutter={30}>
            {
                [...new Array(9)].map((_, i) =>
                    <Col xs={24} sm={12} md={8} style={{ marginBottom: 30 }} key={i}>
                        <div style={{ textAlign: 'center' }}>
                            <br />
                            <Skeleton.Image style={{ width: 200 }} />
                            <Card title='' extra='' cover='' loading />
                        </div>
                    </Col>
                )
            }
        </Row>;
    }

    if (isError) {
        return "";
    }

    const showDetails = (index) => {
        const id = products[index].id;
        setIdProduct(id);
        setShowInfo(true);
    }

    const showDetail = (index) => {
        const id = index;
        setIdProduct(id);
        setShowInfo(true);
    }

    function onChange(value) {
        console.log(`selected ${value}`);
        setChangeOption(value);
    }

    const onSearch = (option) => {
        if (option !== 0) {
            setSearch(option);
        } else {

        }
    };

    return (
        <>
            <IonRow style={{ padding: "10px" }}>
                <IonToolbar>
                    {categories ?
                        <><Select style={{ display: 'inline-block', minWidth:'300', maxWidth:'300px' }} placeholder="Búsqueda por categoria" onChange={onChange}>
                            {categories.map((category, index) => (
                                <Option style={{ minWidth:'300', maxWidth:'300px' }}value={category.id}>{category.name}</Option>
                            ))}
                        </Select>
                            <Button style={{ display: 'inline-block' }} onClick={() => onSearch(changeOption)}>Buscar 🔎 </Button></>
                        :
                        <><Select style={{ display: 'inline-block' }} placeholder="Búsqueda por categoria" />
                            <Button style={{ display: 'inline-block' }} >Buscar 🔎 </Button></>
                    }

                </IonToolbar>
            </IonRow>
            <IonRow style={{ display: "block" }}>
                {
                    searchProduct ?
                        searchProduct.length > 0 ?
                            searchProduct.map((search, i) => (
                                <IonCol size="6">
                                    <IonCard key={i} onClick={() => showDetail(search.id)} >
                                        <IonImg style={{ height: "100px" }} src={`http://localhost:8000/storage/${search.image}`}
                                        />
                                        <IonCardContent>
                                            <IonCardTitle><p>{search.name}</p></IonCardTitle>
                                            <IonCardSubtitle><strong>Dirección: </strong>{search.location}</IonCardSubtitle>
                                            <IonCardSubtitle><strong>Teléfono: </strong>{search.phone}</IonCardSubtitle>
                                            <IonCardSubtitle><strong>Horas: </strong>{search.hour}</IonCardSubtitle>
                                            <IonCardSubtitle><strong>Carrera: </strong>{search.category}</IonCardSubtitle>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            ))
                            :  <IonImg src={nodata} style={{width:"100px", height:"100px", display:"block", margin:"auto"}}/>
                        :
                        products ?
                            products.map((product, i) => (
                                <IonCol size="6">
                                    <IonCard key={i} onClick={() => showDetails(i)} >
                                        <IonImg style={{ height: "100px" }} src={`http://localhost:8000/storage/${product.image}`}
                                        />
                                        <IonCardContent>
                                            <IonCardTitle><p>{product.name}</p></IonCardTitle>
                                            <IonCardSubtitle><strong>Dirección: </strong>{product.location}</IonCardSubtitle>
                                            <IonCardSubtitle><strong>Teléfono: </strong>{product.phone}</IonCardSubtitle>
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
                            <Modal title="Publicaciones" style={{ background: "blue" }}
                                visible={showInfo}
                                closable={false}
                                footer={[
                                    <IonButton type='primary' htmlType='submit' className='login-form-button' onClick={onUpdate}>Actualizar</IonButton>,
                                    <IonButton onClick={() => setShowInfo(false)}>Cancelar</IonButton>
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
                                        <Input placeholder={product.product.name} />
                                    </Form.Item>
                                    <Form.Item label="Dirección" name='location' hasFeedback>
                                        <Input placeholder={product.product.location} />
                                    </Form.Item>
                                    <Form.Item label="Telefono" name='phone' hasFeedback>
                                        <Input type="number" min="7" max="13" placeholder={product.product.phone} />
                                    </Form.Item>
                                    <Form.Item label="Horas a Ofertar" name='hour' hasFeedback>
                                        <Input placeholder={product.product.hour} />
                                    </Form.Item>
                                    <Form.Item label="Descripcion de la práctica preprofesional" name='details' hasFeedback>
                                        <Input.TextArea placeholder={product.product.details} />
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </>
            }
            <IonLoading
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Por favor espere...'}
            />
        </>
    );
};

export default ProductOwnerList;