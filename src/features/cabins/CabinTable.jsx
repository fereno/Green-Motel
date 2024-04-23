import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

const CabinTable = () => {
  const { isLoading, error, cabins } = useCabins();
  const[searchParams]=useSearchParams();
  if (isLoading) return <Spinner />;
  if (error) return toast.error("cabins data have some error! ");
  const filterValue = searchParams.get("discount") || "all";

  //filter
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount") filteredCabins = cabins.filter(cabin => cabin.discount === 0);
  if (filterValue === "with-discount") filteredCabins = cabins.filter(cabin => cabin.discount > 0);
  
  //sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split('-');
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
         // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};
export default CabinTable;
