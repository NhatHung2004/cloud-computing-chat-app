import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    // Tạo user mới
    async createUser(name: string, email: string): Promise<User> {
        const user = new this.userModel({ name, email });
        return user.save();
    }

    // Lấy danh sách tất cả user
    async getUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    // Lấy user theo id
    async getUserById(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email });
    }

    // Xóa user theo id
    async deleteUser(id: string): Promise<User> {
        const user = await this.userModel.findByIdAndDelete(id).exec();
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }

        return user;
    }

}
