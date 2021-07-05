import { useState, useEffect } from 'react';
import axios from "axios";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function App() {
  const [nationList, setNation] = useState([]);//資料清單
  const [searchVal, setSearchVal] = useState('');//搜尋值

  useEffect(() => {
    getData();
  }, []);

  // 欄位
  const columns = [
    { field: 'id', headerName: 'areaID', flex: 1, hide: true },
    {
      field: 'flag', headerName: '國旗', flex: 1,
      renderCell: (params) => {
        return <img width="50px" src={params.value} alt="" />
      }
    },
    { field: 'name', headerName: '國家', flex: 1, },
    { field: 'alpha2Code', headerName: '2位國家代碼', flex: 1, },
    { field: 'alpha3Code', headerName: '3位國家代碼', flex: 1, },
    { field: 'nativeName', headerName: ' 母語名稱', flex: 1, },
    { field: 'altSpellings', headerName: '替代國家名稱', flex: 1, },
    { field: 'callingCodes', headerName: '國際電話區號', type: 'number', flex: 1, },
  ];

  function getData() {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then((res) => {
        const data = res.data;
        setNation(data.map((d, index) => { return { ...d, id: index } }));
      })
      .catch((err) => console.log(err));
  }
  function getNation() {
    if (!searchVal) return alert('請輸入值');
    let url = `https://restcountries.eu/rest/v2/name/${searchVal}`
    axios.get(url)
      .then((res) => {
        const data = res.data;
        setNation(data.map((d, idx) => {
          return { ...d, id: idx }
        }));
        setSearchVal('');
      })
      .catch((err) => console.log(err));
  }

  function inputVal(e) {
    let val = e.target.value;
    setSearchVal(val);
  }

  return (
    <div style={{ width: '100%' }}>
      <label>國名搜尋:</label><input type="text" value={searchVal} onChange={inputVal} /><button onClick={getNation}>搜尋</button>
      <button onClick={() => {
        let list = [...nationList]
        list.sort((a, b) => a.name.charCodeAt() - b.name.charCodeAt());
        setNation(list)
      }}>正序排列</button>
      <button onClick={() => {
        let list = [...nationList]
        list.sort((a, b) => b.name.charCodeAt() - a.name.charCodeAt());
        setNation(list)
      }}>倒序排列</button>
      <DataGrid
        autoHeight={true}
        rows={nationList}
        columns={columns}
        pageSize={25}
        onRowDoubleClick={({ row }) => {
        }}
      />
    </div>
  );
}

export default App;
