import { React, useState, useEffect } from 'react';
import axios from "axios";
import styled from 'styled-components';
import { DataGrid } from '@material-ui/data-grid';
import Modal from '@material-ui/core/Modal';

function App() {
  const [nationList, setNation] = useState([]);//資料清單
  const [searchVal, setSearchVal] = useState('');//搜尋值
  const [open, setOpen] = useState(false);//Modal狀態
  const [rowDetail, setRowDetail] = useState({});//row詳細資料

  const handleOpen = (data) => {
    setRowDetail(data);
    setOpen(true);
  }

  const handleClose = () => {
    setRowDetail({});
    setOpen(false);
  }

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

  const rowDetailBody = (
    <StyledRowBody>
      <img style={{ verticalAlign: 'sub', width: '60px', marginRight: '10px' }} src={rowDetail.flag} alt="" />
      <h2 style={{ display: 'inline-block' }} id="simple-modal-title">{rowDetail.name} 詳細資料</h2>
      <p>region : {rowDetail.region}</p>
      <p>subregion : {rowDetail.subregion}</p>
      <p>nativeName : {rowDetail.nativeName}</p>
    </StyledRowBody>
  );

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

  return (
    <div style={{ width: '100%' }}>
      <Modal open={open} onClose={handleClose}>
        {rowDetailBody}
      </Modal>
      <label>國名搜尋:</label><input type="text" value={searchVal} onChange={inputVal} /><StyledBtn onClick={getNation}>搜尋</StyledBtn>
      <StyledBtn onClick={() => {
        let list = [...nationList]
        list.sort((a, b) => a.name.charCodeAt() - b.name.charCodeAt());
        setNation(list)
      }}>正序排列</StyledBtn>
      <StyledBtn onClick={() => {
        let list = [...nationList]
        list.sort((a, b) => b.name.charCodeAt() - a.name.charCodeAt());
        setNation(list)
      }}>倒序排列</StyledBtn>
      <DataGrid
        autoHeight={true}
        rows={nationList}
        columns={columns}
        pageSize={25}
        onRowDoubleClick={({ row }) => { handleOpen(row) }}
      />
    </div>
  );
}

export default App;

// style component
const StyledRowBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%; 
  transform:translate(-50%,-50%);
  width: 400;
  background-color: #fff;
  border: 2px solid #000;
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12);
  padding: 16px 32px 24px;
`;

const StyledBtn = styled.button`
 padding:10px;
 margin:5px;
 background:#0066CC;
 color:#fff;
 border:none;
 border-radius:5px;
 cursor:pointer;
`