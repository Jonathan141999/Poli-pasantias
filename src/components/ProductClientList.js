import { usePublication } from "../data/usePublication";
import { message, Row, Col, Skeleton, InputNumber, Modal, Input, Form, Select, Button } from "antd";
import Card from "antd-mobile/es/card";
import React, { useEffect, useState } from "react";
import ShowError from "./ShowError";
import {
    IonCard, IonCardContent,
    IonCardSubtitle,
    IonCardTitle, IonCol, IonText, IonItem,
    IonRow, IonToolbar, IonIcon, IonButton,
    IonList, IonLabel, IonAvatar, IonSelect, IonSelectOption, IonAlert, IonImg, IonBadge, IonLoading
} from "@ionic/react";
import { useSearchProduct } from "../data/useSearchProduct";
import { addCircleOutline, arrowUpCircleOutline, cartOutline, trashOutline } from "ionicons/icons";
import moment from 'moment';
import API from "../data";
import { useProduct } from "../data/useProduct";
import { useRequests } from "../data/useRequests";
import { useRequestsByUser } from "../data/useRequestsByUser";
import "../theme/toolbar.css";
import { useCategories } from "../data/useCategories";
import nodata from '../images/nodata.png';

const { Option } = Select;

const ProductClientList = () => {

    const [changeOption, setChangeOption] = useState('');
    const { products, isLoading, isError } = usePublication();
    const { mutate } = useRequests();
    const { categories } = useCategories();
    const { requestsByUser, mutateByUser } = useRequestsByUser();
    const [search, setSearch] = useState('');
    const { searchProduct } = useSearchProduct(search);

    //Empresa
    const [idProduct, setIdProduct] = useState('')
    const [showInfo, setShowInfo] = useState(false);

    //const [showLoading, setShowLoading] = useState(false)
    //const [ form ] = Form.useForm();

    const product = useProduct(idProduct);

    //Empresa Final
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [type, setType] = useState('');
    const [showAlert3, setShowAlert3] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [form] = Form.useForm();

    if (isLoading) {
        return <Row justify='center' gutter={30}>
            {
                [...new Array(9)].map((_, i) =>
                    <Col xs={24} sm={12} md={8} style={{ marginBottom: 30 }} key={i}>
                        <div style={{ textAlign: 'center' }}>
                            <Skeleton.Image style={{ width: 200 }} />
                            <Card title='' extra='' cover='' loading />
                        </div>
                    </Col>
                )
            }
        </Row>;
    }

    if (isError) {
        return <ShowError error={isError} />;
    }

    const afterCreate = async () => {
        await mutate('/postulations', async requests => {
            return { data: [{}, ...requests.data] };
        }, false);

        await mutateByUser('/postulations/user');
    };

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

    const onCreate = async values => {
        console.log('Received values of form: ', values);
        form.validateFields()
            .then(async (values) => {
                console.log('values', values);
                try {
                    await API.post('/postulations', {
                        'languages': values.languages,
                        'work_experience': values.work_experience,
                        'type': values.type,
                        'career': values.career,
                        'status': 'new',
                        'publication_id': parseInt(idProduct),
                    }
                    );
                    await afterCreate();
                    form.resetFields();
                    //Enviar una Alerta de que se registro con exito
                    setShowInfo(false);
                } catch (e) {
                    console.log(e);
                    //Enviar una Alerta de que existe un error
                }
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <>
            <IonRow style={{ padding: "10px" }}>
                <IonToolbar>
                    {categories ?
                        <><Select style={{ display: 'inline-block', minWidth: '300', maxWidth: '300px' }} defaultValue={0} placeholder="Búsqueda por categoria" onChange={onChange}>
                            {categories.map((category, index) => (
                                <Option style={{ minWidth: '300', maxWidth: '300px' }} value={category.id}>{category.name}</Option>
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
                                            <IonCardSubtitle><strong>Carrera: </strong>{search.category_name}</IonCardSubtitle>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            ))
                            : <IonImg src={nodata} style={{ width: "100px", height: "100px", display: "block", margin: "auto" }} />
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
                                    <IonButton type='primary' htmlType='submit' onClick={onCreate} className='login-form-button'>Postular</IonButton>,
                                    <IonButton onClick={() => setShowInfo(false)}>Cancelar</IonButton>
                                ]}
                            >
                                <IonCard>
                                    <IonImg style={{ height: "100px" }} src={`http://localhost:8000/storage/${product.image}`}
                                    />
                                    <IonCardContent>
                                        <IonCardSubtitle><strong>Dirección: </strong>{product.product.location}</IonCardSubtitle>
                                        <IonCardSubtitle><strong>Telefóno: </strong>{product.product.phone}</IonCardSubtitle>
                                        <IonCardSubtitle><strong>Correo de Contacto: </strong>{product.product.email}</IonCardSubtitle>
                                        <IonCardSubtitle><strong>Empresa: </strong>{product.product.type}</IonCardSubtitle>
                                        <IonCardSubtitle><strong>Horas: </strong>{product.product.hour}</IonCardSubtitle>
                                        <IonCardSubtitle><strong>Carrera: </strong>{product.product.category}</IonCardSubtitle>
                                        <IonCardSubtitle><strong>Fecha de Publicación: </strong>{product.product.created_at}</IonCardSubtitle>
                                        <IonCardSubtitle><strong>Detalle:</strong>{product.product.details}</IonCardSubtitle>
                                    </IonCardContent>
                                </IonCard>
                                <IonText>
                                    <h3><strong>Postulación</strong></h3>
                                </IonText>
                                <Form
                                    className="register-form"
                                    layout="vertical"
                                    form={form}
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
                                        <Input placeholder='Lenguajes' />
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
                                        <Input.TextArea placeholder='Experiencia' />
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
                                        <Input placeholder='Semestre' />
                                    </Form.Item>
                                    <IonText>
                                        <h3><strong>Tipo de entrevista</strong></h3>
                                    </IonText>
                                    <Form.Item
                                        name="type"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Select
                                            placeholder="Select a option and change input text above"
                                            allowClear
                                        >
                                            <Option value="online">Virtual</Option>
                                            <Option value="face">Presencial</Option>
                                        </Select>
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

export default ProductClientList;