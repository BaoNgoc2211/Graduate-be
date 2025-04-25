import createErrors from 'http-errors';

const throwError = (status: number, message: string) => {
    throw createErrors(status,message);
}

export default throwError;