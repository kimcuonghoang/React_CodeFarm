import React from "react";
import useQueryParams from "./hooks/useQueryParams";
import useFetchListWithParams from "./hooks/useFetchListWithParams";
import useFetchCategories from "./hooks/useFetchCategories";
import "./index.css";

const App = () => {
  const [categories] = useFetchCategories();

  const [params, updateParams, resetParams] = useQueryParams({
    search: "",
    skip: 0,
    limit: 12,
    sortBy: "",
    order: "",
    page: 1,
    category: "",
  });

  const [products, loading, error] = useFetchListWithParams("products", params);

  const handlePage = (newPage) => {
    if (newPage < 1) return;
    updateParams({
      ...params,
      skip: (newPage - 1) * params.limit,
      page: newPage,
    });
  };

  const handleLimit = (newLimit) => {
    updateParams({ ...params, limit: newLimit, skip: 0, page: 1 });
  };

  const handleSort = (e) => {
    const [sortBy, order] = e.target.value.split("-");
    updateParams({
      ...params,
      sortBy,
      order,
      skip: 0,
      page: 1,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-5 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Danh sách sản phẩm
      </h1>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          value={params.search}
          onChange={(e) =>
            updateParams({
              ...params,
              search: e.target.value,
              skip: 0,
              page: 1,
            })
          }
          placeholder="Tìm kiếm..."
          className="px-3 py-2 border rounded-md shadow-sm w-52"
        />

        <div className="flex items-center gap-2">
          <span>Hiển thị</span>
          <select
            value={params.limit}
            onChange={(e) => handleLimit(Number(e.target.value))}
            className="px-2 py-1 border rounded-md"
          >
            <option value="12">12</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="194">all</option>
          </select>
          <span>sản phẩm</span>
        </div>

        <select
          value={`${params.sortBy}-${params.order}`}
          onChange={handleSort}
          className="px-2 py-1 border rounded-md"
        >
          <option value="-">Sắp xếp</option>
          <option value="price-desc">Cao - Thấp</option>
          <option value="price-asc">Thấp - Cao</option>
          <option value="title-asc">A - Z</option>
          <option value="title-desc">Z - A</option>
        </select>
        <select
          value={params.category}
          onChange={(e) => {
            const selectedCategory = e.target.value;
            updateParams({
              ...params,
              category: selectedCategory,
              search: "",
              page: 1,
              skip: 0,
            });
          }}
          className="px-2 py-1 border rounded-md"
        >
          <option value="">Tất cả danh mục</option>
          {categories &&
            categories.map((cate) => {
              const categorySlug = typeof cate === "string" ? cate : cate.slug;
              const categoryName = typeof cate === "string" ? cate : cate.name;
              return (
                <option key={categorySlug} value={categorySlug}>
                  {categoryName}
                </option>
              );
            })}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 shadow-md rounded border border-gray-200"
          >
            <img src={item.thumbnail} alt="" />
            <div className="font-semibold">{item.title}</div>
            <div className="text-blue-500 font-bold">{item.price} đ</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => handlePage(params.page - 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          Preview
        </button>
        <span className="text-lg font-semibold">{params.page}</span>
        <button
          onClick={() => handlePage(params.page + 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
