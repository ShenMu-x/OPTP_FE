import { getLocalStorage, LocalVal } from "../storage"

export const isTeacher = () => {
    return getLocalStorage(LocalVal.Role) === '1';
}