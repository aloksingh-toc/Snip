import { customAlphabet } from 'nanoid';

const generateCode = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 6);

export default generateCode;
