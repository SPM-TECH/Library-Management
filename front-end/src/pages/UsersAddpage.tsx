import StudentList from "@/components/users/StudentList";
import AddStudentForm from "@/components/users/AddStudentForm";
import UploadBulk from "@/components/users/UploadBulk";

const UsersAddpage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row  items-center md:items-start justify-center md:justify-start   bg-cover bg-no-repeat">
      <div className="md:flex-shrink">
        <AddStudentForm />
        <UploadBulk />
      </div>
      <div className="px-8">
        <StudentList />
      </div>
    </div>
  );
};

export default UsersAddpage;
