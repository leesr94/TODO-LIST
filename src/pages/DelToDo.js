import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";

import { toDoState } from "../state/toDoState";
import AppBar from "../components/AppBar";
import ListItem from "../components/ListItem";

import styled from "styled-components";
import { FaCheck } from "react-icons/fa";

const Ul = styled.ul`
    margin: 0;
    padding: 0;
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
    const onChangeCheckbox = (id) => {
        setSelectedIds((pre) => 
            pre.includes(id) ? pre.filter((selectIds) => selectIds !== id)
            : [...pre, id]
        );
    };

    const onClick = () => {
        if (selectIds.length === 0) {
            return alert("삭제할 할 일을 선택하세요.");
        }

        const delToDo = toDoList.filter((item) => !selectIds.includes(item.id));
        setToDoList(delToDo); // 선택된 항목 제거
        setSelectedIds([]);   // 선택된 값 초기화

        navigate("/");        // 삭제 후 메인으로 이동
    };

    return (
        <>
            <AppBar
                title={"삭제하기"}
                isBack={true}
                btnTxt={<FaCheck size={25} />}
                setFun={onClick}
            />

            <Ul>
                {sortToDoList.map((item) => (
                    <ListItem
                        key={item.id}
                        id={item.id}
                        toDo={item.toDo}
                        memo={item.memo}
                        crtnDt={item.crtnDt}
                        completed={item.completed}
                        checked={selectIds.includes(item.id)}
                        mode={"delete"}
                        onFunc={{chk: onChangeCheckbox,}}
                        etcEle={<IsDone completed={item.completed}>
                                    {item.completed ? "완료" : "미완료"}
                                </IsDone>}
                    />
                ))}
            </Ul>
        </>
    );
}

export default DelToDo;