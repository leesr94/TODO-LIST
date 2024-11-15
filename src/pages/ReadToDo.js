import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useRecoilState } from "recoil";
import { v4 as uuid4 } from "uuid";
import { toDoState } from "../state/toDoState";

import AppBar from "../components/AppBar";
import ListItem from "../components/ListItem";
import Filtering from "../components/Filtering";

import styled from "styled-components";
import { FaPlus, FaTrashAlt } from "react-icons/fa";



const BtnWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const IconButton = styled.button`
    display: inline-block;
    background-color: transparent;
    border: none;
    column-gap: 10px;
    margin-right: 5px;
    cursor: pointer;
`;

const StyledLink = styled(Link)`
    background-color: transparent;
    border: none;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    font-size: small;
    color: ${({ $isCompleted }) => ($isCompleted ? "gray" : "#383838")};

    &:hover {
        color: lightgray;
    }
`;



function ReadToDo() {
    const navigate = useNavigate();

    const [toDoList, setToDoList] = useRecoilState(toDoState);  // 기존 toDoList
    const [sortToDoList, setSortToDoList] = useState([]);   // 정렬된 toDoList

    const handleGoToAdd = () => navigate("/add");
    const handleGoToDel = () => navigate("/del");

    // 정렬 (미완료-완료, 최신순)
    const handleSortToDoList = (list) => {
        return list.sort((a, b) => a.completed - b.completed || new Date(b.upDt) - new Date(a.upDt));
    };

    // 목록 변경 시 재정렬
    useEffect(() => {
        setSortToDoList(handleSortToDoList([...toDoList]));
    }, [toDoList]);

    // 완료상태 변경
    const handleCompleted = (id) => {
        const upToDo = sortToDoList.map(item => item.id === id ? {
            ...item,
            completed: !item.completed,
            upDt: new Date(),
        } : item);
        setToDoList(upToDo);
    }

    // 필터링
    const handleFilter = (selectedValue) => {
        let filterList = toDoList.filter(
            selectedValue === "active" ? (item) => !item.completed : 
                selectedValue === "completed" ? (item) => item.completed : 
                    () => true
        );
        
        setSortToDoList(filterList);    // 필터링 된 값만 출력
    }

    return (
        <>
            <AppBar
                title={"HOME"}
                isBack={false}
                addBtn={
                    <BtnWrapper>
                        <IconButton onClick={handleGoToAdd}><FaPlus size={25} /></IconButton>
                        <IconButton onClick={handleGoToDel}><FaTrashAlt size={25} /></IconButton>
                    </BtnWrapper>
                }
            />

            <ul className="todo-list">
                <Filtering 
                    mode="read" 
                    handleFilter={handleFilter}
                />

                {sortToDoList.length === 0 ? 
                    <div className="div-list-no-date">목록이 없습니다🫥</div> :
                    sortToDoList.map((item) => (
                        <ListItem
                            key={uuid4()}
                            item={item}
                            checked={false}
                            mode="read"
                            handleCompleted={handleCompleted}
                            etcEle={<StyledLink to={`/modify/${item.id}`} $isCompleted={item.completed}>
                                        수정
                                    </StyledLink>}
                        />
                    ))}
            </ul>
        </>
    );
}

export default ReadToDo;