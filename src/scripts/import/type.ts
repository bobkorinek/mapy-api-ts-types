export const parseType = (type: string): string => type?.match(/\{(?<type>[^}]+)\}/)?.groups['type'];
