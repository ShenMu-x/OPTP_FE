export const packCodingTime: (codingTimeList: any[]) => any[] = (codingTimeList) => {
    return codingTimeList.map((item: { date: string, time: number }) => [item.date, item.time]) ?? []
}