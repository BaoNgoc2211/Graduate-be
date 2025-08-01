// import { Response } from "express";

// interface ResponseData {
// 	status: string;
// 	message: string;
// 	data?: any;
// }

// export const success = (res: Response, statusCode: number, message: string, data?: any) => {
// 	const response: ResponseData = {
// 		status: 'success',
// 		message,
// 		data
// 	};
// 	return res.status(statusCode).json(response);
// };

// export const error = (res: Response, statusCode: number, message: string, data?: any) => {
// 	const response: ResponseData = {
// 		status: 'error',
// 		message,
// 		data
// 	};
// 	return res.status(statusCode).json(response);
// };

// export const paginate = (res: Response, { message, data, page, limit, total }: ResponseData & { page: number; limit: number; total: number }) => {
// 	return res.status(200).json({
// 		success: true,
// 		message,
// 		data,
// 		pagination: {
// 			page,
// 			limit,
// 			total,
// 			totalPages: Math.ceil(total / limit)
// 		}
// 	});
// };
// export const returnRes = (res: Response, status: number, message: string, data?: Object) => {
// 	return res.status(status).json({
// 		message: message,
//         data: data
// 	});
// };
import { Response } from "express";

// Có thể sửa thành generic để dùng được mọi kiểu
interface ResponseData<T = unknown> {
	status: string;
	message: string;
	data?: T;
}

export const success = <T = unknown>(res: Response, statusCode: number, message: string, data?: T) => {
	const response: ResponseData<T> = {
		status: 'success',
		message,
		data
	};
	return res.status(statusCode).json(response);
};

export const error = <T = unknown>(res: Response, statusCode: number, message: string, data?: T) => {
	const response: ResponseData<T> = {
		status: 'error',
		message,
		data
	};
	return res.status(statusCode).json(response);
};

export const paginate = <T = unknown>(
	res: Response,
	{
		message,
		data,
		page,
		limit,
		total
	}: {
		message: string;
		data: T;
		page: number;
		limit: number;
		total: number;
	}
) => {
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

// Tránh dùng Object viết hoa
export const returnRes = <T = unknown>(res: Response, status: number, message: string, data?: T) => {
	return res.status(status).json({
		message,
		data
	});
};
