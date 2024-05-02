import { LoginCount } from "@/api/admin";
import { eachDayOfInterval, endOfMonth, startOfMonth, format } from "date-fns";

export const getLoginForMonth = (month: number, year: number, logins: LoginCount[]): LoginCount[] => {
    const date = new Date(year, month, 1);
    const start = startOfMonth(date)
    const end = endOfMonth(date)

    const dates = eachDayOfInterval({ start, end })
    const formattedDates = dates.map(dt => format(dt, "dd-MM-yyyy"))

    const loginsForMonth = formattedDates.map((d, i) => {
        const exists = logins.find(l => l.date === d)
        if (exists) {
            return { ...exists, date: exists.date.slice(0, 2) }
        } else {
            return {
                id: i,
                date: d.slice(0, 2),
                count: 0
            }
        }
    })

    return loginsForMonth
}