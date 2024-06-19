import CreateCabinForm from "./CreateCabinForm.jsx";

import Button from "../../ui/Button.jsx";
import Modal from "../../ui/Modal.jsx";

function AddCabin() {
    return (
        <Modal>
            <Modal.Open opens='cabin-form'>
                <Button>Add new cabin</Button>
            </Modal.Open>
            <Modal.Window name='cabin-form'>
                <CreateCabinForm />
            </Modal.Window>

            {/*<Modal.Open opens='table'>*/}
            {/*    <Button>Show table</Button>*/}
            {/*</Modal.Open>*/}
            {/*<Modal.Window name='table'>*/}
            {/*    <CreateCabinForm />*/}
            {/*</Modal.Window>*/}
        </Modal>
    );
}

export default AddCabin;
