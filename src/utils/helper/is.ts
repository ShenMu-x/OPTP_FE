import { getLocalStorage, LocalVal } from "../storage"
import { TeacherRole, ManagerRole, StudentRole } from "../option";

export const isStudent = () => {
    return getLocalStorage(LocalVal.Role) === `${StudentRole}`;
}
export const isTeacher = () => {
    return getLocalStorage(LocalVal.Role) === `${TeacherRole}`;
}
export const isManager = () => {
    return getLocalStorage(LocalVal.Role) === `${ManagerRole}`;
}