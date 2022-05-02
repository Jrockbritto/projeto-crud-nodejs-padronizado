
//def TS user model
type User = {
    uuid?: string;
    username: string;
    password: string;
    email: string;
    admin: boolean;
}

export default User;