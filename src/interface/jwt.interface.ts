import {Response} from 'express';

export interface IJwt {
    generateJwt(res:Response,userId:string): string,
    clearJwt(res:Response): void
}