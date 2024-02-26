import { Modal } from "react-bootstrap";
import { useState } from "react";

function WhatsAppButton() {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

return (
    <>
<div>
      <img
        className="whatsapp-button"
        onClick={handleOpenModal}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/479px-WhatsApp_icon.png"
        alt="WhatsApp Logo"
        style={{ marginRight: "-8px" }}
        width={70}
        height={70}
      />
</div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Contactar por WhatsApp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <a
            href="https://api.whatsapp.com/send/?phone=%2B5493516613241&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contactar por WhatsApp
          </a>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default WhatsAppButton;
