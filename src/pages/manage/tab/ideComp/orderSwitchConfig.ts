import { ideOrderEnum } from '@/utils/services';
export const defaultOrder = ideOrderEnum.CreatedAt;
export const orderOptions = [
    {
        value: ideOrderEnum.CreatedAt,
        label: '创建时间',
    },
    {
        value: ideOrderEnum.CpuPerc,
        label: 'CPU占用',
    },
    {
        value: ideOrderEnum.MemoryUsage,
        label: '内存占用',
    },
    {
        value: ideOrderEnum.Size,
        label: '磁盘空间占用',
    }
];
export const reverseOptions = [
    {
        value: false,
        label: '升序',
    },
    {
        value: true,
        label: '降序',
    }
];