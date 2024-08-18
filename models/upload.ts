export interface UploadBody {
  image: Blob;
  psnId: string;
}

export interface UploadSuccessResponse {
  success: true;
  message: string;
  link: string | undefined;
}

export interface UploadErrorResponse {
  success: false;
  message: string;
}

export type UploadResponse = UploadSuccessResponse | UploadErrorResponse;
