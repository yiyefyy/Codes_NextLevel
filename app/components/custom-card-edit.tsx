import React, { CSSProperties, useState } from 'react';
import { Card, Flex, Text, ProgressBar } from "@tremor/react";
import CustomButton from './custom-button';
import EditForm from './edit-form';

interface CustomCardProps {
  title: string;
  description: string;
  date: string;
  status: string;
  capacity: number;
  signUps: number;
  buttonDisabled?: boolean;
  style?: CSSProperties;
}

function CustomCardEdit({
  title,
  description,
  date,
  status,
  capacity, 
  signUps,
  style = {}
}: CustomCardProps) {
  const [cardStatus, setCardStatus] = useState(status);
  const [showEditDetails, setShowEditDetails] = useState(false);

  const statusClass =
    cardStatus === 'Closed'
      ? 'text-red-500'
      : cardStatus === 'Open'
      ? 'text-green-500'
      : cardStatus === 'Cancelled'
      ? 'text-gray-500'
      : '';

    const percentage = signUps/capacity * 100

    const progressBarColour = 
        percentage >= 100
            ? 'rose'
            : percentage > 80
            ? 'amber'
            : 'teal';


  const handleEditClick = () => {
    setShowEditDetails(true)
  };

  const handleCancelEdit = () => {
      setShowEditDetails(false)
  }

  const formData = {
      eventName: title, 
      description: description,
      date: date,
      status: status,
      capacity: capacity,
      signUps: signUps
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4" style={style}>
      <div className="mt-2 flex justify-between items-start">
        <h2 className="text-xl font-semibold">{title}</h2>
        {showEditDetails? 
            <button
                className= "bg-blue-600 text-white hover:bg-white hover:text-black flex h-10 w-20 items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
                onClick={handleCancelEdit}
            >
            <p>Cancel</p>
            </button>
        :<CustomButton onClick={handleEditClick}>
            Edit
        </CustomButton>
        }

 
      </div>
      {showEditDetails 
      ? (
          <EditForm formData={formData}/>)
    : <a>
      <p className="text-gray-600 mt-2">{description}</p>

      <div className="mt-2 flex justify-between items-start">
        <a>
            <p className="text-sm text-gray-500 mt-2">{date}</p>
            <p className={statusClass}>{cardStatus}</p>
        </a>

        <Card className="max-w-sm ml-auto p-2 mr-0">
            <Flex>
                <Text> </Text>
                <Text>{signUps}/{capacity} Sign Ups</Text>
            </Flex>
            <ProgressBar value={percentage} color={progressBarColour} className="mt-3" />
        </Card>


      </div>
      </a>}
    </div>
  );
}

export default CustomCardEdit;
