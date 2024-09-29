import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Thank from "./Thank";

// eslint-disable-next-line react/prop-types
const OrderConfirmationModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thanh toán thành công</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}}>
    <div style={{
        width: '30%',  // Thay đổi chiều rộng nếu cần
        marginBottom: '20px',  // Khoảng cách giữa hình và thông điệp
    }}>
        <Thank />
    </div>
    <p style={{
        fontSize: '1.2em',  // Kích thước chữ lớn hơn
        color: '#333',  // Màu chữ tối
    }}>
        Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất. Cảm ơn bạn đã ủng hộ Wukong Food!
    </p>
</div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" style={{ color: 'white' }} onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderConfirmationModal;
