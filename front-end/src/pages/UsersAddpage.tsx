import StudentList from "@/components/users/StudentList";
import AddStudentForm from "@/components/users/AddStudentForm";
import UploadBulk from "@/components/users/UploadBulk";

const UsersAddpage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row  items-center md:items-start justify-center md:justify-start   bg-cover bg-no-repeat">
      <div className="w-full h-full md:w-1/2">
        <AddStudentForm />
        <UploadBulk />
      </div>
      <div className="w-full h-full md:w-1/2">
        <StudentList />
      </div>
    </div>
  );
};

export default UsersAddpage;
