enum AuthActions {
    GET = 'GET',
    FILL = 'FILL',
    CLEAR = 'CLEAR'
}
class Auth {
    public uid: string;
    public username: string;
    public email: string;
    public password: string;
    public name: string;
    public token: string

    constructor() {
        this.uid = '';
        this.username = '';
        this.email = '';
        this.password = '';
        this.name = '';
        this.token = '';
    }
}

export { Auth, AuthActions };