import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto/create-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @ApiOperation({ summary: "tạo user", description: "tạo và lưu user vào database" })
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto.username, createUserDto.email);
    }

    @Get()
    @ApiOperation({ summary: "lấy user", description: "lấy toàn bộ user" })
    async getUsers() {
        return this.userService.getUsers();
    }

    @Get(':id')
    @ApiOperation({ summary: "lấy user", description: "lấy user theo id" })
    async getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }
}
