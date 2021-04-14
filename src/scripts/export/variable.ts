import { Type } from "../types";

export const createType = (type: Type | Type[]) => typeof type === 'string' ? type : type.join(' | ');
