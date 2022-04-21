import { ROUTE_NAME } from "@/router/routeName";

export enum RoleEnum {
    Student = 0,
    Teacher = 1,
    Manager = 2
}

export const RoleList: RoleEnum[] = [
    RoleEnum.Student,
    RoleEnum.Teacher,
    RoleEnum.Manager
];

export const HomePageMap = {
    [RoleEnum.Student]: ROUTE_NAME.STUDENT_CENTER,
    [RoleEnum.Teacher]: ROUTE_NAME.TEACHER_CENTER,
    [RoleEnum.Manager]: ROUTE_NAME.MANAGE_PLATFORM,
}