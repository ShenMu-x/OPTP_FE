import { Settings } from "http2";

export type labInfoType = {
    labId: string,
    title: string,
    describe: string,
    isFinished: boolean,
    createAt: string,
    endAt: string,
    isBelongTo: string,
    reviews?: ''
}

export type labsType = Array<labInfoType>;