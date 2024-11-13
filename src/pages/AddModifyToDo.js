import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";

import { nextIdState, toDoState } from "../state/toDoState";
import AppBar from "../components/AppBar";
import ListItem from "../components/ListItem";

import { FaCheck } from "react-icons/fa";

function AddAndModifyToDo() {
    const navigate = useNavigate();

    const { id } = useParams(); // 수정으로 접근 시 해당 데이터의 id
    const [toDoList, setToDoList] = useRecoilState(toDoState);  // 기존 toDoList
    const nextId = useRecoilValue(nextIdState); // toDo 최신 id

    const [newTodo, setNewTodo] = useState(""); // 새로운 toDo
    const [newMemo, setNewMemo] = useState(""); // 새로운 memo

    useEffect(() => {
        if (!!id) { // 수정의 경우
            // id에 해당하는 todo 조회
            const oldToDo = toDoList.find((item) => item.id === Number(id));
            if (oldToDo) {
                setNewTodo(oldToDo.toDo);
                setNewMemo(oldToDo.memo);
            }
        }
    }, [id, toDoList]);

    // 등록 (체크) 버튼 클릭
    const onClick = () => {
        if (newTodo === "") {
            return alert("할 일을 입력하세요.");
        }

        if (!!id) { // id가 있음 수정의 경우
            const upToDo = toDoList.map((item) => 
                item.id === Number(id) ? {
                    ...item,
                    toDo: newTodo,
                    memo: newMemo,
                    crtnDt: new Date(),
                } : item);
            setToDoList(upToDo);

        } else {    // 신규추가의 경우
            const newToDoList = {
                id: nextId,
                toDo: newTodo,
                memo: newMemo,
                crtnDt: new Date(),
                completed: false,
            };
            setToDoList([newToDoList, ...toDoList]);    // 기존 목록에 새로운 할 일 추가
        }

        // 입력값 초기화
        setNewTodo("");
        setNewMemo("");

        navigate("/");  // 저장 후 메인으로 이동
    }

    return (
        <>
            <AppBar
                title={!!id ? "수정하기" : "추가하기"}
                isBack={true}
                btnTxt={<FaCheck size={25} />}
                setFun={onClick}
            />

            <ListItem 
                key={Number(id)}
                id={Number(id)}
                toDo={newTodo}
                memo={newMemo}
                crtnDt={new Date()}
                completed={false}
                checked={false}
                mode={"edit"}
                onFunc={{
                    todo: (e) => setNewTodo(e.target.value), 
                    memo: (e) => setNewMemo(e.target.value), 
                }}
                etcEle={null}
            />
        </>
    );
}

export default AddAndModifyToDo;