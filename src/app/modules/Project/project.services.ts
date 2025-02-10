import { Project } from "./project.model";





// get all Project from db
const getAllProject = async () => {

    const result = await Project.find();
    return result;
  };







  export const ProjectServices = {
    getAllProject
  };