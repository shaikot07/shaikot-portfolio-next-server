

import express from 'express';
import { BlogControllers } from './blog.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/',auth('user'), BlogControllers.createBlog)
router.patch('/:id',auth('user'), BlogControllers.updateBlogController)
router.delete('/:id',auth('user'), BlogControllers.deleteBlogById)





export const BlogRoutes = router;