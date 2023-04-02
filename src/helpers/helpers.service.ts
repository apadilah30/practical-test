import { Injectable } from '@nestjs/common';

@Injectable()
export class HelpersService {
    // Status Message
    SUCCESS = "SUCCESS";
    INTERNAL_SERVER_ERROR = "INTERNAL SERVER ERROR";
    NOT_FOUND = "NOT FOUND";
    BAD_REQUEST = "BAD REQUEST";

    // Response Formatter
    async formatter(status: number, data: any, message: string) {
        return {
            statusCode: status,
            data: data,
            message: message
        };
    }
}
