import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
export class CreateUserDto {
  @ApiProperty({ description: '用户名称' })
  @IsNotEmpty({ message: '用户名称必填' })
  username: string

  @ApiProperty({ description: '用户昵称' })
  @IsNotEmpty({ message: '用户昵称必填' })
  nickname: string

  @ApiProperty({ description: '用户密码' })
  @IsNotEmpty({ message: '用户密码必填' })
  password: string

  @ApiProperty({ description: '用户角色' })
  @IsNotEmpty({ message: '用户角色必填' })
  @IsOptional({ groups: ['update'] })
  role: string

  // 可选参数
  @ApiPropertyOptional({ description: '头像' })
  @IsString()
  @IsOptional() // 检查给定值是否为空（=== null，=== undefined），如果为空，则忽略该属性上的所有验证器    (可选参数需要加)
  avatar?: string
}

export class DelUserDto {
  @ApiProperty({ description: '用户名称' })
  @IsNotEmpty({ message: '用户名称必填' })
  username: string
}

export class IsUserDto {
  username: string
  existence?: boolean
}
