import React, { useState } from "react";
import { students } from "./dataStudents";
const App = () => {
  const [filterRank, setRank] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  function handleSort(e) {
    setSort(e.target.value);
  }
  function handleSearch(e) {
    setSearch(e.target.value);
  }
  function handleRank(e) {
    setRank(e.target.value);
  }
  function diemTB(item) {
    const avg = ((+item.math + +item.english + +item.literature) / 3).toFixed(
      1
    );
    let rank = "";
    if (avg >= 8) rank = "Giỏi";
    else if (avg >= 6.5) rank = "Khá";
    else if (avg >= 5) rank = "Trung bình";
    else rank = "Yếu";
    return { avg, rank };
  }
  return (
    <>
      <input
        type="text"
        placeholder="search students"
        onChange={handleSearch}
      />

      <select onChange={handleSort}>
        <option value="">Sắp xếp theo</option>
        <option value="desc">Cao → Thấp</option>
        <option value="asc">Thấp → Cao</option>
      </select>

      <select onChange={handleRank}>
        <option value="">Lọc theo học lực</option>
        <option value="Giỏi">Giỏi</option>
        <option value="Khá">Khá</option>
        <option value="Trung bình">Trung bình</option>
        <option value="Yếu">Yếu</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Math</th>
            <th>literature</th>
            <th>english</th>
            <th>Điểm TB</th>
            <th>Học lực</th>
          </tr>
        </thead>
        <tbody>
          {students
            .filter((item) => {
              const { rank } = diemTB(item);
              const matchRank = filterRank === "" || filterRank === rank;
              const matchSearch = item.name
                .toLowerCase()
                .includes(search.toLowerCase());
              return matchRank && matchSearch;
            })
            .sort((a, b) => {
              const avgA = ((+a.math + +a.english + +a.literature) / 3).toFixed(
                1
              );
              const avgB = ((+b.math + +b.english + +b.literature) / 3).toFixed(
                1
              );
              if (sort === "") {
                return 0;
              } else if (sort === "desc") {
                return avgB - avgA;
              } else {
                return avgA - avgB;
              }
            })
            .map((item) => {
              const { avg, rank } = diemTB(item);
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.math}</td>
                  <td>{item.literature}</td>
                  <td>{item.english}</td>
                  <td>{avg}</td>
                  <td>{rank}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default App;
