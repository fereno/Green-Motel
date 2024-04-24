/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleOnChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  const sortBy = searchParams.get("sortBy") || "";
  return (
    <Select
      options={options}
      type="white"
      onChange={handleOnChange}
      value={sortBy}
    />
  );
};

export default SortBy;
