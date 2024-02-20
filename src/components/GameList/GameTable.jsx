import React, { useEffect, useState } from "react";

const GamesTable = (prop) => {
  console.log(prop);
  const { games, columns } = prop;
  const [rows, setRows] = useState();
  // Функция для разбиения массива игр на строки в зависимости от количества колонок
  function chunkArray(arr, col) {
    console.log("arr", arr);
    const chunks = [];
    for (let i = 0; i < arr.length; i += col) {
      chunks.push(arr.slice(i, i + col));
    }
    console.log("chunks", chunks);
    return chunks;
  }
  useEffect(() => {
    setRows(chunkArray(games, columns));
    console.log("columns", columns);
    console.log("========", rows);
  }, []);

  const widthRow = {
    2: "45vw",
    3: "30vw",
    4: "22vw",
  };

  return (
    <table>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GamesTable;
