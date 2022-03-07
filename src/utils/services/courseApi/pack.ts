// 存放公共pack
import _axios from '../axios';
import { CourseType } from '@/type';
import { fmatTime } from '../../helper';

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
        isEnroll: course.is_enroll,
        language: course.language,
        createdAt: fmatTime(course.created_at),
        updatedAt: fmatTime(course.updated_at)
    }
}