import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
export class UpdateUserDto {
  @ApiProperty({ description: '用户名称' })
  @IsNotEmpty({ message: '用户名称必填' })
  username: string

  @ApiProperty({ description: '用户昵称' })
  @IsNotEmpty({ message: '用户角色必填' })
  @IsOptional({ groups: ['update'] }) // 不传就不更改
  nickname?: string

  @ApiProperty({ description: '用户密码' })
  password?: string

  @ApiProperty({ description: '用户角色' })
  @IsNotEmpty({ message: '用户角色必填' })
  @IsOptional() // 允许前端不传该参数,如果传了就会开启验证
  role?: string

  // 可选参数
  @ApiPropertyOptional({ description: '头像' })
  @IsString()
  @IsOptional() // 检查给定值是否为空（=== null，=== undefined），允许前端不传该参数,如果传了就会开启验证
  avatar?: string
}
