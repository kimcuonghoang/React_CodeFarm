import React, { useEffect, useState } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      });
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [search, sortOrder, products]);

  const totalPages = Math.ceil(filteredProducts.length / limit);
  const startIndex = (page - 1) * limit;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + limit
  );

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));
  function handleChange(e) {
    setSearch(e.target.value);
  }
  function handleSort(e) {
    setSortOrder(e.target.value);
  }
  function handleLimit(e) {
    setLimit(parseInt(e.target.value));
    setPage(1);
  }
  return (
    <div>
      <h1>Danh sách sản phẩm</h1>

      <div>
        <input
          type="text"
          placeholder="search product..."
          value={search}
          onChange={handleChange}
        />

        <select value={sortOrder} onChange={handleSort}>
          <option value="">Sắp xếp theo giá</option>
          <option value="asc">Giá tăng dần</option>
          <option value="desc">Giá giảm dần</option>
        </select>

        <select value={limit} onChange={handleLimit}>
          <option value={6}>6</option>
          <option value={12}>12</option>
          <option value={24}>24</option>
        </select>
      </div>

      <div>
        {currentProducts.map((item) => (
          <div key={item.id}>
            <img src={item.thumbnail} />
            <h2>{item.title}</h2>
            <p>${item.price}</p>
          </div>
        ))}
      </div>

      <div>
        <button onClick={handlePrev}>Trước</button>

        <span>{page}</span>

        <button onClick={handleNext}>Sau</button>
      </div>
    </div>
  );
};

export default App;
