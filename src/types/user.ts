export default interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role_id: number;
    creaed_at: Date;
    token: string;
}