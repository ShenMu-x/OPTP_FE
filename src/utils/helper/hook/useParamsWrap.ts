import { ParamsEnum, useParams } from './useParam';

export const useCourseId = () => parseInt(useParams(ParamsEnum.CourseId));
export const useLabId = () => parseInt(useParams(ParamsEnum.LabId));
export const useIdeUrl = () => useParams(ParamsEnum.IdeUrl) || '';
export const useIsLabFinish = () => useParams(ParamsEnum.isLabFinish);