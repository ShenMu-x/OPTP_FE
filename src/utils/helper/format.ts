import dayjs from "dayjs";
export const fmatDate = (time: string) => {
    return dayjs(time).format('YYYY-MM-DD');
}
export const fmatTime = (time: string) => {
    return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}

export const isBefore = (time: string) => {
    return dayjs().isBefore(dayjs(time))
}