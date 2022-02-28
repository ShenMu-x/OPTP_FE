import _axios from '../axios';
import { ResType } from '../type';

export const getScoreExport: (courseId: number) => ResType<any> = (courseId) => {
    return _axios({
        method: 'GET',
        url: `/web/course/score/export/${courseId}`
    }).then(res => {
        console.log('scoreFile', res.data);
        return { code: 0 }
    }).catch(err => {
        return { code: -1 }
    })
}