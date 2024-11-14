import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";

import { nextIdState, toDoState } from "../state/toDoState";
import AppBar from "../components/AppBar";

import styled from "styled-components";

const AddModify = styled.div`
    width: 100%;
    margin: 0;
    padding: 20px;
    overflow-y: auto;
    height: calc(100vh - 100px - 40px - 130px);

    div {
        margin: 4em 10px;

        h2 {
            font-size: 1.35em;
            font-weight: 500;
        }

        input[type='text'] {
            width: 100%;
            height: 50px;
            padding: 9px;
        }

        textarea {
            width: 100%;
            height: 200px;
            padding: 9px;
            resize: none;
        }
    }
`;

function AddAndModifyToDo() {
    const navigate = useNavigate();

    const { id } = useParams(); // 수정으로 접근 시 해당 데이터의 id
    const [toDoList, setToDoList] = useRecoilState(toDoState);  // 기존 toDoList

    const [newTodo, setNewTodo] = useState({toDo: "", memo: ""}); // 새로운 toDo
    const nextId = useRecoilValue(nextIdState); // toDo 최신 id

    useEffect(() => {
        if (!!id) { // id가 있는 경우 해당 todo 조회
            const oldToDo = toDoList.find((item) => item.id === Number(id));
            if (oldToDo) {
                setNewTodo({
                    toDo: oldToDo.toDo,
                    memo: oldToDo.memo,
                });
            }
        }
    }, [id, toDoList]);

    // 등록 (체크) 버튼 클릭
    const handleSave = () => {
        if (newTodo.toDo === "") {
            return alert("할 일을 입력하세요.");
        }

        if (!!id) { // id가 있음 수정의 경우
            const upToDo = toDoList.map((item) => 
                item.id === Number(id) ? {
                    ...item,
                    toDo: newTodo.toDo,
                    memo: newTodo.memo,
                    crtnDt: new Date(),
                } : item);
            setToDoList(upToDo);

        } else {    // 신규추가의 경우
            const newToDoList = {
                id: nextId,
                toDo: newTodo.toDo,
                memo: newTodo.memo,
                crtnDt: new Date(),
                completed: false,
            };
            setToDoList([newToDoList, ...toDoList]);    // 기존 목록에 새로운 할 일 추가
        }

        navigate("/");  // 저장 후 메인으로 이동
    }

    return (
        <>
            <AppBar
                title={!!id ? "수정하기" : "추가하기"}
                isBack={true}
            />

            <AddModify>
                <div className="edit-todo-title">
                    <h2>할 일</h2>
                    <input 
                        type="text" 
                        placeholder="할 일을 입력해주세요." 
                        value={newTodo.toDo}
                        onChange={(e) => setNewTodo({...newTodo, toDo: e.target.value})}
                        />
                </div>

                <div className="edit-todo-memo">
                    <h2>메모</h2>
                    <textarea
                        placeholder="메모를 입력해주세요." 
                        value={newTodo.memo}
                        onChange={(e) => setNewTodo({...newTodo, memo: e.target.value})}
                    ></textarea>
                </div>
            </AddModify>

            <button type="button" className="btn btn-save" onClick={handleSave}>저장</button>
        </>
    );
}

export default AddAndModifyToDo;