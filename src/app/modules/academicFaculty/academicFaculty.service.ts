import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';


// add faculty  data in to DB 
const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

// get all Faculties data from DB
const getAllAcademicFacultiesFromDB =async()=>{
    const result =await AcademicFaculty.find()
    return result 
}
// get single  Faculties by id data from DB
const getSingleAcademicFacultyFromDB = async(id:string)=>{
    const result =AcademicFaculty.findById(id)
    return result
};

const updateAcademicFacultyIntoDB=async(id:string, payload:Partial<TAcademicFaculty>)=>{

    const result = AcademicFaculty.findOneAndUpdate({_id:id},payload,{new:true});
    return result 
}


export const AcademicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB
};
