import React, { CSSProperties, ReactNode } from 'react';
import CustomButton from './custom-button';

interface CustomCardProps {
  title: string;
  description: string;
  date: string;
  status: string;
  buttonDisabled?: boolean;
  style?: CSSProperties;
}

function CustomCard({
  title,
  description,
  date,
  status,
  buttonDisabled = false,
  style = {}
}: CustomCardProps) {
  const statusClass =
    status === 'Registered'
      ? 'text-blue-500'
      : status === 'Open'
      ? 'text-green-500'
      : status === 'Cancelled'
      ? 'text-gray-500'
      : '';

  return (
    <div className="bg-white rounded-lg shadow-md p-4" style={style}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      <p className="text-sm text-gray-500 mt-2">{date}</p>
      <div className="mt-2 flex justify-between items-center">
        <p className={statusClass}>{status}</p>
        <p className="text-right">
          {status === 'Registered' ? (
            <CustomButton secondary disabled={buttonDisabled}>
              Cancel
            </CustomButton>
          ) : status !== 'Cancelled' ? (
            <CustomButton primary disabled={buttonDisabled}>
              Sign Up
            </CustomButton>
          ) : null}
        </p>
      </div>
    </div>
  );
}

export default CustomCard;
