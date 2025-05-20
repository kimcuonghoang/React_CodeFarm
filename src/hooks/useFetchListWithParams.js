import { useEffect, useState } from "react";
import api from "../api";

/**
 * * input: url, limit, skip
 * * output: list
 */

// * products
// * users

// * https://dummyjson.com/products/search?q=apple&sortBy=price&order=asc&limit=30&skip=0

// * const params = {
// * 	seach: "",
// * 	sort: "price",
// * 	order: "asc",
// * 	limit: 12,
// * 	skip: 0,
// * };

const useFetchListWithParams = (path, params) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchList = async () => {
    try {
      // setLoading(true);
      let { search, category, ...reset } = params;
      let query = new URLSearchParams(reset).toString();
      let url = path;
      if (category) {
        url += `/category/${params.category}?${query}`;
      } else if (search) {
        url += `/search?q=${search}&${query}`;
      } else {
        url += `?${query}`;
      }
      const { data } = await api.get(url);
      setList(data.products || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message || "Failed!");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, [JSON.stringify(params)]);
  return [list, loading, error];
};

export default useFetchListWithParams;
