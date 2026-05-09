import { Response } from "express";
export declare const sendSuccess: <T>(res: Response, data: T, statusCode?: number, message?: string) => void;
export declare const sendError: (res: Response, statusCode?: number, message?: string, details?: Record<string, unknown>) => void;
export declare const errorHandler: (err: any, req: any, res: Response, next: any) => void;
//# sourceMappingURL=response.d.ts.map