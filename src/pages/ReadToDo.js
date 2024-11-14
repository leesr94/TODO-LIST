import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useRecoilState } from "recoil";
import { v4 as uuid4 } from "uuid";
import { toDoState } from "../state/toDoState";
import AppBar from "../components/AppBar";
import ListItem from "../components/ListItem";

import styled from "styled-components";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

const Ul = styled.ul`
    margin: 0;
    padding: 20px;
    overflow-y: auto;
    height: calc(100vh - 100px - 40px);
`;

const BtnWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 10px;
`;

const IconButton = styled.button`
    display: inline-block;
    background-color: transparent;
    border: none;
    column-gap: 10px;
    cursor: pointer;
`;

const StyledLink = styled(Link)`
    background-color: transparent;
    border: none;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    font-size: small;
    color: ${({ isCompleted }) => (isCompleted ? "gray" : "#383838")};

    &:hover {
        color: lightgray;
    }
`;

function ReadToDo() {
    const [toDoList, setToDoList] = useRecoilState(toDoState);
    const [sortToDoList, setSortToDoList] = useState([]);   // 정렬된 toDoList
    const navigate = useNavigate();

    const handleGoToAdd = () => navigate("/add");
    const handleGoToDel = () => navigate("/del");

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

    // 완료상태 변경
    const handleCompleted = (id) => {
        const upToDo = sortToDoList.map(item => item.id === id ? {
            ...item,
            completed: !item.completed,
            crtnDt: new Date(),
        } : item);
        setToDoList(upToDo);
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

            <Ul>
                {sortToDoList.map((item) => (
                    <ListItem
                        key={uuid4()}
                        item={item}
                        checked={false}
                        mode="read"
                        handleCompleted={handleCompleted}
                        etcEle={<StyledLink to={`/modify/${item.id}`} isCompleted={item.completed}>
                                    수정
                                </StyledLink>}
                    />
                ))}
            </Ul>
        </>
    );
}

export default ReadToDo;