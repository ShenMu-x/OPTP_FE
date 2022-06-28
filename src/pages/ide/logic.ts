import { ref } from 'vue';
import { showFailWrap, useLabId, useQueryStudent, isStudent, isTeacher, useLoader } from '@/utils/helper';
import { getIDEUrlForStudent, getIDEUrlForTeacher } from '@/utils/services';
import { useHeartBeat } from './heartBeat';

export const useGetIDEAndCheckBeat = (refEl: any) => {
    const labId = useLabId();
    const studentId = useQueryStudent();
    const url = ref('');
    const { isLoading, showLoading, closeLoading } = useLoader(refEl, true);
    useHeartBeat({ labId, student: studentId ?? undefined });
    if (isStudent() && labId) {
        showLoading()
        getIDEUrlForStudent(labId)
            .then(res => {
                if (res.code === 0) url.value = res?.data?.url || '';
                else showFailWrap({ text: '系统异常，请稍后再试' })
                closeLoading()
            })
    } else if (isTeacher() && labId && studentId) {
        showLoading()
        getIDEUrlForTeacher({ labId, studentId })
            .then(res => {
                if (res.code === 0) url.value = res?.data?.url || '';
                else showFailWrap({ text: '系统异常，请稍后再试' })
                closeLoading()
            })
    }
    return {
        url,
        isLoading
    }
}
