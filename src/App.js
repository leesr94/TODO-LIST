import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppBar from './components/AppBar';
import ReadToDo from './pages/ReadToDo';
import AMToDo from './pages/AddModifyToDo';
import DelToDo from './pages/DelToDo';

import styled from "styled-components";

const Container = styled.div`
    width: 400px;
    height: calc(100vh - 4em);
    margin: 2em auto;
    background-color: white;
    border: 1px solid red;
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