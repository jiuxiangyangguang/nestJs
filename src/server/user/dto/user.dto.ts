import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
export class UserDto {
  @ApiProperty({ description: '用户名称' })
  @IsNotEmpty({ message: '用户名称必填' })
  name: string

  @ApiPropertyOptional({ description: '性别' })
  @IsString() // 值必须是字符串
  @IsOptional() // 检查给定值是否为空（=== null，=== undefined），如果为空，则忽略该属性上的所有验证器    (可选参数需要加)
  // 可选参数
  sex?: string

  @ApiPropertyOptional({ description: '年龄' })
  @IsNumber()
  @IsOptional()
  age?: number
}
export class UpdateDto extends UserDto {
  @ApiProperty({ description: '用户id名称' })
  @IsNotEmpty({ message: '用户id名称必填' })
  id: number
}
