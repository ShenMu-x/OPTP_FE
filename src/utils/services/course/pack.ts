// 存放公共pack
import _axios from '../axios';
import { CourseType } from '@/type';
import { fmatTime } from '../../helper';

export const packCourse = (course: any): CourseType => {
    return {
        courseId: course.course_id,
        teacherId: course.teacher_id,
        teacherName: course.teacher_name,
        teacherAvatar: course.teacher_avatar,
        teacherEmail: course.teacher_email,
        courseName: course.course_name,
        courseDes: course.course_des,
        picUrl: course.pic_url,
        secretKey: course.secret_key,
        needAudit: course.need_audit,
        isClose: course.is_close,
        isEnroll: course.is_enroll,
        language: course.language,
        createdAt: fmatTime(course.created_at),
        updatedAt: fmatTime(course.updated_at)
    }
}