import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  icon
}) => {
  const isPrimary = variant === 'primary';
  
  const baseStyles = "px-3 py-1 rounded-full font-sk font-bold transition-all active:scale-95 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "btn-anim shadow-lg shadow-black/5 hover:scale-105",
    secondary: "bg-white border border-black/10 text-brand-text hover:bg-gray-50 hover:scale-105",
    outline: "btn-outline-anim"
  };

  const currentVariant = variants[variant] || variants.primary;

  return (
    <button 
      className={`${baseStyles} ${currentVariant} ${className}`}
      onClick={onClick}
    >
      {isPrimary ? (
        <span className="text-container py-2 px-5 flex items-center gap-2">
          <span className="text flex items-center gap-2">
            {children}
            {icon && <span className="transition-transform duration-300">{icon}</span>}
          </span>
        </span>
      ) : (
        <>
          {children}
          {icon && <span className="transition-transform duration-300">{icon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
