import type { NextFunction, Request, Response } from 'express';

// logger middleware
const requestLogger = async (request : Request, response : Response, next : NextFunction) => {
    const requestTime = new Date(Date.now()).toString();
    console.log(`[${request.method}] ${request.ip} ${request.path} - ${requestTime}`)
    next();
};

export default requestLogger;