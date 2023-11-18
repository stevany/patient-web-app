import React, { useEffect } from "react";
import patientService from "../../services/patientService";
import { Table, Space } from "antd";
import CreatePatient from './CreatePatient'
import DeletePatient from './DeletePatient'

function PatientTable({patients, setPatients, page, size, total, setPage, setTotal, filterWord}) {

  useEffect(() => {
    patientService.getAll(page, size, filterWord)
    .then(patients => {
      setPatients(patients.patients)
      setPage(patients.page)
      setTotal(patients.total)
    })
   
    
  }, [page, size, setPage, setTotal, filterWord, setPatients])

  
 
  const columns = [
    {
      title: 'PID',
      dataIndex: 'pid',
      key: 'pid',
     
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      responsive: ['sm'],
     
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      responsive: ['sm'],
     
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
      responsive: ['sm'],

    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      responsive: ['sm'],

    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      responsive: ['sm'],
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      responsive: ['sm'],

    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record, index) => (
        <Space>
          <CreatePatient patients={patients} setPatients={setPatients} patient={record} title='Edit patient'/>
          <DeletePatient patient={record} title="Delete patient"/>
        </Space> 
    )
    },
  ]
  const data = patients.map((patient => {
    return (
      {
        pid: patient.id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        dob: patient.dob,
        gender: patient.gender,
        address: `${patient.address}, ${patient.suburb}, ${patient.state}, ${patient.postcode}`,
        suburb: patient.suburb,
        state: patient.state,
        postcode: patient.postcode,
        phoneNumber: patient.phoneNumber,
        key: patient.id,
      }
    )
  }))

  return (
    <div>
      <div style = {{display:'flex'}}>
        <h2 style={{paddingLeft: '1.5%', paddingTop: '1%'}}>
          Patient Table
        </h2>
        
      </div>
    <Table
      style={{padding: '1%'}}
      columns={columns}
      dataSource={data}
      pagination={{ total: {total},
       onChange: (page, pageSize) => {
        patientService
          .getAll(page, pageSize)
          .then(patients => {
            setPatients(patients.patients)
            setPage(patients.page)
            setTotal(patients.total)
          })
      } }}
    />
    </div>
  )
}

export default PatientTable