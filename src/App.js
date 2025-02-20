import { useCallback, useState } from 'react';
import './App.css';
import MemoContainer from './components/MemoContainer';
import SideBar from './components/SideBar';
import { getItem, setItem } from './lib/storage';
import debounce from 'lodash/debounce';

const debouncedSetItem = debounce(setItem, 5000);
function App() {
  const [memos, setMemos] = useState(getItem('memos') || []);

  const [selectedMemoIndex, setSelectedMemoIndex] = useState(0);

  const setMemo = useCallback(
    (newMemo) => {
      // 불변성 훼손 코드
      // memos[selectedMemoIndex] = newMemo; // 원본 배열을 직접 수정하여 불변성이 깨짐
      // setMemos([...memos]);

      // 불변성 유지 코드(위 코드와 동일한 기능)
      // const newMemos = [...memos]; // 원본 배열을 복사하여 새로운 배열을 생성, 불변성이 유지됨
      // newMemos[selectedMemoIndex] = newMemo;
      // setMemos(newMemos);
      // debouncedSetItem('memos', newMemos);
      /**
       * 불변성이란?
       * - 객체나 배열을 변경할 때 원본을 직접 수정하지 않고, 새로운 객체나 배열을 생성하여 수정하는 것
       */

      setMemos((prevMemos) => {
        const newMemos = [...prevMemos];
        newMemos[selectedMemoIndex] = newMemo;
        debouncedSetItem('memos', newMemos);
        return newMemos;
      });
    },
    [selectedMemoIndex],
  );
  const addMemo = useCallback(() => {
    // const now = new Date().getTime();
    // const newMemos = [
    //   ...memos,
    //   {
    //     id: memos.length + 1,
    //     title: '',
    //     content: '',
    //     createdAt: now,
    //     updateAt: now,
    //   },
    // ];

    // setMemos(newMemos);
    // debouncedSetItem('memos', newMemos);

    setMemos((prevMemos) => {
      const now = new Date().getTime();
      const newMemos = [
        ...prevMemos,
        {
          id: prevMemos.length + 1,
          title: '',
          content: '',
          createdAt: now,
          updateAt: now,
        },
      ];
      debouncedSetItem('memos', newMemos);
      return newMemos;
    });
    setSelectedMemoIndex(memos.length);
  }, []);

  const deleteMemo = useCallback((index) => {
    // const newMemos = [...memos];
    // newMemos.splice(index, 1);
    // setMemos(newMemos);
    // debouncedSetItem('memos', newMemos);
    setMemos((prevMemos) => {
      const newMemos = [...prevMemos];
      newMemos.splice(index, 1);
      debouncedSetItem('memos', newMemos);
      return newMemos;
    });
    setSelectedMemoIndex(0);
    console.log(`render deleteMemo`);
  }, []);

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
