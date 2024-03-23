import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteProduct, deleteCategory } from "../../services/products";

//para cambiar titulos y texto usar las props solamente
//revisar como valido actualizacion de ordenes

export function ConfirmDeleteModal(props) {
  const HandleDelete = async () => {
    switch (props.name) {
      case "Product":
        await deleteProduct(props.id);
        break;

      case "Category":
        await deleteCategory(props.id);
        break;
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>Eliminar Registro</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Seguro desea eliminar este registro?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            HandleDelete();
          }}
        >
          Eliminar
        </Button>
        <Button onClick={props.onHide}>Cancelar</Button>
      </Modal.Footer>
    </Modal>
  );
}
