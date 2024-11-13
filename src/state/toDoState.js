import { atom, selector } from "recoil";

export const toDoState = atom({
    key: "toDoState",
    default: [
        { 
            id: 1, 
            toDo: "할 일", 
            memo: "테스트", 
            crtnDt: new Date(), 
            completed: true,
        },
        { 
            id: 2, 
            toDo: "할 일2", 
            memo: "테스트2", 
            crtnDt: new Date(), 
            completed: false,
        },
    ],
});

export const nextIdState = selector({
    key: "nextIdState",
    get: ({ get }) => {
        const toDoList = get(toDoState);
        const maxId = toDoList.length > 0 ? Math.max(...toDoList.map(item => item.id)) : 0;
        return maxId + 1;
    }
});