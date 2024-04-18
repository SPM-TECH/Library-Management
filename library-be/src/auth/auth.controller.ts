import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }
    @Post("login")
    async login(
        @Body() body: LoginDto
    ) {
        try {
            const res = await this.authService.login(body)

            return {
                access_token: res.access_token,
                status: 200
            }
        } catch (error) {

            return {
                access_token: null,
                status: 400
            }
        }
    }
}
