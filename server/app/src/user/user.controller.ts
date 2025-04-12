import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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
        return this.userService.createUser(createUserDto.username, createUserDto.email);
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

    // ✅ Thêm API cho đăng nhập Google
    @Post('/google')
    @ApiOperation({ summary: "Đăng nhập bằng Google", description: "Tạo user nếu chưa có, nếu có rồi thì trả về user" })
    async loginWithGoogle(@Body() createUserDto: CreateUserDto) {
        const existingUser = await this.userService.findByEmail(createUserDto.email);

        if (existingUser) {
            return {
                _id: existingUser._id,
                username: existingUser.name,
                email: existingUser.email
            };
        }

        const newUser = await this.userService.createUser(createUserDto.username, createUserDto.email);
        return {
            _id: newUser._id.to,
            username: newUser.name,
            email: newUser.email
        };
    }

}
