import React, { ReactNode } from 'react';

type ButtonProps = {
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  iconOnly?: boolean;
  label?: string;
};

export const Button = ({
  onClick,
  size = 'medium',
  variant = 'primary',
  icon,
  iconPosition = 'left',
  iconOnly = false,
  label,
}:ButtonProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-2 py-1 text-sm';
      case 'large':
        return 'px-4 py-2 text-lg';
      default:
        return 'px-3 py-2 text-base';
    }
  };

  const getStatusClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-300 text-gray-800';
      case 'success':
        return 'bg-green-500 text-white';
      case 'danger':
        return 'bg-red-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const getIconClasses = () => {
    if (iconOnly) {
      return 'mr-2';
    } else {
      return iconPosition === 'left' ? 'mr-2' : 'ml-2';
    }
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${variant}-500 ${getSizeClasses()} ${getStatusClasses()}`}
      onClick={onClick}
    >
      {icon && iconPosition === 'left' && <span className={getIconClasses()}>{icon}</span>}
      {!iconOnly && label}
      {icon && iconPosition === 'right' && <span className={getIconClasses()}>{icon}</span>}
    </button>
  );
};
