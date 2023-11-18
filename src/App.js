import React, { useState } from 'react'
import PatientTable from './components/page/PatientTable'
import CreatePatient from './components/page/CreatePatient'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { Col, Row, Space } from 'antd';
import SearchButton from './components/button/SearchButton';


dayjs.extend(customParseFormat)

function App() {
  const [patients, setPatients] = useState([])
  const [patient, setPatient] = useState({
    pid: null,
    firstName: '',
    lastName: '',
    dob: dayjs().subtract(1, 'day').format("DD-MM-YYYY"),
    gender: null,
    address: '',
    state: '',
    suburb: '',
    postcode: '',
    phoneNumber: null,
  })
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [filterWord, setFilterWord] = useState('')

  return (
    <div style={{margin: '2%'}}>
      <Space direction="vertical" size="large" style={{ display: 'flex' }}>

      <Row justify={'end'} align={'bottom'}>
        <Col span={3} style={{paddingLeft: '1%'}}>
          <CreatePatient 
            patients={patients} 
            setPatients={setPatients} 
            title='Create patient' 
            isCreate={true} 
            patient={patient}/>
        </Col>
        <Col span={4}>
          <SearchButton page={page} size={size} setPatients={setPatients} setFilterWord={setFilterWord} setPage={setPage} setTotal={setTotal} />
        </Col>
      </Row>
      </Space>
      <PatientTable 
        page={page} 
        size={size}
        total={total}
        filterWord={filterWord} 
        setPage={setPage} 
        setTotal={setTotal}
        patients={patients} 
        setPatients={setPatients}/>
    
    </div>
    
  );
}

export default App;
