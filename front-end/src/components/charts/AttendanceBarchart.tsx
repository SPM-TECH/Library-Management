import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

import { useQuery } from "react-query";
import { loginCount } from "../../api/admin";
import { Skeleton } from "../../components/ui/skeleton";
import { useCallback, useState } from "react";
import { getLoginForMonth } from "@/lib/chart-helpers";
import MonthPicker from "../ui/month-picker";
import { DropdownMenu } from "../ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "../ui/card";

const AttendanceBarchart = () => {
  const { data, isLoading } = useQuery("loginCount", loginCount);
  const [date, setDate] = useState(new Date());

  const loginCountForMonth = useCallback(() => {
    if (!data) {
      return [];
    }
    return getLoginForMonth(date.getMonth(), date.getFullYear(), data);
  }, [date, data]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <h3 className=" p-5">Logins of </h3>
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-slate-50 dark:bg-slate-950 border-1 border-slate-100 px-4 py-2 rounded">
              {format(date, "MMMM, yyyy")}
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" bg-slate-100 dark:bg-slate-900 p-6 z-50">
              <MonthPicker currentMonth={date} onMonthChange={setDate} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <>
          <div className=" flex items-center justify-center w-full px-4">
            {isLoading ? (
              <div>
                <SkeletonComp />
              </div>
            ) : (
              <ResponsiveContainer height={350}>
                <BarChart width={500} height={350} data={loginCountForMonth()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" name="date" />
                  <YAxis name="count" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </>
      </CardContent>
    </Card>
  );
};

export default AttendanceBarchart;

const SkeletonComp = () => {
  return (
    <div>
      <div className="flex flex-row  gap-x-6   items-end m-10  lg:h-[270px]">
        <Skeleton className="lg:w-[60px] w-[30px] h-[250px] rounded opacity-25" />
        <Skeleton className="lg:w-[60px] w-[30px] h-[150px] rounded opacity-25" />
        <Skeleton className="lg:w-[60px] w-[30px] h-[250px] rounded opacity-25" />
        <Skeleton className="lg:w-[60px] w-[30px] h-[100px] rounded opacity-25" />
        <Skeleton className="lg:w-[60px] w-[30px] h-[200px] rounded opacity-25" />
        <Skeleton className="lg:w-[60px] w-[30px] h-[250px] rounded opacity-25" />
      </div>
    </div>
  );
};
