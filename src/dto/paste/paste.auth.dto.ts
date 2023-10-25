import { AuthDto } from "../user/auth.dto";
import { PasteDto } from "./paste.dto";

export interface PasteAuthDto {
    paste: PasteDto,
    auth: AuthDto,
}