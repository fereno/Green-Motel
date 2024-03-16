import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

const AddCabin = () => {
  const [isOpenModal, setISOpenModal] = useState(false);

  return (
    <>
      {isOpenModal && (
        <Modal onClose={() => setISOpenModal((show) => !show)}>
          <CreateCabinForm onCloseModal={() => setISOpenModal(false)} />
        </Modal>
      )}
      <Button onClick={() => setISOpenModal((show) => !show)}>
        Add new cabin
      </Button>
    </>
  );
};

export default AddCabin;
