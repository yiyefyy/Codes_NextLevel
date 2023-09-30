import React, { CSSProperties, useState } from 'react';
import { Card, Flex, Text, ProgressBar } from "@tremor/react";
import internal from 'stream';

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

function CustomCardAdmin({
  title,
  description,
  date,
  status,
  capacity, 
  signUps,
  style = {}
}: CustomCardProps) {
  const [cardStatus, setCardStatus] = useState(status);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

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


  const handleSignUp = () => {
    setShowSignUpModal(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4" style={style}>
      <h2 className="text-xl font-semibold">{title}</h2>
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
    </div>
  );
}

export default CustomCardAdmin;
