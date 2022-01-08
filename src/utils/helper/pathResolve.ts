import { resolve } from 'path';

/**
 * @description 转化绝对路径
 * @param dir 
 * @returns 
 */
function pathResolve(dir:string){
    return resolve(__dirname, dir);
}

export default pathResolve;