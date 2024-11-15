import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";

import { nextIdState, toDoState } from "../state/toDoState";
import AppBar from "../components/AppBar";

import styled, { css } from "styled-components";



const AddModify = styled.div`
    width: 100%;

    div {
        margin: 4em 10px;

        h2 {
            font-size: 1.35em;
            font-weight: 500;
        }
    }
`;

const Inputs = css`
    width: 100%;
    padding: 9px;
    border: 2px solid gray;
    border-radius: 15px;
    font-size: 15px;
`;

const InputToDo = styled.input`
    ${Inputs}
`;

const InputMemo = styled.textarea`
    ${Inputs}
    height: 200px;
    resize: none;
`;



function AddAndModifyToDo() {
    const navigate = useNavigate();

    const { id } = useParams(); // 수정으로 접근 시 해당 데이터의 id
    const [toDoList, setToDoList] = useRecoilState(toDoState);  // 기존 toDoList

    const [newToDo, setNewToDo] = useState({toDo: "", memo: ""}); // 새로운 toDo
    const nextId = useRecoilValue(nextIdState); // toDo 최신 id

    useEffect(() => {
        if (!!id) { // id가 있는 경우 해당 todo 조회
            const oldToDo = toDoList.find((item) => item.id === Number(id));
            if (oldToDo) {
                setNewToDo({
                    toDo: oldToDo.toDo,
                    memo: oldToDo.memo,
                });
            }
        }
    }, [id, toDoList]);

    // 등록 (체크) 버튼 클릭
    const handleSave = () => {
        const todoTitle = newToDo.toDo.trim();  // 공백문자 제거

        if (todoTitle === "") {
            return alert("할 일을 입력하세요.");
        }

        if (!!id) { // id가 있음 수정의 경우
            const upToDo = toDoList.map((item) => 
                item.id === Number(id) ? {
                    ...item,
                    toDo: todoTitle,
                    memo: newToDo.memo,
                    upDt: new Date(),
                } : item);
            setToDoList(upToDo);

        } else {    // 신규추가의 경우
            const newToDoList = {
                id: nextId,
                toDo: todoTitle,
                memo: newToDo.memo,
                crtnDt: new Date(),
                upDt: new Date(),
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

            <AddModify className="todo-list todo-list-add-btn">
                <div className="edit-todo-title">
                    <h2>할 일</h2>
                    <InputToDo 
                        type="text" 
                        placeholder="할 일을 입력해주세요." 
                        value={newToDo.toDo}
                        onChange={(e) => setNewToDo({...newToDo, toDo: e.target.value})}
                        />
                </div>

                <div className="edit-todo-memo">
                    <h2>메모</h2>
                    <InputMemo
                        placeholder="메모를 입력해주세요." 
                        value={newToDo.memo}
                        onChange={(e) => setNewToDo({...newToDo, memo: e.target.value})}
                    ></InputMemo>
                </div>
            </AddModify>

            <button type="button" className="btn btn-save" onClick={handleSave}>저장</button>
        </>
    );
}

export default AddAndModifyToDo;