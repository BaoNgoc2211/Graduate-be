import { Response } from "express";

interface ResponseData {
	status: string;
	message: string;
	data?: any;
}

export const success = (res: Response, statusCode: number, message: string, data?: any) => {
	const response: ResponseData = {
		status: 'success',
		message,
		data
	};
	return res.status(statusCode).json(response);
};

export const error = (res: Response, statusCode: number, message: string, data?: any) => {
	const response: ResponseData = {
		status: 'error',
		message,
		data
	};
	return res.status(statusCode).json(response);
};

export const paginate = (res: Response, { message, data, page, limit, total }: ResponseData & { page: number; limit: number; total: number }) => {
	return res.status(200).json({
		success: true,
		message,
		data,
		pagination: {
			page,
			limit,
			total,
			totalPages: Math.ceil(total / limit)
		}
	});
};
export const returnRes = (res: Response, status: number, message: string, data?: Object) => {
	return res.status(status).json({
		message: message,
        data: data
	});
};