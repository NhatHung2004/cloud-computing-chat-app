import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto/create-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // @Post()
    // async createUser(@Body() body: { name: string; email: string;  }) {
    //     return this.userService.createUser(body.name, body.email);
    // }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto.username, createUserDto.email);
    }

    @Get()
    async getUsers() {
        return this.userService.getUsers();
    }
}
