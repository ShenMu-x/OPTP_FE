import { onMounted, onUnmounted } from 'vue';
import { isStudent, isTeacher } from '@/utils/helper';
import { heartBeatForStudentIDE, heartBeatForTeacherIDE } from '@/utils/services';

const BEAT_STEP = 30 * 1000;

export const useHeartBeat = (params: { labId: number, student?: number }) => {
    let interval: NodeJS.Timer | null = null;
    const startBeat = () => {
        if (!interval) {
            interval = setInterval(() => {
                isStudent() && params.labId && heartBeatForStudentIDE(params.labId);
                isTeacher() && params.labId && params.student && heartBeatForTeacherIDE({ labId: params.labId, studentId: params.student })
            }, BEAT_STEP)
        }
    }
    const stopBeat = () => {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }
    const checkPageVisibility = () => {
        let isHidden = document.hidden;
        if (isHidden) stopBeat();
        else startBeat();
    }
    const startListenVisibility = () => {
        document.addEventListener('visibilitychange', checkPageVisibility);
    }
    const stopListenVisibility = () => {
        document.removeEventListener('visibilitychange', checkPageVisibility)
    }

    onMounted(() => {
        startBeat();
        startListenVisibility();
    });
    onUnmounted(() => {
        stopBeat();
        stopListenVisibility();
    })

}