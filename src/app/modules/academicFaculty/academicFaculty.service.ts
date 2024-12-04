import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyModel } from './academicFaculty.model';

// add faculty  data in to DB 
const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payload);
  return result;
};

// get all Faculties data from DB
const getAllAcademicFacultiesFromDB =async()=>{
    const result =await AcademicFacultyModel.find()
    return result 
}
// get single  Faculties by id data from DB
const getSingleAcademicFacultyFromDB = async(id:string)=>{
    const result =AcademicFacultyModel.findById(id)
    return result
};

const updateAcademicFacultyIntoDB=async(id:string, payload:Partial<TAcademicFaculty>)=>{

    const result = AcademicFacultyModel.findOneAndUpdate({_id:id},payload,{new:true});
    return result 
}


export const AcademicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB
};
