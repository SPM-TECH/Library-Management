import { getServices } from "@/api/service";
import SingleService from "@/components/services/SingleService";
import { Loader2 } from "lucide-react";
import { useQuery } from "react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const ServiceList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: () => getServices(),
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Options</CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading && (
          <div className="px-4 py-6">
            <Loader2 className="animate-spin" />
          </div>
        )}
        {data &&
          data.map((s, i) => (
            <SingleService key={s.id} index={i + 1} service={s} />
          ))}
      </CardContent>
    </Card>
  );
};

export default ServiceList;
