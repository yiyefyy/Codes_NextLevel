import React, { CSSProperties, useState } from 'react';

interface CustomCardProps {
  title: string;
  description: string;
  date: string;
  status: string;
  buttonDisabled?: boolean;
  style?: CSSProperties;
}

function CustomCardRegistered({
  title,
  description,
  date,
  status,
  style = {}
}: CustomCardProps) {

  const [cardStatus, setCardStatus] = useState(status);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: ''
  });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const statusClass =
    cardStatus === 'Registered'
      ? 'text-blue-500'
      : cardStatus === 'Open'
      ? 'text-green-500'
      : cardStatus === 'Cancelled'
      ? 'text-gray-500'
      : '';

  return (
    <div className="bg-white rounded-lg shadow-md p-4" style={style}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      <p className="text-sm text-gray-500 mt-2">{date}</p>
      <div className="mt-2 flex justify-between items-center">
        <p className={statusClass}>{cardStatus}</p>
        <p className="text-right">

        </p>
      </div>
    </div>
  );
}

export default CustomCardRegistered;
