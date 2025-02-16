import './index.css';

function SideBarFooter({ onClick }) {
  return (
    <div className="SideBarFooter">
      <button className="SideBarFooter__button" onClick={onClick}>
        + 새 메모
      </button>
    </div>
  );
}

export default SideBarFooter;
