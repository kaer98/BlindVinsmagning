import { Request } from "express";

export interface UserDto {
    id: number;
    fullName: string;
    gender: Enumerator;
    birthday: Date;
    username: string;
    password: string;
}