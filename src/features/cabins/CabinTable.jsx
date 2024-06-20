import { useSearchParams } from "react-router-dom";
import { useCabins } from "./useCabins.js";

import Table from "../../ui/Table.jsx";
import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow.jsx";
import Menus from "../../ui/Menus.jsx";

function CabinTable() {
    const { isLoading, cabins } = useCabins();
    const [searchParams] = useSearchParams();

    const filterValue = searchParams.get('discount') || 'all';

    let filteredCabins;
    if (filterValue === 'all') filteredCabins = cabins;
    if (filterValue === 'no-discount') filteredCabins = cabins.filter(cabin => cabin.discount === 0);
    if (filterValue === 'with-discount') filteredCabins = cabins.filter(cabin => cabin.discount > 0);

    if (isLoading) return <Spinner />

    return (
        <Menus>
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
                    data={filteredCabins}
                    render={(cabin =>
                        <CabinRow cabin={cabin} key={cabin.id} />
                    )}
                />
            </Table>
        </Menus>
    );
}

export default CabinTable;
