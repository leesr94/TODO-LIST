import React from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa"; 

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    padding: 0 10px;
    background-color: lightgray;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const IconButton = styled.button`
    display: inline-block;
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

function AppBar({ title, isBack, addBtn, btnTxt, setFun }) {
    const navigate = useNavigate();
    
    return (
        <Container>
            <Wrapper>
                {isBack && 
                    <IconButton onClick={() => navigate(-1)}>
                        <FaArrowLeft size={25} />
                    </IconButton>}
                <h1>{title}</h1>
            </Wrapper>
            <Wrapper>
                {addBtn}
                {setFun && <IconButton size={25} onClick={setFun}>{btnTxt}</IconButton>}
            </Wrapper>
        </Container>
    );
}

export default AppBar;