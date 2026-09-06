import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum AssetImage {
  bitcoin = 'bitcoin',
  etherium = 'etherium',
  usd = 'usd',
  eur = 'eur',
}

export enum AssetCurrency {
  USD = 'USD',
  EUR = 'EUR',
}

export class AssetDto {
  @IsString()
  name: string;

  @IsString()
  place: string;

  @IsNumber()
  @Type(() => Number)
  balance: number;

  @IsNumber()
  @Type(() => Number)
  change: number;

  @IsEnum(AssetImage)
  imageUri: AssetImage;

  @IsEnum(AssetCurrency)
  typeCurrency: AssetCurrency;
}

export class ResponseAssetsDto {
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssetDto)
  asset: AssetDto;
}

export class UserAssetsDto {
  @IsNumber()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseAssetsDto)
  categories: ResponseAssetsDto[];
}

export class ResponseUserDataDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsNumber()
  assetsUserId: number;

  @IsArray()
  @Type(() => AssetDto)
  asset: AssetDto[];
}

export class CategoryTableDto {
  @IsNumber()
  id: number;

  @IsNumber()
  assetsUserId: number;

  @IsString()
  title: string;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => AssetDto)
  asset: AssetDto[];
}

export class AddNewUserAssetDto {
  @IsString()
  title: string;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => AssetDto)
  asset: AssetDto;
}
