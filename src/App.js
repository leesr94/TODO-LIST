import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReadToDo from './pages/ReadToDo';
import AMToDo from './pages/AddModifyToDo';
import DelToDo from './pages/DelToDo';

import styled from "styled-components";

const Container = styled.div`
    width: 400px;
    height: calc(100vh - 40px);
    margin: 20px auto;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 0 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    overflow: hidden;
`;

function App() {
    return (
        <Container>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<ReadToDo />}></Route>
                    <Route path='/add' element={<AMToDo />}></Route>
                    <Route path='/modify/:id' element={<AMToDo />}></Route>
                    <Route path='/del' element={<DelToDo />}></Route>
                </Routes>
            </BrowserRouter>
        </Container>
    );
}

export default App;