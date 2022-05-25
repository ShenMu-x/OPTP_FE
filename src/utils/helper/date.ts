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

export const fmatTimeFitServer = (time: string) => {
    // YYYY-MM-DD HH:mm:ss => YYYY-MM-DDTHH:mm:ss.000Z
    return `${time?.split(" ")?.join('T')}.000Z`
}

export const isAfterCurrentTime = (time: string) => {
    return dayjs(time).isAfter(dayjs())
}

export const getCurrentTime = () => {
    return dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
}