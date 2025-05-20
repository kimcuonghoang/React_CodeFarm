import { useState } from "react";

const inititalParams = {
  search: "",
  sortBy: "price",
  order: "asc",
  limit: 12,
  page: 1,
  skip: 0,
  category: "",
};

const useQueryParams = (query) => {
  const [params, setParams] = useState(query);

  const resetParams = () => {
    setParams(inititalParams);
  };

  const updateParams = (newQuery) => {
    setParams((prev) => ({
      ...prev,
      ...newQuery,
    }));
  };
  return [params, updateParams, resetParams];
};

export default useQueryParams;
