import jwt_decode from 'jwt-decode';

export function ValidateTimeAccessToken(){
    const accessToken = localStorage.getItem("access-token");
    const decodePayload = jwt_decode(accessToken, {payload: true});
    const exp = (new Date(decodePayload.exp* 1000).getTime());
    const now = new Date().getTime();

    if(now < exp){
        return true;
    }
    else{
        return false;
    }
}

export function ValidateTimeRefreshToken(){
    const refreshToken = localStorage.getItem("refresh-token");
    const decodePayload = jwt_decode(refreshToken, {payload: true});
    const exp = (new Date(decodePayload.exp* 1000).getTime());
    const now = new Date().getTime();

    if(now < exp){
        return true;
    }
    else{
        return false;
    }
}
