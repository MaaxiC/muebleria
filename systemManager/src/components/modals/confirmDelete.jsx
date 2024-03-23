import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteProduct, deleteCategory } from "../../services/products";
import Swal from "sweetalert2";

//para cambiar titulos y texto usar las props solamente
//revisar como valido actualizacion de ordenes

export function ConfirmDeleteModal(props) {
  const HandleDelete = async () => {
    switch (props.name) {
      case 'Producto':
        await deleteProduct(props.id);
        break;

      case "Categoría":
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
          <h4>Eliminar {props.name}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
       ¿Seguro desea eliminar {props.mensaje + props.titulo} ?
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            HandleDelete();
            window.location.reload();
          }}
        >
          Eliminar
        </Button>
        <Button onClick={props.onHide}>Cancelar</Button>
      </Modal.Footer>
    </Modal>
  );
}
