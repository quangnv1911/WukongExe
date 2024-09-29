import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import toast from 'react-hot-toast';
import Thank from './Thank';
import { BACK_END_HOST } from '../utils/AppConfig';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearProduct } from '../redux/ProductReducer';
import axios from 'axios';
import Swal from 'sweetalert2'
import OrderConfirmationModal from './OrderConfirmation';


const QrModal = (props) => {
    const { show,
        setShow,
        total,
        uuid,
        postData,
        ...rest } = props;
    const bank = {
        BANK_ID: "MBBank",
        ACCOUNT_NO: "0334745645",
        TEMPLATE: "compact2",
        AMOUNT: total,
        DESCRIPTION: 'Wukong ' + uuid,
        ACCOUNT_NAME: 'NGUYEN VINH QUANG'
    }
    const api_get = "https://oauth.casso.vn/v2/transactions?sort=DESC";
    const CASSO_API_KEY = "AK_CS.8919b2c06f3411ef9eef9daee9cc4b4e.D3UmTnte682d53QW4xP4ivFO725YT9HMgjvurK6N1ukb1l6HA3kAxzI1GOwQ59u5HKOhhdjX"

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({});
    const [isPaid, setIsPaid] = useState(false);
    const [showModal, setShowModal] = useState(false)

    const handleCloseModal = () => {
        navigate('/')
        setShowModal(false); // Đóng modal
    };
    const fetchData = async () => {
        try {
            const res = await fetch(api_get, {
                headers: {
                    Authorization: `apikey ${CASSO_API_KEY}`,
                    "Content-Type": "application/json",
                }
            });
            const jsonData = await res.json();
            setData(jsonData);
            
            //handle send success
            jsonData.data.records.forEach(trans => {
                //lam tron xuong va so sanh + xoa dau '-' cua uuid
                if (Math.floor(trans.amount) >= Math.floor(total) && trans.description.includes(uuid.replace(/-/g, ""))) {
                    setIsPaid(true);
                    saveOrder();
                    return;
                }
            })

        } catch (error) {
            console.log('fetchData qr error', error);
        }
    }

    useEffect(() => {
        if (show && !isPaid) {
            fetchData();

            const intervalId = setInterval(() => {
                fetchData();
            }, 3000)

            //clear khi component bi huy
            return () => clearInterval(intervalId);
        }
    }, [show, isPaid])


    const saveOrder = async () => {
        axios.post(`${BACK_END_HOST}/order`, postData)
            .then(res => {
               
                dispatch(clearProduct());
                
                setTimeout(() => {
                    toast.success('Thanh toán thành công ❤️\nCảm ơn bạn')
                    setShowModal(true)
                }, 2000)
            })
            .catch(error => {
                console.log('saveOrder error:', error);
                toast.error('Có lỗi gì đó đã xảy ra!😭\nVui lòng liên hệ admin qua facebook/zalo/sdt')
            })
    };

    const handleClose = () => {
        Swal.fire({
            title: "Bạn có muốn dừng thanh toán?",
            text: "Nếu bạn đã chuyển khoản vui lòng ấn nút \"ĐÓNG\" và đợi chúng mình trong giây lát!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#ffcb03",
            cancelButtonText: "Đóng",
            confirmButtonText: "Hủy thanh toán"
        }).then((result) => {
            if (result.isConfirmed) {
                setIsPaid(false);
                setShow(false);
            }
        });
    };

    return (
        <div>
            <Modal show={show} style={{ minWidth: '100%' }}>
                {
                    isPaid ?   <OrderConfirmationModal show={showModal} handleClose={handleCloseModal} /> :
                        (
                            <div>
                                <Modal.Header>
                                    <Modal.Title style={{ color: 'red' }}>
                                        Vui lòng không sửa nội dung chuyển khoản!<br/>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <img src={`https://img.vietqr.io/image/${bank.BANK_ID}-${bank.ACCOUNT_NO}-${bank.TEMPLATE}.png?amount=${bank.AMOUNT}&addInfo=${bank.DESCRIPTION}&accountName=${bank.ACCOUNT_NAME}`} alt="Error" width={'100%'} />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Đóng
                                    </Button>
                                </Modal.Footer>
                            </div>
                        )
                }

            </Modal>
          
        </div>

    )
}

export default QrModal