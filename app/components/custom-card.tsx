import React, { CSSProperties, useState } from 'react';
import CustomButton from './custom-button';

interface CustomCardProps {
  title: string;
  description: string;
  date: string;
  status: string;
  buttonDisabled?: boolean;
  style?: CSSProperties;
  onSignup?: () => void;
  onCancel?: () => void;
}

function CustomCard({
  title,
  description,
  date,
  status,
  buttonDisabled,
  style = {},
  onSignup,
  onCancel
}: CustomCardProps) {
  const currentDate = new Date();
  const cardDate = new Date(date);
  const [cardStatus, setCardStatus] = useState(status);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const statusClass =
    cardStatus === 'Registered'
      ? 'text-blue-500'
      : cardStatus === 'Open'
      ? 'text-green-500'
      : cardStatus === 'Cancelled'
      ? 'text-gray-500'
      : '';

  const handleSignUp = () => {
    setShowSignUpModal(true);
    if (onSignup) {
      onSignup();
    }
  };

  const handleConfirmSignUp = () => {
    setCardStatus('Registered');
    setShowSignUpModal(false);
    if (onSignup) {
      onSignup();
    }
  };

  const handleCancelSignUp = () => {
    setShowSignUpModal(false);
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setCardStatus('Open');
    setShowCancelModal(false);
    if (onCancel) {
      onCancel();
    }
  };

  const handleCancelCancellation = () => {
    setShowCancelModal(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4" style={style}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      <p className="text-sm text-gray-500 mt-2">{date}</p>
      <div className="mt-2 flex justify-between items-center">
        <p className={statusClass}>{cardStatus}</p>
        <p className="text-right">
          {cardStatus === 'Registered' && cardDate > currentDate ? (
            <>
              <CustomButton
                secondary
                onClick={handleCancel}
                disabled={buttonDisabled}
              >
                Cancel
              </CustomButton>
              {showCancelModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-white p-4 rounded shadow-md">
                    <p>Confirm Cancellation?</p>
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
            </>
          ) : cardStatus === 'Open' ? (
            <>
              <CustomButton primary onClick={handleSignUp}>
                Sign Up
              </CustomButton>
              {showSignUpModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-white p-4 rounded shadow-md">
                    <div className="flex flex-col items-center">
                      {' '}
                      <p>Confirm Sign Up?</p>
                      <div className="flex justify-between mt-4 w-full">
                        {' '}
                        <CustomButton onClick={handleConfirmSignUp}>
                          Confirm
                        </CustomButton>
                        <CustomButton onClick={handleCancelSignUp}>
                          Cancel
                        </CustomButton>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : cardStatus === 'Registered' && cardDate < currentDate ? (
            <>
              <CustomButton primary>Leave Feedback</CustomButton>
            </>
          ) : null}
        </p>
      </div>
    </div>
  );
}

export default CustomCard;
