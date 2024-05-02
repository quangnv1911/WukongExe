import {  Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const ModalTemp = (props) => {
    const {
        isOpen,
        onClose,
        _id,
        ...rest
    } = props;

    return (
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Chi tiết đơn hàng</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Đóng
                    </Button>
                    
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalTemp