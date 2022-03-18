import _axios from "../services/axios";
const baseURL = _axios.defaults.baseURL;

export const UPLOAD_PIC_URL =  `${baseURL}/web/upload/pic`;
export const UPLOAD_PDF_URL = `${baseURL}/web/upload/pdf`;
export const UPLOAD_ATTACHMENT_URL = `${baseURL}/web/upload/attachments`;