
// Define a new interface to represent the user object
export interface User {
    id: number;
    fullname: string;
    gender: string;
    birthday: string;
    username: string;
    password: string;
    // Add any other properties you need
}

// Declare module augmentation to add the user property to the Request interface
declare module 'express-serve-static-core' {
    interface Request {
        user?: User; // Add the user property to the Request interface
    }
}