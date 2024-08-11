import { useEffect } from 'react';
import { createPortal } from 'react-dom';

function createPortalWrapper() {
  const element = document.createElement('div');
  element.id = 'modal-wrapper';
  return element;
}

const portalWrapperElement = createPortalWrapper();

const Modal = ({ onClose = () => {}, hidden = false, children }) => {
  useEffect(() => {
    document.body.appendChild(portalWrapperElement);
  }, []);

  const renderContent = (
    <div
      className={`fixed inset-0 z-[999] flex transition-all items-center justify-center px-[15px] ${
        hidden ? '' : 'opacity-0 invisible '
      }`}
    >
      <div
        className='absolute inset-0 bg-black bg-opacity-25'
        onClick={onClose}
      ></div>
      <div
        className={`transition-all relative flex items-center justify-center z-10 rounded-md overflow-hidden ${
          hidden ? 'scale-100' : 'scale-90'
        }`}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(renderContent, portalWrapperElement);
};

export default Modal;
