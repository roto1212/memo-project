import MemoItem from '../MemoItem';
import './index.css';

function MemoList({
  memos,
  setSelectedMemoIndex,
  selectedMemoIndex,
  deleteMemo,
}) {
  return (
    <div className="MemoList">
      {memos.map((memo, index) => (
        <MemoItem
          key={index}
          onClickItem={() => setSelectedMemoIndex(index)}
          isSelected={index === selectedMemoIndex}
          onClickDelete={(e) => {
            e.stopPropagation();
            deleteMemo(index);
          }}
        >
          {memo.title}
        </MemoItem>
      ))}
    </div>
  );
}

export default MemoList;
