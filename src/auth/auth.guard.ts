import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'

type userFromCookie = {
    id: string
    iat: Date
    exp: Date
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const jwt = req.cookies['jwt']
            if (!jwt) {
                throw new UnauthorizedException('Auth to interact with forks')
            }
            const user: userFromCookie = this.jwtService.verify(jwt, {
                secret: process.env.SECRET_KEY,
            })
            return !!user
        } catch (error) {
            console.log(error)

            throw new UnauthorizedException('Auth to interact with forks')
        }
    }
}
