
import { User } from "@/api/users"


export function validateDetails(details: User[]) {
    const correct: User[] = []
    const wrong: User[] = []

    details.forEach(st => {

        if (/\d{9,11}V/i.test(st.nic_number)) {
            correct.push(st)
        } else {
            wrong.push(st)
        }

    })

    return {
        correct, wrong
    }
}