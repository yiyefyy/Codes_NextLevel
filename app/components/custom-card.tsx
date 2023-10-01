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
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState({
    rating: 1,
    comment: ''
  });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isEditingFeedback, setIsEditingFeedback] = useState(false);
  const [originalFeedback, setOriginalFeedback] = useState(feedback);

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

  const handleLeaveFeedback = () => {
    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmit = () => {
    setFeedbackSubmitted(true);
    setShowFeedbackModal(false);
  };

  const handleFeedbackCancelSubmit = () => {
    setIsEditingFeedback(false);
  };

  const handleViewFeedback = () => {
    setShowFeedback(true);
  };

  const handleCloseFeedback = () => {
    setShowFeedback(false);
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
              {feedbackSubmitted ? (
                <CustomButton onClick={handleViewFeedback}>
                  View Feedback
                </CustomButton>
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
