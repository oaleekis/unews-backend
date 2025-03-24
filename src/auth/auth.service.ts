import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthorsService } from 'src/modules/authors/authors.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { AuthResponseDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private jwtExpirationTime: number;
    constructor(
        private readonly authorsService: AuthorsService, 
        private readonly jwtService: JwtService, 
        private readonly configService: ConfigService
    ) { 
        this.jwtExpirationTime = +this.configService.get<number>('JWT_EXPIRATION_TIME');
    }

    async signIn(email: string, password: string): Promise<AuthResponseDto> {
        const foundAuthor = await this.authorsService.findOneByEmail(email);

        if(!foundAuthor || !bcryptCompareSync(password, foundAuthor.password)) {
            throw new UnauthorizedException();
        }

        const payload = { sub: foundAuthor.id, email: foundAuthor.email };

        const token = this.jwtService.sign(payload);

        return { token, expiresIn: this.jwtExpirationTime, author: foundAuthor.id };
    }

}
