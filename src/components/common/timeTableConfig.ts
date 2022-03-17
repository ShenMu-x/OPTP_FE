const getConfig = (listData: any) => {
    const option = {
        tooltip: {},
        visualMap: {
            min: 0,
            max: 360,
            type: 'piecewise',
            orient: 'horizontal',
            left: 'center',
            top: 0,
            inRange: {
                color: ['#8bb9d0', '#002d54']
            },
        },
        calendar: {
            top: 60,
            left: 30,
            right: 30,
            cellSize: ['auto', 13],
            range: '2022',
            itemStyle: {
                borderWidth: 0.5
            },
            yearLabel: { show: false },
            monthLabel: {
                nameMap: 'ZH',
            },
            dayLabel: {
                firstDay: 1,
                nameMap: 'ZH',
            },
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: listData
        }
    };
    return option;
}


export default getConfig;