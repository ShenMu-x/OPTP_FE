import _axios from "../axios"
import { ResType } from "../type";
import { packError } from "../pack";

export const heartBeatForStudentIDE: (labId: number) => ResType<any> = (labId) => {
    return _axios({
        method: 'POST',
        url: '/web/ide/heartbeat',
        data: { labId },
    }).then(res => ({
        code: 0,
        data: {
        }
    })
    ).catch(packError)
}

export const heartBeatForTeacherIDE: (params: { labId: number, studentId: number }) => ResType<any> = (params) => {
    return _axios({
        method: 'POST',
        url: '/web/ide/heartbeat/teacher',
        data: {
            labId: params.labId,
            stuId: params.studentId
        },
    }).then(res => ({
        code: 0,
        data: {

        }
    })
    ).catch(packError)
}