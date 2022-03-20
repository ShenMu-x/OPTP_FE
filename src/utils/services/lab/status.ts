import _axios from "../axios";
import { ResType, ListRes } from "../type";
import { fmatDate, fmatTime } from '../../helper';
import { packError, packEmptyData, packPageRes } from "../pack";
import { packLab } from "./pack";
import { labType } from '@/type';