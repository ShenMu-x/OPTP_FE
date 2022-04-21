import { getLocalStorage, LocalVal } from "../storage"
import { RoleEnum } from "../option";

export const isStudent = () => {
    return getLocalStorage(LocalVal.Role) === `${RoleEnum.Student}`;
}
export const isTeacher = () => {
    return getLocalStorage(LocalVal.Role) === `${RoleEnum.Teacher}`;
}
export const isManager = () => {
    return getLocalStorage(LocalVal.Role) === `${RoleEnum.Manager}`;
}
export const isAllowedRole = (allowList: RoleEnum[]) => {
    return allowList.map(item => `${item}`).includes(getLocalStorage(LocalVal.Role) || '');
}