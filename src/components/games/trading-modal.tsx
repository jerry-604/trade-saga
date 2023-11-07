import React, { ReactElement, useState, useEffect } from "react";

const Modal = ({ isOpen, children, onClose }) => {
    const [isAnimating, setIsAnimating] = useState(false);
  
    useEffect(() => {
      if (isOpen) {
        setIsAnimating(true);
      }
    }, [isOpen]);
  
    const handleClose = () => {
      setIsAnimating(false);
      setTimeout(onClose, 150);
    };
  
    if (!isOpen && !isAnimating) return null;
  
    return (
      <>
        <div
          className={`fixed inset-0 z-40 bg-[#3e3e3e] transition-opacity duration-150 ${isOpen && isAnimating ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
          onClick={handleClose}
        ></div>
        <div
          className={`fixed inset-0 z-50 overflow-auto flex items-center justify-center transition-opacity duration-150 ${isOpen && isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <div
            className="relative bg-white p-8 w-full max-w-md m-auto rounded-lg shadow-lg transition-transform duration-150"
            style={{ transform: isOpen ? 'scale(1)' : 'scale(0.95)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 right-0 p-4">
              <button
                onClick={handleClose}
                className="text-black bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            {children}
          </div>
        </div>
      </>
    );
  };

  export default Modal;