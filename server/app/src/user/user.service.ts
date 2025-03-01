import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    // Tạo user mới
    async createUser(name: string, email: string): Promise<User> {
        const user = new this.userModel({ name, email });
        return user.save();
    }

    // Lấy danh sách tất cả user
    async getUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }
}
