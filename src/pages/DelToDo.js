import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { v4 as uuid4 } from "uuid";
import { toDoState } from "../state/toDoState";
import AppBar from "../components/AppBar";
import ListItem from "../components/ListItem";

import styled from "styled-components";

const Ul = styled.ul`
    margin: 0;
    padding: 20px;
    overflow-y: auto;
    height: calc(100vh - 100px - 40px - 130px);
`;

const IsDone = styled.span`
    color: ${({ completed }) => (completed ? "green" : "gray")};
    font-size: small;
`;

function DelToDo() {
    const [toDoList, setToDoList] = useRecoilState(toDoState);
    const [sortToDoList, setSortToDoList] = useState([]);   // 정렬된 toDoList
    const [selectIds, setSelectedIds] = useState([]);   // 선택된 id를 저장
    const navigate = useNavigate();

    // 정렬 (미완료-완료, 최신순)
    const sortToDo = (list) => {
        return list.sort((x, y) => {
        if (x.completed === y.completed) {
                return new Date(y.crtnDt) - new Date(x.crtnDt);
            } 
            return x.completed ? 1 : -1;
        });
    };

    // 목록 변경 시 재정렬
    useEffect(() => {
        setSortToDoList(sortToDo([...toDoList]));
    }, [toDoList]);

    // 선택된 데이터의 id 저장
    const handleChangeCheckbox = (id) => {
        setSelectedIds((prev) => 
            prev.includes(id) ? prev.filter((selectIds) => selectIds !== id)
            : [...prev, id]
        );
    };

    // 삭제 버튼
    const handleDelete = () => {
        if (selectIds.length === 0) {
            return alert("삭제할 할 일을 선택하세요.");
        }

        if (window.confirm("삭제하시겠습니까?")) {
            const delToDo = toDoList.filter((item) => !selectIds.includes(item.id));
            setToDoList(delToDo); // 선택된 항목 제거
    
            navigate("/");        // 삭제 후 메인으로 이동
        }
    };

    return (
        <>
            <AppBar
                title={"삭제하기"}
                isBack={true}
            />

            <Ul>
                {sortToDoList.map((item) => (
                    <ListItem
                        key={uuid4()}
                        item={item}
                        checked={selectIds.includes(item.id)}
                        mode="delete"
                        handleChangeCheckbox={handleChangeCheckbox}
                        etcEle={<IsDone completed={item.completed}>
                                    {item.completed ? "완료" : "미완료"}
                                </IsDone>}
                    />
                ))}
            </Ul>

            <button type="button" className="btn btn-del" onClick={handleDelete}>삭제</button>
        </>
    );
}

export default DelToDo;