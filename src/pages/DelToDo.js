import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { v4 as uuid4 } from "uuid";
import { toDoState } from "../state/toDoState";
import AppBar from "../components/AppBar";
import ListItem from "../components/ListItem";

import styled from "styled-components";
import Filtering from "../components/Filtering";



const IsDone = styled.span`
    color: ${({ $isCompleted }) => ($isCompleted ? "green" : "gray")};
    font-size: small;
`;



function DelToDo() {
    const navigate = useNavigate();

    const [toDoList, setToDoList] = useRecoilState(toDoState);  // 기존 toDoList
    const [sortToDoList, setSortToDoList] = useState([]);   // 정렬된 toDoList

    const [selectedIds, setSelectedIds] = useState([]);     // 선택된 idList

    // 정렬 (미완료-완료, 최신순)
    const handleSortToDoList = (list) => {
        return list.sort((a, b) => a.completed - b.completed || new Date(b.upDt) - new Date(a.upDt));
    };

    
    useEffect(() => {
        setSortToDoList(handleSortToDoList([...toDoList]));
    }, [toDoList]);

    // id 저장 (단일 선택)
    const handleChangeCheckbox = (id) => {
        setSelectedIds((prev) => 
            prev.includes(id) ? prev.filter((selectedIds) => selectedIds !== id) : [...prev, id]
        );
    };

    // id 저장 (전체 선택)
    const handleChangeAllCheckbox = (selectedCheck) => {
        const allIds = [];
        if (selectedCheck) sortToDoList.forEach((item) => allIds.push(item.id));
        setSelectedIds(allIds);
    }

    // 삭제 버튼
    const handleDelete = () => {
        if (selectedIds.length === 0) {
            return alert("삭제할 할 일을 선택하세요.");
        }

        if (window.confirm("삭제하시겠습니까?")) {
            const delToDo = toDoList.filter((item) => !selectedIds.includes(item.id));
            setToDoList(delToDo); // 선택된 항목 제거
    
            navigate("/");        // 삭제 후 메인으로 이동
        }
    };

    // 필터링
    const handleFilter = (selectedValue) => {
        setSelectedIds([]);         // 필터링 변경 시 선택된 id 배열 초기화

        const filterList = toDoList.filter(
            selectedValue === "active" ? (item) => !item.completed : 
                selectedValue === "completed" ? (item) => item.completed : 
                    () => true
        );

        handleSortToDoList(filterList);
        setSortToDoList(filterList); // 필터링 된 값만 재정렬 후 출력
    }

    return (
        <>
            <AppBar
                title={"삭제하기"}
                isBack={true}
            />

            <ul className="todo-list todo-list-add-btn">
                <Filtering 
                    mode="delete" 
                    handleFilter={handleFilter}
                    isAllChecked={sortToDoList.length !== 0 && sortToDoList.length === selectedIds.length}
                    handleAllCheckbox={handleChangeAllCheckbox}
                />

                {sortToDoList.length === 0 ? 
                    <div className="div-list-no-date">목록이 없습니다🫥</div> :
                    sortToDoList.map((item) => (
                        <ListItem
                            key={uuid4()}
                            item={item}
                            checked={selectedIds.includes(item.id)}
                            mode="delete"
                            handleCheckbox={handleChangeCheckbox}
                            etcEle={<IsDone $isCompleted={item.completed}>
                                        {item.completed ? "완료" : "미완료"}
                                    </IsDone>}
                        />
                ))}
            </ul>

            <button 
                type="button" 
                className="btn btn-del" 
                onClick={handleDelete}
                disabled={sortToDoList.length === 0}> {/* 목록이 없는 경우 삭제버튼 비활성화 */}
                삭제
            </button>
        </>
    );
}

export default DelToDo;