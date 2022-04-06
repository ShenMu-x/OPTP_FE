export enum genderList {
    '男' = 0,
    '女' = 1,
    '未知' = 2
}

export const getGender = (gender: number) => {
    return genderList[gender];
}