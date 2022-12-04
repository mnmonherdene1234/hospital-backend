import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from 'src/config';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  signature() {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp },
      CLOUDINARY_API_SECRET,
    );

    return { timestamp, signature };
  }

  async deleteMedia(name: string) {
    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });
    return await cloudinary.uploader.destroy(name);
  }
}
