import { useCabins } from "./useCabins.js";

import Table from "../../ui/Table.jsx";
import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow.jsx";

function CabinTable() {
    const { isLoading, cabins } = useCabins();

    if (isLoading) return <Spinner />

    return (
        <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
            <Table.Header role='row'>
                <div></div>
                <div>Cabin</div>
                <div>Capacity</div>
                <div>Price</div>
                <div>Discount</div>
                <div></div>
            </Table.Header>

            <Table.Body
                data={cabins}
                render={(cabin =>
                    <CabinRow cabin={cabin} key={cabin.id} />
                )}
            />
        </Table>
    );
}

export default CabinTable;
