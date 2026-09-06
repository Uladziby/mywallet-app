import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  AddNewUserAssetDto,
  AssetCurrency,
  AssetImage,
  ResponseAssetsDto,
  ResponseUserDataDto,
} from './assets.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AssetsService {
  constructor(private prisma: PrismaService) {}

  async getUserAssets(userId: number): Promise<ResponseUserDataDto[]> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const categories = await this.prisma.category.findMany({
      where: {
        assetsUserId: user.id,
      },
      include: {
        asset: true,
      },
    });

    return categories.map((category) => ({
      ...category,
      asset: category.asset.map((asset) => ({
        ...asset,
        change: Number(asset.change),
        imageUri: asset.imageUri as AssetImage,
        typeCurrency: asset.typeCurrency as AssetCurrency,
      })),
    }));
  }

  async addNewUserAsset(
    userId: number,
    data: AddNewUserAssetDto,
  ): Promise<ResponseAssetsDto> {
    console.log(data, 'addNewUserAsset data');
    if (!data?.asset) {
      throw new BadRequestException(
        'Request body must include title and asset fields',
      );
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const {
      title,
      asset: { name, place, balance, change, imageUri, typeCurrency },
    } = data;

    const userData = await this.prisma.userData.upsert({
      where: {
        userId,
      },
      update: {},
      create: {
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    let category = await this.prisma.category.findFirst({
      where: {
        assetsUserId: userData.userId,
        title,
      },
    });

    if (!category) {
      category = await this.prisma.category.create({
        data: {
          userData: {
            connect: {
              userId: userData.userId,
            },
          },
          title,
        },
      });
    }

    const newAsset = await this.prisma.asset.create({
      data: {
        name,
        place,
        balance,
        change,
        imageUri,
        typeCurrency,
        category: {
          connect: {
            id: category.id,
          },
        },
      },
    });

    return {
      title: category.title,
      asset: {
        name: newAsset.name,
        place: newAsset.place,
        balance: newAsset.balance,
        change: Number(newAsset.change),
        imageUri: newAsset.imageUri as AssetImage,
        typeCurrency: newAsset.typeCurrency as AssetCurrency,
      },
    };
  }

  async deleteUserAsset(
    userId: number,
    categoryTitle: string,
    assetName: string,
  ): Promise<void> {
    const category = await this.prisma.category.findFirst({
      where: {
        title: categoryTitle,
        assetsUserId: userId,
      },
    });

    if (!category) {
      throw new NotFoundException(
        `Category with title ${categoryTitle} not found for user ID ${userId}`,
      );
    }

    const asset = await this.prisma.asset.findFirst({
      where: {
        name: assetName,
        categoryId: category.id,
      },
    });

    if (!asset) {
      throw new NotFoundException(
        `Asset with name ${assetName} not found in category ${categoryTitle}`,
      );
    }

    await this.prisma.asset.delete({
      where: {
        id: asset.id,
      },
    });
  }
}
