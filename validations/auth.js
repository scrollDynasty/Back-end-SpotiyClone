import {body} from 'express-validator'

export const registerValidator = [
    body('email').isEmail(),
    body('password').isLength({min:5}),
    body('fullName').isLength({min:3}),
    body('avatarUrl').optional().isURL({
        require_protocol: false,
        require_host: false,
        allow_protocol_relative_urls: true,
        allow_trailing_dot: true,
        allow_fragments: true,
        allow_query_components: true
    }),
]



export const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({min:5}),
]


export const PostCreateValidation = [
    body('title').isLength({ min:10}).isString(),
    body('text').isLength({ min:5}).isString(),
    body('tags').optional().isString(),
    body('imageUrl').optional().isString(),


]
