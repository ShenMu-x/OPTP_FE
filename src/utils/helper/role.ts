import { getRoleInConfig } from "../storage";
import { RoleEnum } from "../option";

export const isStudent = () => getRoleInConfig() === RoleEnum.Student;
export const isTeacher = () => getRoleInConfig() === RoleEnum.Teacher;
export const isManager = () => getRoleInConfig() === RoleEnum.Manager;
export const isRoleDefined = () => isStudent() || isTeacher() || isManager()

export const isAllowedRole = (allowList: RoleEnum[]) => {
    return isRoleDefined() &&
        allowList.map(item => `${item}`).includes(`${getRoleInConfig()}`);
}

