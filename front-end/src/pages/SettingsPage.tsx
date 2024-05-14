import AddNewService from "@/components/services/AddNewService";
import ServiceList from "@/components/services/ServiceList";

const SettingsPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <ServiceList />
      </div>
      <div>
        <AddNewService />
      </div>
    </div>
  );
};

export default SettingsPage;
