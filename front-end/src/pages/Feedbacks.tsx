import { useQuery } from "react-query";
import { getFeedbacks } from "@/api/feedback";
import { Skeleton } from "../components/ui/skeleton";
import { format } from "date-fns";

export default function Feedbacks() {
  const { data, isLoading } = useQuery("feedback", getFeedbacks);

  return (
    <div>
      {isLoading ? (
        <SkeletonComp />
      ) : (
        <div className="flex flex-col">
          <h1 className="text-white text-2xl m-5 font-bold">Feedbacks</h1>
          <div className="p-9 grid grid-cols-1  sm:grid-cols-2 gap-3">
            {data &&
              data.map((feedback) => (
                <div
                  key={`feedback=${feedback.id}`}
                  className="bg-slate-800 rounded shadow  items-center px-4 py-3"
                >
                  <p className="text-slate-100 text-sm"> {feedback.content}</p>
                  <p className="text-slate-300 text-sm mt-3">
                    {" "}
                    {format(new Date(feedback.created_at), "dd-LL-yyyyy")}{" "}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

const SkeletonComp = () => {
  return (
    <div>
      <div className=" lg:gap-10 gap-10 items-end m-10 p-10 grid grid-cols-2 ">
        <Skeleton className="lg:h-[100px] h-[50px] w-full rounded opacity-25" />
        <Skeleton className="lg:h-[100px] h-[50px] w-full  rounded opacity-25" />
        <Skeleton className="lg:h-[100px] h-[50px] w-full rounded opacity-25" />
        <Skeleton className="lg:h-[100px] h-[50px] w-full rounded opacity-25" />
        <Skeleton className="lg:h-[100px] h-[50px] w-full rounded opacity-25" />
        <Skeleton className="lg:h-[100px] h-[50px] w-full rounded opacity-25" />
        <Skeleton className="lg:h-[100px] h-[50px] w-full rounded opacity-25" />
        <Skeleton className="lg:h-[100px] h-[50px] w-full rounded opacity-25" />
      </div>
    </div>
  );
};
