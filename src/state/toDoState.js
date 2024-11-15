import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist ({
    key: "localStorage", 
    storage: localStorage,
});

export const toDoState = atom({
    key: "toDoState",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const nextIdState = selector({
    key: "nextIdState",
    get: ({ get }) => {
        const toDoList = get(toDoState);
        const maxId = toDoList.length > 0 ? Math.max(...toDoList.map(item => item.id)) : 0;
        return maxId + 1;
    }
});