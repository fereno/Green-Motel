import CreateCabinForm from "./CreateCabinForm";
import CabinTable from "./CabinTable";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

const AddCabin = () => {
  //const [isOpenModal, setISOpenModal] = useState(false);

  return (
    <>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>

      <Modal>
        <Modal.Open opens="table">
          <Button>cabin table</Button>
        </Modal.Open>
        <Modal.Window name="table">
          <CabinTable />
        </Modal.Window>
      </Modal>
    </>
  );

  // return (
  //   <>
  //     {isOpenModal && (
  //       <Modal onClose={() => setISOpenModal((show) => !show)}>
  //         <CreateCabinForm onCloseModal={() => setISOpenModal(false)} />
  //       </Modal>
  //     )}
  //     <Button onClick={() => setISOpenModal((show) => !show)}>
  //       Add new cabin
  //     </Button>
  //   </>
  // );
};

export default AddCabin;
