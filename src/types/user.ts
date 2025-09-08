export default interface User {
    userCompanyID(arg0: string, userCompanyID: any): unknown;
    id: number;
    name: string;
    email: string;
    password: string;
    role_id: number;
    creaed_at: Date;
    token: string;
    role: string;
}