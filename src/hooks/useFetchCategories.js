import React, { useEffect, useState } from "react";
import api from "../api";

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("products/categories");
      setCategories(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return [categories, loading, error];
};

export default useFetchCategories;
