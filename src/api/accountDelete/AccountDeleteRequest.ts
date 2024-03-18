export class AccountDeleteRequest {
    reason: string = '';
    password: string = '';
    invalidReason: boolean = false;
    invalidPassword: boolean = false;
    error: string = '';
    showPassword: boolean = false;
}