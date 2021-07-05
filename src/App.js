import axios from "axios";
import { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';


function App() {
  const [nationList, setNation] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // 欄位
  const columns = [
    { field: 'id', headerName: 'areaID', flex: 1, hide: true },
    {
      field: 'flag', headerName: '國旗', flex: 1,
      renderCell: (params) => {
        return <img width="50px" src={params.value} />
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
  // function getSpecData(params) {
  //   axios.get('https://restcountries.eu/rest/v2/name/Algeria')
  //     .then((res) => {
  //       const data = res.data;
  //       setNation(data);
  //     })
  //     .catch((err) => console.log(err));
  // }
  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        autoHeight={true}
        rows={nationList}
        columns={columns}
        pageSize={25}
        disableSelectionOnClick
      />
    </div>
  );
}

export default App;
