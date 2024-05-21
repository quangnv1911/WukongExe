import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify';
import { BACK_END_HOST } from 'utils/AppConfig';
import api from 'utils/Services';

const ModalTemp = (props) => {
    const {
        isOpen,
        onClose,
        _id,
        isChange,
        setIsChange,
        setTableData,
        tableData,
        ...rest
    } = props;
    const [orderDetail, setOrderDetail] = useState([]);

    const handleClose = () => {
        setOrderDetail([]);
        setIsChange(false);
        onClose();
    }

    useEffect(() => {
        if (_id && isChange) {
            api.get(`${BACK_END_HOST}/orderDetail/${_id}`)
                .then(res => {
                    setOrderDetail(res.data)
                })
                .catch(err => console.log('getOrderDetail error', err))
        }
    }, [isChange, _id])

    //handle change orderStatus
    const handleChangeOrderStatus = (id, status) => {
        api.post(`${BACK_END_HOST}/order/update`, {
            id,
            order: {
                status: status
            }
        })
            .then(res => {
                //update list order
                var tempOrder = tableData.map(order => {
                    if(order._id === res.data._id) {
                        return {
                            ...order,
                            'status': status
                        }
                    }
                    return order
                });
                setTableData(tempOrder);

                //close modal
                handleClose();
                toast.success('Cập nhật trạng thái thành công', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })
            .catch(err => {
                console.log('handleChangeOrderStatus error', err);
                toast.error('Lỗi nào đó đã xảy ra, vui lòng thử lại sau', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })
    }
    return (
        <Modal isOpen={isOpen} onClose={handleClose} size='4xl' scrollBehavior='inside'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Chi tiết đơn hàng</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TableContainer>
                        <Table variant='striped' colorScheme='teal'>
                            <Thead>
                                <Tr>
                                    <Th>Tên</Th>
                                    <Th>Số lượng</Th>
                                    <Th isNumeric>Đơn giá(Đồng)</Th>
                                    <Th isNumeric>Tổng tiền(Đồng)</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    orderDetail.length > 0 ? orderDetail.map(orderDetail =>
                                        <Tr>
                                            <Td>{orderDetail.product.name}</Td>
                                            <Td>{orderDetail.quantity}</Td>
                                            <Td isNumeric>{orderDetail.sellPrice.toLocaleString('vi-VN')}</Td>
                                            <Td isNumeric>{(orderDetail.sellPrice * orderDetail.quantity).toLocaleString('vi-VN')}</Td>
                                        </Tr>
                                    ) : (
                                        <Flex justify={'center'} align='center'>
                                            <Button isLoading />
                                        </Flex>
                                    )
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <Flex justifyContent={'space-between'} alignItems={'center'}>
                        <Flex justify='flex-end' align='center' fontSize={'20px'}>
                            <Text mr={'5px'}>
                                Lãi:
                            </Text>
                            <Text>
                                {orderDetail.length > 0 ?
                                    (
                                        orderDetail[0].order.totalProfit ? `${orderDetail[0].order.totalProfit.toLocaleString('vi-VN')}(đồng)` : 'Không có'
                                    )
                                    :
                                    (
                                        <Flex justify={'center'} align='center'>
                                            <Button isLoading />
                                        </Flex>
                                    )}
                            </Text>
                        </Flex>
                        <div>
                            <Flex justify='flex-end' align='center' fontSize={'20px'}>
                                <Text mr={'5px'}>
                                    Giảm giá:
                                </Text>
                                <Text>
                                    {orderDetail.length > 0 ?
                                        (
                                            orderDetail[0].order.voucher ? `${orderDetail[0].order.voucher.percent}%` : 'Không có'
                                        )
                                        :
                                        (
                                            <Flex justify={'center'} align='center'>
                                                <Button isLoading />
                                            </Flex>
                                        )}
                                </Text>
                            </Flex>
                            <Flex justify='flex-end' align='center' fontSize={'20px'}>
                                <Text mr={'5px'}>
                                    Tổng tiền:
                                </Text>
                                <Text>
                                    {orderDetail.length > 0 ? orderDetail[0].order.total.toLocaleString('vi-VN') :
                                        (
                                            <Flex justify={'center'} align='center'>
                                                <Button isLoading />
                                            </Flex>
                                        )}(đồng)
                                </Text>
                            </Flex>
                        </div>
                    </Flex>


                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleClose}>
                        Đóng
                    </Button>
                    {
                        orderDetail.length > 0 ? orderDetail[0].order.status ?
                            (
                                <Button colorScheme='red' mr={3} onClick={() => handleChangeOrderStatus(orderDetail[0].order._id, false)}>
                                    Chuyển trạng thái: Chưa giao hàng
                                </Button>
                            )
                            :
                            (
                                <Button colorScheme='green' mr={3} onClick={() => handleChangeOrderStatus(orderDetail[0].order._id, true)}>
                                    Chuyển trạng thái: Đã giao hàng
                                </Button>
                            )
                            : ''
                    }

                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalTemp