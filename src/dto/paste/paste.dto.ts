export interface PasteDto {
    user_id: string,
    username: string,
    title: string,
    paste: string,
    description?: string,
    tags?: string,
    is_private?: boolean,
    paste_password?: string,
}   