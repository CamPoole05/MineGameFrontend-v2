import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [gridData, setGridData] = useState(null);
  const [data, setData] = useState(null);

  async function makeMove() {
    const stringGrid = gridData.map(row => row.join(',')).join(';'); // Convert 2D array to a string
    const rowWidth = gridData[0].length;
  
    const apiUrl = `https://localhost:7095/api/makemove?minesHit=0&stringGrid=${stringGrid}&rowWidth=${rowWidth}&dir=u`;
  
    console.log(apiUrl);
  
    const gridresponse = await fetch(apiUrl);
    const json = await gridresponse.json();
    console.log(json);
  
    let newData = '';
    let gridDataArray = [];
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        const rowArray = json[key];
        gridDataArray.push(rowArray);
        const updatedRow = rowArray.map(cell => (cell === 'M' ? '-' : cell));
        console.log(`Row ${key}:`, updatedRow);
        newData += '|' + updatedRow.join('|') + '|<br>';
      }
    }
    console.log(newData);
    setGridData(gridDataArray);
    setData(newData);
  }
  
  

  useEffect(() => {
    async function getGrid() {
      const response = await fetch('https://localhost:7095/api/hello?width=6&height=6');
      const json = await response.json();
      let newData = '';
      let gridDataArray = [];
      for (const key in json) {
        if (json.hasOwnProperty(key)) {
          const rowArray = json[key];
          gridDataArray.push(rowArray);
          const updatedRow = rowArray.map(cell => (cell === 'M' ? '-' : cell));
          console.log(`Row ${key}:`, updatedRow);
          newData += '|' + updatedRow.join('|') + '|<br>';
        }
      }
      console.log(gridDataArray);
      setGridData(gridDataArray);
      setData(newData);
    }

    getGrid();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mine Game</h1>
      </header>
      <div className="App-body">
        <p id="grid" dangerouslySetInnerHTML={{ __html: data || 'Loading...' }}></p>
        <div onClick={makeMove}>
          <p>Move</p>
        </div>
      </div>
    </div>
  );
}

export default App;
