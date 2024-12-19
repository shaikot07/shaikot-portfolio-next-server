import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { BlogServices } from './blog.services';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const userId = req.user?.userId; // From the JWT token (set by auth middleware)
  console.log(title, content);
  console.log('id asbe', userId);
  const result = await BlogServices.createBlogIntoDb({title,content,author: userId,
  });


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog post successfully',
    data: result,
  });
});

const updateBlogController = catchAsync(async (req: Request, res: Response) => {
    const blogId = req.params.id;
    const { title, content } = req.body;
    const userId = req.user?.userId;
  
    const updatedBlog = await BlogServices.updateBlogById(blogId, { title, content }, userId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'blog updated successfully!',
      data: updatedBlog,
    });
  });


  const deleteBlogById = catchAsync(async (req: Request, res: Response) => {
    const blogId = req.params.id;
    const userId = req.user?.userId;
  
    const result = await BlogServices.deleteBlogById(blogId, userId);
  
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'blog deleted  successfully!',
        data:result,
      });
  });


export const BlogControllers = {
  createBlog,
  updateBlogController,
  deleteBlogById
};
