import './index.css';

function MemoContainer({ memo, setMemo }) {
  if (!memo) {
    return (
      <div className="MemoContainer">
        <div className="msg-center">
          <h1>NO SELECTED MEMO</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="MemoContainer">
      <input
        type="text"
        className="MemoContainer__title"
        value={memo.title}
        onChange={(e) => {
          setMemo({
            ...memo,
            title: e.target.value,
            updatedAt: new Date().getTime(),
          });
        }}
      />
      <textarea
        className="MemoContainer__content"
        value={memo.content}
        onChange={(e) => {
          setMemo({
            ...memo,
            content: e.target.value,
            updatedAt: new Date().getTime(),
          });
        }}
      />
    </div>
  );
}

export default MemoContainer;
