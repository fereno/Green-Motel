import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter filterField="discount"/>
    </TableOperations>
  );
};

export default CabinTableOperations;
