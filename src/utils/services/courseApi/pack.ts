
import _axios from '../axios';
import { CourseType } from '@/type';
import { fmatDate, fmatTime } from '../../helper';

export const packCourse = (course: any): CourseType => {
    return {
        courseId: course.course_id,
        teacherId: course.teacher_id,
        teacherName: course.teacher_name,
        courseName: course.course_name,
        courseDes: course.course_des,
        picUrl: course.pic_url,
        secretKey: course.secret_key,
        isClose: course.is_close,
        language: course.language,
        createdAt: fmatTime(course.created_at),
        updatedAt: fmatTime(course.updated_at)
    }
}

export const packRecords = (list: Array<any>) => {
    return list.map?.(course => packCourse(course));
}

export const packScore = (item: any) => ({
    userId: item.user_id,
    email: item.email,
    num: item.num,
    realName: item.real_name,
    avatarUrl: item.avatar_url,
    gender: item.gender,
    major: item.major,
    organization: item.organization,
    avgScore: item.avg_score,
    shallCheckIn: item.shall_check_in,
    ackCheckIn: item.act_check_in,
})

export const packStud = (item: any) => ({
    userId: item.user_id,
    email: item.email,
    num: item.num,
    realName: item.real_name,
    avatarUrl: item.avatar_url,
    gender: item.gender,
    major: item.major,
    organization: item.organization
})