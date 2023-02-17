// user.controller.ts
import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '../../entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // 获取全部信息
  @Get('getAll')
  findAll(): any {
    return this.userService.getAllUserTest();
  }

  // 获取某个用户信息
  @Get(':_id')
  findOne(@Param('_id') _id: string): any {
    return this.userService.findOne(_id);
  }

  // 增加用户
  @Post('add')
  async addOne(@Body() body: UserEntity): Promise<any> {
    await this.userService.addOne(body);
  }

  // 修改用户信息
  @Post('update')
  async update(@Body() body: UserEntity): Promise<any> {
    await this.userService.update(body);
  }

  // 删除
  @Post('del')
  async del(@Body() body: UserEntity): Promise<any> {
    await this.userService.del(body);
  }
}
