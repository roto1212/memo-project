import { useState } from 'react';
import './App.css';
import MemoContainer from './components/MemoContainer';
import SideBar from './components/SideBar';

function App() {
  const [memos, setMemos] = useState([
    {
      id: 1,
      title: 'Title 1',
      content: 'Content 1',
    },
    {
      id: 2,
      title: 'Title 2',
      content: 'Content 2',
    },
    {
      id: 3,
      title: 'Title 3',
      content: 'Content 3',
    },
  ]);

  const [selectedMemoIndex, setSelectedMemoIndex] = useState(0);
  const setMemo = (newMemo) => {
    // 불변성 훼손 코드
    // memos[selectedMemoIndex] = newMemo; // 원본 배열을 직접 수정하여 불변성이 깨짐
    // setMemos([...memos]);

    // 불변성 유지 코드(위 코드와 동일한 기능)
    const newMemos = [...memos]; // 원본 배열을 복사하여 새로운 배열을 생성, 불변성이 유지됨
    newMemos[selectedMemoIndex] = newMemo;
    setMemos(newMemos);
    /**
     * 불변성이란?
     * - 객체나 배열을 변경할 때 원본을 직접 수정하지 않고, 새로운 객체나 배열을 생성하여 수정하는 것
     */
  };
  const addMemo = () => {
    const now = new Date().getTime();
    const newMemo = {
      id: memos.length + 1,
      title: '',
      content: '',
      createdAt: now,
      updateAt: now,
    };
    setMemos([...memos, newMemo]);
    setSelectedMemoIndex(memos.length);
  };

  const deleteMemo = (index) => {
    const newMemos = [...memos];
    newMemos.splice(index, 1);
    setMemos(newMemos);
    setSelectedMemoIndex(0);
  };
  return (
    <div className="App">
      <SideBar
        memos={memos}
        addMemo={addMemo}
        setSelectedMemoIndex={setSelectedMemoIndex}
        selectedMemoIndex={selectedMemoIndex}
        deleteMemo={deleteMemo}
      />
      <MemoContainer memo={memos[selectedMemoIndex]} setMemo={setMemo} />
    </div>
  );
}

export default App;
