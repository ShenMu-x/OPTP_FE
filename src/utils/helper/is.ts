import { getRole } from "../storage"

export const isTeacher = () => {
    return getRole() === 1;
}