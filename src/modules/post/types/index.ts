export type TGetPostListResponse = IPost[];

export interface IPostPreviewPicture {
    "id": number,
    "name": string,
    "url": string
}

export interface IPost {
    "id": number,
    "title": string,
    "code": string,
    "authorName": string,
    "previewPicture": IPostPreviewPicture,
    "tagNames": string[],
    "updatedAt": string,
    "createdAt": string
}