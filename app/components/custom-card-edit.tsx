import React, { CSSProperties, useState } from 'react';
import { Card, Flex, Text, ProgressBar } from "@tremor/react";
import CustomButton from './custom-button';
import EditForm from './edit-form';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect } from 'react';
import { updateEvent, changeEventStatus } from "../../pages/api/eventApis";

interface CustomCardProps {
  id: number,
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
  id,
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
  const [showCancelModal, setShowCancelModal] = useState(false);

  const statusClass =
    cardStatus === 'Closed'
      ? 'text-red-500'
      : cardStatus === 'Open'
        ? 'text-green-500'
        : cardStatus === 'Cancelled'
          ? 'text-gray-500'
          : '';

  const percentage = signUps / capacity * 100

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

  const handleSwitch = async (e: any) => {
    console.log(id)
      setCardStatus("Closed")
      try {
        console.log(id)
        const status = await changeEventStatus(`${id}`, "Closed")
        console.log('Event updated successfully:', status);
      } catch (err) {

      }
    e.preventDefault();
    if (e.target.checked) {
      setCardStatus("Open")
      try {
        const status = await changeEventStatus(`${id}`, cardStatus)
        console.log('Event updated successfully:', status);
      } catch (err) {

      }
    } else {
      console.log(id)
      setCardStatus("Closed")
      try {
        console.log(id)
        const status = await changeEventStatus(`${id}`, cardStatus)
        console.log('Event updated successfully:', status);
      } catch (err) {

      }
    }
  }

  const handleCancelEvent = () => {
    setShowCancelModal(true)
  };

  const handleConfirmCancel = async (e:any) => {
    e.preventDefault();
    setCardStatus('Open');
    setShowCancelModal(false);
    setShowEditDetails(false);
    setCardStatus("Cancelled");
    try {
      const status = await changeEventStatus(`${id}`, cardStatus)
      console.log('Event updated successfully:', status);
    } catch (err) {

    }
  };

  const handleCancelCancellation = () => {
    setShowCancelModal(false);
  };


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
        {showEditDetails ?
          <button
            className="bg-blue-600 text-white hover:bg-white hover:text-black flex h-10 w-20 items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
            onClick={handleCancelEdit}
          >
            <p>Cancel</p>
          </button>
          : <CustomButton onClick={handleEditClick}>
            Edit
          </CustomButton>
        }


      </div>
      {showEditDetails
        ? (<div className='flex flex-col'>
          <EditForm eventId={id} />
          <button
            className="bg-red-500 text-white hover:bg-white hover:text-black self-center
        flex h-10 w-4/12 items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
            onClick={handleCancelEvent}
          >
            <p>Cancel Event</p>
          </button>
          {showCancelModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-50">
              <div className="bg-white p-4 rounded shadow-md flex items-center flex-col">
                <p>Cancel {title}?</p>
                <div className="flex justify-end mt-4">
                  <CustomButton onClick={handleConfirmCancel}>
                    Confirm
                  </CustomButton>
                  <CustomButton onClick={handleCancelCancellation}>
                    Cancel
                  </CustomButton>
                </div>
              </div>
            </div>
          )}
        </div>)
        : <div>
          <p className="text-gray-600 mt-2">{description}</p>

          <div className="mt-2 flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mt-2">{date}</p>
              <FormControlLabel
                value="end"
                control={<Switch color="success" defaultChecked={cardStatus == "Open"} />}
                label={cardStatus}
                labelPlacement="end"
                className={statusClass}
                onChange={handleSwitch}
              />
            </div>



            <Card className="max-w-sm ml-auto p-2 mr-0">
              <Flex>
                <Text> </Text>
                <Text>{signUps}/{capacity} Sign Ups</Text>
              </Flex>
              <ProgressBar value={percentage} color={progressBarColour} className="mt-3" />
            </Card>


          </div>
        </div>}
    </div>
  );
}

export default CustomCardEdit;
