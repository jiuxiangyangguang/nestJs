// user.controller.ts
import { Controller, Get, Param, Body, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { UserEntity } from '../../entities/user.entity'
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UpdateDto, UserDto } from './dto/user.dto'

@ApiTags('用户') // swagger 按照controller模块划分
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 获取全部信息
  @ApiOperation({ summary: '获取全部用户信息' }) // 添加swagger接口说明文字
  @Get('getAll')
  findAll(): any {
    return this.userService.getAllUserTest()
  }

  // 获取某个用户信息
  @ApiOperation({ summary: 'id用户信息' }) // 添加swagger接口说明文字
  @Get(':_id')
  findOne(@Param('_id') _id: string): any {
    return this.userService.findOne(_id)
  }

  // 增加用户
  @ApiExtraModels(UserDto)
  @ApiOperation({ summary: '添加用户' }) // 添加swagger接口说明文字
  @Post('add')
  async addOne(@Body() body: UserDto): Promise<any> {
    await this.userService.addOne(body)
  }

  // 修改用户信息
  @Post('update')
  async update(@Body() body: UpdateDto): Promise<any> {
    await this.userService.update(body)
  }

  // 删除
  @Post('del')
  async del(@Body() body: UserEntity): Promise<any> {
    await this.userService.del(body)
  }
}
