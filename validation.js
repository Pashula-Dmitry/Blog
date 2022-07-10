import { body } from 'express-validator';

export const registerValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('fullName').isLength({ min: 3 }),
    body('avatarUrl').optional().isURL(),
];

export const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
];

export const postCreateValidation = [
    body('title', 'Enter article title').isLength({ min: 3 }).isString(),
    body('text', 'Enter article text').isLength({ min: 3 }).isString(),
    body('tags', 'tags have incorrect format (pass it like array)').optional().isArray(),
    body('imageUrl', 'Image url is incorrect').optional().isString(),
];
