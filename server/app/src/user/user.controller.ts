import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto/create-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @ApiOperation({ summary: "Tạo user", description: "Tạo và lưu user vào database" })
    async createUser(@Body() createUserDto: CreateUserDto) {
        // Kiểm tra xem user đã tồn tại chưa
        const existingUser = await this.userService.findByEmail(createUserDto.email);
        if (existingUser) {
            return {
                _id: existingUser._id,
                username: existingUser.name,
                email: existingUser.email
            };
        }

        // Nếu chưa tồn tại thì tạo mới
        const user = await this.userService.createUser(createUserDto.username, createUserDto.email);
        return {
            _id: user._id,
            username: user.name,
            email: user.email
        }
    }

    @Get()
    @ApiOperation({ summary: "Lấy user", description: "Lấy toàn bộ user" })
    async getUsers() {
        return this.userService.getUsers();
    }

    @Get(':id')
    @ApiOperation({ summary: "Lấy user theo ID", description: "Lấy user dựa vào ID" })
    async getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: "Xóa user", description: "Xóa user theo ID" })
    async deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
}
