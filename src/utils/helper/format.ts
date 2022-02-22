import dayjs from "dayjs";
export const fmatDate = (time: string) => {
    return dayjs(time).format('YYYY-MM-DD');
}