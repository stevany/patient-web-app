import React, { useState } from 'react';
import { Button, Modal, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
const { Text } = Typography;


function DeletePatient({patient, title}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    window.location.reload(); 
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  }
  return (
    <>
     
      <Button type="primary" onClick={showModal} icon={<DeleteOutlined />} danger/>
      <Modal title={title} open={isModalOpen} 
      onOk={handleOk}
      onCancel={handleCancel}
      
      >
        <Text>Are you sure to delete patient {patient.firstName}?</Text>
      </Modal>
    </>
  )
}

export default DeletePatient