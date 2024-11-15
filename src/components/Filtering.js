import { useState } from 'react';

import styled from "styled-components";



const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${({mode}) => (mode === "delete" ? "space-between" : "end")};

    div.div-select {
        select {
            width: 100%;
            border: none;
            outline: none;
            padding-left: 2px;
        }
    }
    
    div.checkbox-all {
        position: absolute;
        left: 5%;
        
        .checkbox-icon-all::before {
            width: 15px;
            height: 15px;
            border: 1px solid #9da3a5;
        }

        .checkbox-label-all input:checked + .checkbox-icon-all::before {
            background: url(https://intranet.adef.co.kr/asset/images/ic_check.png) 
                #383838 no-repeat center;
        }
    }
`;



function Filtering({ mode, handleFilter, isAllChecked, handleAllCheckbox }) {
    const selectList = [ 
        {value: "all", text: "전체"}, 
        {value: "active", text: "미완료"}, 
        {value: "completed", text: "완료"}, 
    ];    // 필터 목록
    const [selected, setSeleted] = useState("all");

    // 필터링할 값을 부모 컴포넌트로 전달
    const handleSetFilter = (e) => {
        const selectValue = e.target.value;
        setSeleted(selectValue);
        handleFilter(selectValue);
    }

    // 전체 체크
    const handleSetAllCheckbox = (e) => {
        handleAllCheckbox(e.target.checked);
    }

    return (
        <Wrapper>
            {
                mode === "delete" && 
                <div className="checkbox-all">
                    <label className="checkbox-label checkbox-label-all" htmlFor="allChk">
                        <input
                            type="checkbox"
                            id="allChk"
                            checked={isAllChecked}
                            onChange={handleSetAllCheckbox}
                        />
                        <span className="checkbox-icon checkbox-icon-all" />
                        전체선택
                    </label>
                </div>
            }
            <div className="div-select">
                <select onChange={handleSetFilter} value={selected}>
                    {selectList.map((item) => (
                        <option value={item.value} key={item.value}>
                            {item.text}
                        </option>
                    ))}
                </select>
            </div>
        </Wrapper>
    );
}

export default Filtering;