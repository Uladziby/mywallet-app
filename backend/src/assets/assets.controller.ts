import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import {
  AddNewUserAssetDto,
  ResponseAssetsDto,
  ResponseUserDataDto,
} from './assets.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get('/user/:userId')
  async getUserAssets(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ResponseUserDataDto[]> {
    return this.assetsService.getUserAssets(userId);
  }

  @Post('/user/:userId')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async addNewUserAsset(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() asset: AddNewUserAssetDto,
  ): Promise<ResponseAssetsDto> {
    return this.assetsService.addNewUserAsset(userId, asset);
  }

  @Delete('/user/:userId/:categoryTitle/:assetName')
  async deleteUserAsset(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('categoryTitle') categoryTitle: string,
    @Param('assetName') assetName: string,
  ) {
    return this.assetsService.deleteUserAsset(userId, categoryTitle, assetName);
  }
}
