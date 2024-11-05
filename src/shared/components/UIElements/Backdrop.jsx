import { createPortal } from 'react-dom';

import './Backdrop.css';

function Backdrop({ onClick }) {
  return createPortal(
    <div className='backdrop' onClick={onClick}></div>,
    document.getElementById('backdrop-hook')
  );
}

export default Backdrop;
