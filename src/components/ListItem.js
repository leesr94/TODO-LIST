import React from "react";

import styled from "styled-components";

const Item = styled.li`
    list-style: none;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    padding: 10px;
    border-radius: 15px;
    border: 1px solid lightgray;
    
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0;
    }

    div.title-box {
        justify-content: space-between;
        width: 100%;
        
        div.title-input {
            width: 85%;

            input[type='checkbox'] {
                display: none;
            }

            .checkbox-label {
                display: flex;
                align-items: center;
            }

            .checkbox-icon::before{
                content:'';
                display: flex;
                align-items: center;
                margin-right: 9px;
                width: 24px;
                height: 24px;
                background-color: transparent;
                border: 1px solid #9da3a5;
                border-radius: 100%;
                box-sizing:border-box;
                position: relative;
                cursor: pointer;
            }
            .checkbox-label input:checked + .checkbox-icon::before{
                background: url(https://intranet.adef.co.kr/asset/images/ic_check.png) #000000
                    no-repeat center;
                border:none;
            }

            .todo-title {
                width: 100%;
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 1.35em;
                font-weight: 500;
                text-decoration: ${({ completed }) => (completed && "line-through")};
                color: ${({ completed }) => (completed && "gray")};
            }
        }

        div.todo-modify {
            padding: 3px 4px;
        }
    }

    div.todo-memo {
        margin: 10px 0 10px 35px;
    }
    
    div.todo-date {
        margin: 0 0 0 35px;
        font-size: small;
        color: gray;
    }
`;

const AddModify = styled.div`
    width: 100%;
    margin: 0;

    div {
        margin: 10px;

        h2 {
            font-size: 1.35em;
            font-weight: 500;
        }

        input[type='text'] {
            width: 100%;
            height: 50px;
            padding: 0 9px;
        }
    }

    div:nth-child(1) {
        margin-bottom: 50px;
    }
`;

function ListItem({ id, toDo, memo, crtnDt, completed, onFunc, etcEle, mode, checked }) {
    const format = new Date(crtnDt).toLocaleString('ko-KR', {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    return (
        <>
            {mode !== "edit" && (
                <Item key={id} completed={completed}>
                    <div className="title-box">
                        <div className="title-input">
                            <label className="checkbox-label">
                                <input 
                                    type="checkbox" 
                                    checked={mode === "read" ? completed : checked}
                                    onChange={mode === "read" ? () => onFunc.comp(id) : () => onFunc.chk(id)}
                                />
                                <span className="checkbox-icon" />
                            </label>
                            <div className="todo-title">{toDo}</div>
                        </div>
                        <div className="todo-modify">{etcEle}</div>
                    </div>
                    <div className="todo-memo">{memo}</div>
                    <div className="todo-date">{format}</div>
                </Item>
            )}

            {mode === "edit" && (
                <AddModify>
                    <div className="edit-todo-title">
                        <h2>할 일</h2>
                        <input 
                            type="text" 
                            placeholder="할 일을 입력해주세요." 
                            value={toDo}
                            onChange={onFunc.todo}
                            />
                    </div>

                    <div className="edit-todo-memo">
                        <h2>메모</h2>
                        <input 
                            type="text" 
                            placeholder="메모를 입력해주세요." 
                            value={memo}
                            onChange={onFunc.memo}
                        />
                    </div>
                </AddModify>
            )}
        </>
    );
}

export default ListItem;
