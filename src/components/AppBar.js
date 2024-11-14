import React from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa"; 

const Container = styled.div`
    position: sticky;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${({isBack}) => (isBack ? "start" : "end")};
    height: 100px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    z-index: 99;

    h1 {
        text-align: center;
        position: absolute;
        width: max-content;
        right: 50%;
        left: 50%;
        margin-left: -50px;
        margin-right: -50px;
    }
`;

const IconButton = styled.button`
    display: inline-block;
    background-color: transparent;
    border: none;
    cursor: pointer;
    z-index: 99;
`;

function AppBar({ title, isBack, addBtn }) {
    const navigate = useNavigate();
    
    return (
        <Container isBack={isBack}>
            {isBack && 
                <IconButton onClick={() => navigate(-1)}>
                    <FaArrowLeft size={25} />
                </IconButton>}
            <h1>{title}</h1>
            {addBtn}
        </Container>
    );
}

export default AppBar;