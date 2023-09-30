import React, { ReactNode, ButtonHTMLAttributes } from 'react';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  primary?: boolean;
  secondary?: boolean;
}

function CustomButton({
  children,
  primary,
  secondary,
  ...props
}: CustomButtonProps) {
  const buttonClasses = `
    inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none
    ${primary ? 'bg-blue-500 hover:bg-blue-600 text-white' : ''}
    ${secondary ? 'bg-gray-300 hover:bg-gray-400 text-gray-700' : ''}
  `;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}

export default CustomButton;
