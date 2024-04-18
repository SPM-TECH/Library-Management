import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    async login(loginDto: LoginDto) {
        const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
        if (
            loginDto.username === ADMIN_USERNAME &&
            loginDto.password === ADMIN_PASSWORD
        ) {
            return {
                access_token: 'access_token',
            };
        }
    }
}
