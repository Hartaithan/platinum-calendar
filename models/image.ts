export interface ImageData {
  id: string;
  deletehash: string;
  account_id: unknown | null;
  account_url: unknown | null;
  ad_type: unknown | null;
  ad_url: unknown | null;
  title: string | null;
  description: string | null;
  name: string;
  type: string;
  width: number;
  height: number;
  size: number;
  views: number;
  section: unknown | null;
  vote: unknown | null;
  bandwidth: number;
  animated: boolean;
  favorite: boolean;
  in_gallery: boolean;
  in_most_viral: boolean;
  has_sound: boolean;
  is_ad: boolean;
  nsfw: unknown;
  link: string;
  tags: unknown[];
  datetime: number;
  mp4: string;
  hls: string;
}

export interface ImageErrorData {
  error: string;
  request: string;
  method: string;
}

export interface ImageSuccessResponse {
  status: 200;
  success: true;
  data: ImageData;
}

export interface ImageErrorResponse {
  status: 200;
  success: false;
  data: ImageErrorData;
}

export type ImageResponse = ImageSuccessResponse | ImageErrorResponse;
