import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IBlog } from './blog.interface';
import { BlogModel } from './blog.model';

const createBlogIntoDb = async (payload: Partial<IBlog>) => {
  const newBlog = await BlogModel.create(payload);

  // Populate the author field with details from the User model
  const result = await BlogModel.findById(newBlog._id)
    .populate('author', 'name email')
    .exec();

  return result;
};

// updated operation
const updateBlogById = async (blogId: string,updateData: { title: string; content: string; },userId: string) => {
    const blog = await BlogModel.findById(blogId);
  
    if (!blog) {
      throw new AppError(httpStatus.NOT_FOUND, 'blog not found!');
    }
  
    // Check if the user is the author of the blog
    if (blog.author.toString() !== userId) {
      throw new AppError(httpStatus.FORBIDDEN, 'you can only update your own blog!');
    }
  
    const result = await BlogModel.findOneAndUpdate({ _id: blogId },    
        { $set: updateData },
        { new: true }       
      ).populate('author', 'name email')
      .exec();
  
    return result
  };
  
//   deleted operation 
  const deleteBlogById = async (blogId: string, userId: string) => {
    // Find the blog and delete 
    const result = await BlogModel.findOneAndDelete({ _id: blogId, author: userId });
  
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'Blog not found or you are not authorized to delete it!');
    }
  
    return { message: 'Blog deleted successfully' };
  };

export const BlogServices = {
  createBlogIntoDb,
  updateBlogById,
  deleteBlogById
};
