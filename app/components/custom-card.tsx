import React, { CSSProperties, useEffect, useState } from 'react';
import CustomButton from './custom-button';
import { createFeedback, getFeedbackByUser } from '../../pages/api/feedbackApi';

interface CustomCardProps {
  employeeId: Number,
  eventId: number;
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
  employeeId,
  eventId,
  title,
  description,
  date,
  status,
  buttonDisabled,
  style = {},
  onSignup,
  onCancel
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
      : cardStatus === 'Attended'
      ? 'text-orange-500'
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

  const handleLeaveFeedback = () => {
    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmit = async () => {
    try {
      await createFeedback(employeeId, eventId, feedback.rating, feedback.comment);
      setFeedbackSubmitted(true);
      setShowFeedbackModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFeedbackCancelSubmit = () => {
    setShowFeedbackModal(false);
  };

  const handleViewFeedback = async () => {
    try {
      const data = await getFeedbackByUser(employeeId, eventId);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4" style={style}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      <p className="text-sm text-gray-500 mt-2">{date}</p>
      <div className="mt-2 flex justify-between items-center">
        <p className={statusClass}>{cardStatus}</p>
        <p className="text-right">
          {cardStatus === 'Registered' ? (
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
          ) : cardStatus === 'Attended' ? (
            <>
              {feedbackSubmitted ? (
                <CustomButton onClick={handleViewFeedback}>View Feedback</CustomButton>
              ) : (
                <CustomButton primary onClick={handleLeaveFeedback}>
                  Leave Feedback
                </CustomButton>
              )}
              {showFeedbackModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-white p-4 rounded shadow-md">
                    <p className="flex text-xl font-semibold">Feedback</p>
                    <div className="mt-4 flex">
                      <label htmlFor="rating" className="mr-4">
                        Rating:
                      </label>
                      <select
                        id="rating"
                        value={feedback.rating}
                        onChange={(e) =>
                          setFeedback({
                            ...feedback,
                            rating: parseInt(e.target.value)
                          })
                        }
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div className="mb-4 justify-center items-center">
                      <label htmlFor="comment" className="mr-4">
                        Comment:
                      </label>
                      <textarea
                        id="comment"
                        value={feedback.comment}
                        onChange={(e) =>
                          setFeedback({ ...feedback, comment: e.target.value })
                        }
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <CustomButton onClick={handleFeedbackCancelSubmit}>
                        Cancel
                      </CustomButton>
                      <CustomButton onClick={handleFeedbackSubmit}>
                        Submit
                      </CustomButton>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : null}
        </p>
      </div>
    </div>
  );
}

export default CustomCard;
