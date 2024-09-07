import { Role } from "../../config/types/userTypes";

export const translateRole = (role: Role): string => {
    switch (role) {
        case "Admin":
            return "מנהל";
        case "Supplier":
            return "ספק";
        case "User":
            return "משתמש";
        default:
            return "";
    }
}
