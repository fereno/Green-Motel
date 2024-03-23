import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

const AddCabin = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
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
