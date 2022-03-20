import _axios from "../axios";
import { fmatTime } from '../../helper';

interface labRes {
    lab_id: number;
    id: number;
    course_id: number;
    course_name?: string;
    title: string;
    content: string;
    created_at: string;
    update_at: string;
    dead_line: string;
    score?: number;
    is_finish?: boolean;
    comment?: string;
    attachment_url: string;
    report_url?: string;
}

export const packLab = (lab: labRes) => ({
    labId: lab.lab_id || lab.id,
    courseId: lab.course_id,
    courseName: lab.course_name,
    title: lab.title,
    content: lab.content,
    createdAt: fmatTime(lab.created_at),
    updateAt: fmatTime(lab.update_at),
    deadLine: fmatTime(lab.dead_line),
    isFinish: lab.is_finish,
    comment: lab.comment,
    score: lab.score,
    attachmentUrl: lab.attachment_url,
    reportUrl: lab.report_url
})