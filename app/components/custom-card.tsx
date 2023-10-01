import React, { CSSProperties, useEffect, useState } from 'react';
import CustomButton from './custom-button';
import { createFeedback, getFeedbackByUser } from '../../pages/api/feedbackApi';
import toast, { Toaster } from 'react-hot-toast';

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
    rating: 1,
    comment: ''
  });
  const [showFeedback, setShowFeedback] = useState(false);

  const statusClass =
    cardStatus.toUpperCase() === 'REGISTERED'
      ? 'text-blue-500'
      : cardStatus.toUpperCase() === 'ATTENDED'
      ? 'text-orange-500'
      : cardStatus.toUpperCase() === 'OPEN'
      ? 'text-green-500'
      : cardStatus.toUpperCase() === 'CANCELLED' || cardStatus.toUpperCase() === 'CLOSED' 
      ? 'text-gray-500'
      : cardStatus.toUpperCase() === 'REVIEWED'
      ? 'text-orange-500'
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
      await createFeedback(`${employeeId}`, `${eventId}`, feedback.rating, feedback.comment);
      setCardStatus("Reviewed");
      setShowFeedbackModal(false);
      toast.success("Thank you for your feedback!")
    } catch (err : any) {
      toast.error(err.message)
    }
  };

  const handleFeedbackCancelSubmit = () => {
    setShowFeedbackModal(false);
  };

  const handleCloseFeedback = () => {
    setShowFeedback(false);
  };

  const handleViewFeedback = async () => {
    try {
      const data = await getFeedbackByUser(`${employeeId}`, `${eventId}`);
      setFeedback({
        rating: data.rating, 
        comment :data.comment
      });
      setShowFeedback(true);
    } catch (err : any) {
      toast.error(err.message);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4" style={style}>
      <Toaster/>
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
          ) : cardStatus.toUpperCase() === 'OPEN' ? (
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
          ) : cardStatus.toUpperCase() === 'ATTENDED' || cardStatus.toUpperCase() == 'REVIEWED' ? (
            <>
              {cardStatus.toUpperCase() == 'REVIEWED' ? (
                <CustomButton onClick={handleViewFeedback}>View Feedback</CustomButton>
              ) : (
                <CustomButton primary onClick={handleLeaveFeedback}>
                  Leave Feedback
                </CustomButton>
              )}
              {showFeedbackModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-white p-4 rounded shadow-md w-80">
                    <p className="flex text-xl font-semibold">Feedback</p>

                    <div className="mt-4 mb-4 flex items-center">
                      <label
                        htmlFor="rating"
                        className="block text-xs text-gray-600 uppercase mr-4"
                      >
                        Rating
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
                    <div className="mb-4">
                      <label
                        htmlFor="comment"
                        className="block text-xs text-gray-600 uppercase mr-4 flex"
                      >
                        Comment
                      </label>
                      <textarea
                        id="comment"
                        value={feedback.comment}
                        onChange={(e) =>
                          setFeedback({ ...feedback, comment: e.target.value })
                        }
                        rows={2}
                        className="mt-2 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
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
              )}{' '}
              {showFeedback && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-white p-4 rounded shadow-md w-80">
                    <p className="flex text-xl font-semibold">Feedback</p>

                    <div className="mt-4 mb-4 items-center">
                      <label
                        htmlFor="rating"
                        className="block text-xs text-gray-600 uppercase flex"
                      >
                        Rating
                      </label>

                      <div className="flex">{feedback.rating}</div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="comment"
                        className="block text-xs text-gray-600 uppercase flex"
                      >
                        Comment
                      </label>
                      <div className="text-left w-70 break-words">
                        {feedback.comment}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <CustomButton onClick={handleCloseFeedback}>
                        Close
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
