import React, { useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Alert, Button, DatePicker, Flex, Form, Modal, Input, Radio } from 'antd';
import { PlusCircleOutlined, EditOutlined } from '@ant-design/icons'

import patientService from '../../services/patientService';

dayjs.extend(customParseFormat)

function CreatePatient({patients, setPatients, isCreate, title, patient}) {
  const formRef = React.createRef();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [gender, setGender] = useState("")
  const [status, setStatus] = useState("")
  const dateFormat='DD-MM-YYYY'
  const showModal = () => {
    setIsModalOpen(true);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
    formRef.current.resetFields();
  };

  const onChangeGender = (e) => {
    setGender(e.target.value);
    formRef.current.setFieldsValue({
      gender: gender
    })
  };
  const onChangeDob = (date, dateString) => {
    formRef.current.setFieldsValue({
      dob: dayjs(dateString, dateFormat)
    })
  };
  const onFinish = (values) => {
    const dobchoose =  values.dob.format(dateFormat)
    values.dob = dobchoose
    if(isCreate){
       patientService.add(values)

    } else {
      patientService.update(patient.pid, values);
    }
    setStatus("success")
    handleCancel()
    window.location.reload(); 
   
  };
  const onFinishFailed = (errorInfo) => {
  };

  const disabledDate = (current) => {
    return current && current >= dayjs().subtract(1, 'day').endOf('day')
  }
  return (
    <>
      {status === "success" ?
        ( <Alert
          type="success" showIcon
          message="Success!"
          closable
        />): <div></div> }
      
      <Button type="primary" 
      onClick={showModal} 
      icon={isCreate ? <PlusCircleOutlined /> : < EditOutlined/>}
      >
       {isCreate ? title: ''}
      </Button>
      <Modal title={title} open={isModalOpen} onCancel={handleCancel}
      footer={null}
      >
        <Form
        ref={formRef}
        style={{padding:'2%', maxWidth:600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        fields={[
          {
            name: ['firstName'],
            value: patient.firstName
          },
          {
            name: ['lastName'],
            value: patient.lastName
          },
          {
            name: ['gender'],
            value: patient.gender
          },
          {
            name: ['dob'],
            value: dayjs(patient.dob, dateFormat)
          },
          {
            name: ['address'],
            value: patient.address
          },
          {
            name: ['suburb'],
            value: patient.suburb
          },
          {
            name: ['state'],
            value: patient.state
          },
          {
            name: ['postcode'],
            value: patient.postcode
          },
          {
            name: ['phoneNumber'],
            value: patient.phoneNumber
          },
        ]}
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true,
              },
              { whitespace: true 
              }  
            ]}>
              <Input placeholder='Input First Name'/>
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              { required: true,
              },
              { whitespace: true 
              }
            ]}>
              <Input placeholder='Input Last Name'/>
          </Form.Item>
          
          <Form.Item
            name="gender"
            label="Gender"
            >
              <Radio.Group 
             
              onChange={onChangeGender} value={gender}>
                <Radio.Button value='FEMALE'>Female</Radio.Button>
                <Radio.Button value='MALE'>Male</Radio.Button>
              </Radio.Group>
          </Form.Item>
          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[
              { required: true,
              }
            ]}
            
            >
              <DatePicker
              onChange={onChangeDob}
              disabledDate={disabledDate}
              format={dateFormat}
              />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
           
            rules={[
              { required: true,
              },
              { whitespace: true 
              }
            ]}>
              <Input placeholder='Input Address'/>
          </Form.Item>
          <Form.Item
            name="suburb"
            label="Suburb"
            rules={[
              { required: true,
              },
              { whitespace: true 
              }
            ]}>
              <Input placeholder='Input Suburb'/>
          </Form.Item>
          <Form.Item
            name="state"
            label="State"
            rules={[
              { required: true,
              },
              { whitespace: true 
              }
            ]}>
              <Input placeholder='Input State'/>
          </Form.Item>
          <Form.Item
            name="postcode"
            label="Postcode"
            
            rules={[
              { required: true,
              },
              { whitespace: true 
              }
            ]}>
              <Input placeholder='Input Postcode'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                }}}/>
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true,
              },
              { whitespace: true 
              }
            ]}>
              <Input placeholder='Input Phone'
               onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                }
            }}
             />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 12,
              span: 16,
            }}
          >
          <Flex wrap="wrap" gap="small">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button type="dashed"onClick={handleCancel}>
              Cancel
            </Button>
          </Flex>
        </Form.Item>

        </Form>

      </Modal>
    </>
  )
}

export default CreatePatient