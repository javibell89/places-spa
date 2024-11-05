import './SideDrawer.css';
import { createPortal } from 'react-dom';

function SideDrawer({ children }) {
  const content = <aside className='side-drawer'>{children}</aside>;

  return createPortal(content, document.getElementById('drawer-hook'));
}

export default SideDrawer;
