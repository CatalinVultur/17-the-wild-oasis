import { formatCurrency } from "../../utils/helpers.js";
import { useCreateCabin } from "./useCreateCabin.js";
import { useDeleteCabin } from "./useDeleteCabin.js";
import styled from "styled-components";

import CreateCabinForm from "./CreateCabinForm.jsx";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono", sans-serif;
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono", sans-serif;
    font-weight: 500;
    color: var(--color-green-700);
`;

function CabinRow({cabin}) {
    const {isDeleting, deleteCabin} = useDeleteCabin();
    const {isCreating, createCabin} = useCreateCabin();
    const {
        id: cabinId,
        name,
        maxCapacity,
        regularPrice,
        discount,
        image,
        description
    } = cabin;

    function handleDuplicate() {
        createCabin({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            image,
            description
        })
    }

    return (
        <Table.Row columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
            <Img src={image}/>
            <Cabin>{name}</Cabin>
            <div>Fits up to {maxCapacity} guests</div>
            <Price>
                {formatCurrency(regularPrice)}
            </Price>
            {discount ?
                <Discount>
                    {formatCurrency(discount)}
                </Discount>
                :
                <span>&mdash;</span>
            }
            <div>
                <button disabled={isCreating}>

                </button>

                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={cabinId} />

                        <Menus.List id={cabinId}>
                            <Menus.Button
                                icon={<HiSquare2Stack/>}
                                onClick={handleDuplicate}
                            >
                                Duplicate
                            </Menus.Button>

                            <Modal.Open opens='edit'>
                                <Menus.Button icon={<HiPencil/>}>
                                    Edit
                                </Menus.Button>
                            </Modal.Open>

                            <Modal.Open opens='delete'>
                                <Menus.Button icon={<HiTrash/>}>
                                    Delete
                                </Menus.Button>
                            </Modal.Open>
                        </Menus.List>
                    </Menus.Menu>

                    <Modal.Window name='edit'>
                        <CreateCabinForm cabinToEdit={cabin} />
                    </Modal.Window>

                    <Modal.Window name='delete'>
                        <ConfirmDelete
                            resourceName='cabin'
                            disabled={isDeleting}
                            onConfirm={() => deleteCabin(cabinId)}
                        />
                    </Modal.Window>
                </Modal>
            </div>
        </Table.Row>
    );
}

export default CabinRow;
