export type LoginResponse = {
    type: string;
    token: string;
    expiredAt: string;
    firstTimeChangedPwd: boolean;
};
