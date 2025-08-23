export type ErrorCode =
	| "BAD_REQUEST"
	| "UNAUTHORIZED"
	| "FORBIDDEN"
	| "NOT_FOUND"
	| "TOO_MANY_REQUESTS"
	| "INTERNAL_SERVER_ERROR"
	| "ALREADY_EXISTS";

interface ErrorCodeDetail {
	code: ErrorCode;
	message: string;
	httpStatus: number;
}
export type ERROR_CODE_TYPE = Record<string, ErrorCodeDetail>;

export const ERROR_CODE: ERROR_CODE_TYPE = {
	BAD_REQUEST: {
		code: "BAD_REQUEST",
		message: "Bad Request",
		httpStatus: 400,
	},
	UNAUTHORIZED: {
		code: "UNAUTHORIZED",
		message: "Unauthorized",
		httpStatus: 401,
	},
	FORBIDDEN: {
		code: "FORBIDDEN",
		message: "Forbidden",
		httpStatus: 403,
	},
	NOT_FOUND: {
		code: "NOT_FOUND",
		message: "Not Found",
		httpStatus: 404,
	},
	TOO_MANY_REQUESTS: {
		code: "TOO_MANY_REQUESTS",
		message: "Too Many Requests",
		httpStatus: 429,
	},
	INTERNAL_SERVER_ERROR: {
		code: "INTERNAL_SERVER_ERROR",
		message: "Internal Server Error",
		httpStatus: 500,
	},
	ALREADY_EXISTS: {
		code: "ALREADY_EXISTS",
		message: "already exists",
		httpStatus: 409,
	},
};
export type ApiStatus = "success" | "error";

export interface ApiResponse<T = null> {
	status: ApiStatus;
	data?: T;
	error?: {
		code: ErrorCode;
		message: string;
		httpStatus: number;
	};
}
export interface AuthPayload {
	id: string;
	email: string;
}

export interface Iuser {
	email: string;
	passowrd: string;
}

interface columnsType<T = any> {
	name: string;
	indexData: Extract<keyof T, string | number> | string;
	render?: (value?: any, rowIndex?: number, rowData?: T) => React.ReactNode;
}
export interface IDataTableProps {
	columns: columnsType[];
	sourceData: {
		[key: string | number]: string | number | [] | object;
	}[];
	isLoading: boolean;
}
// ------------------
//SIDEBAE TYPE
// ------------------
import type { QueryKey } from "@tanstack/react-query";
import { LucideIcon } from "lucide-react";

export interface TypePrefetchMenuItem {
	prefetchQueryKey?: QueryKey;
	prefetchFn?: () => Promise<{ data: unknown }>;
}
export interface TypeSubMenuItem extends TypePrefetchMenuItem {
	title: string;
	url: string;
}
export interface TypeItemsMenu extends TypePrefetchMenuItem {
	icon?: LucideIcon;
	title: string;
	url?: string;
	isActive?: boolean;
	items?: TypeSubMenuItem[] | null;
}

// --------------
// params
// --------------

export interface IQueryParams {
	search?: string;
	perPage?: string;
	page?: string;
	startDate?: string,
	endDate?: string
}
