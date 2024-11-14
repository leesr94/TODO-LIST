import React from "react";

import styled from "styled-components";

const Item = styled.li`
    list-style: none;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    padding: 10px;
    border-radius: 15px;
    border: 2px solid ${({ mode, isChecked }) => (mode === "delete" && isChecked ? "#e88e98" : "lightgray")};
    background-color: ${({ isCompleted }) => (isCompleted ? "#f7f7f7" : "#fff")};
    
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
                background: url(https://intranet.adef.co.kr/asset/images/ic_check.png) 
                    ${({ mode }) => (mode === "read" ? "#383838" : "#e88e98")}
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
                text-decoration: ${({ isCompleted }) => (isCompleted ? "line-through" : "none")};
                color: ${({ isCompleted }) => (isCompleted ? "gray" : "#212121")};
            }
        }

        div.todo-modify {
            padding: 3px 4px;
        }
    }

    div.todo-memo {
        width: 75%;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 10px 0 10px 35px;
        color: ${({ isCompleted }) => (isCompleted ? "gray" : "#383838")};
    }
    
    div.todo-date {
        margin: 0 0 0 35px;
        font-size: small;
        color: gray;
    }
`;

function ListItem({ item, etcEle, mode, checked, handleCompleted, handleChangeCheckbox }) {
    const format = new Date(item.crtnDt).toLocaleString('ko-KR', {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const handleOnChange = (id) => {
        if (mode === "read") handleCompleted(id);
        else handleChangeCheckbox(id);
    }

    return (
        <Item isCompleted={item.completed} mode={mode} isChecked={checked}>
            <div className="title-box">
                <div className="title-input">
                    <label className="checkbox-label">
                        <input 
                            type="checkbox" 
                            checked={mode === "read" ? item.completed : checked}
                            onChange={() => handleOnChange(item.id)}
                        />
                        <span className="checkbox-icon" />
                    </label>
                    <div className="todo-title">{item.toDo}</div>
                </div>
                <div className="todo-modify">{etcEle}</div>
            </div>
            <div className="todo-memo">{item.memo}</div>
            <div className="todo-date">{format}</div>
        </Item>
    );
}

export default ListItem;
