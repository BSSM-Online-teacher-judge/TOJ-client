import { useState } from "react"
import classNames from "classnames"
import { Header } from "../allFiles"
import { instance } from "../instance"
import { Link, useNavigate } from "react-router-dom";
import { BsFillPersonFill } from 'react-icons/bs';
import { FaLock } from 'react-icons/fa'
import '../styles/Login.scss'
import { useDispatch } from "react-redux";
import { setUser, UserInfo } from "../modules/user";

interface Login{
    email: string;
    password: string;
}

export default function Login()
{
    const nav = useNavigate();
    const [input, setInput] = useState<Login>({
        email: "",
        password: ""
    });

    const dispatch = useDispatch();

    const onInsert = (userInfo: UserInfo) => {
        dispatch(setUser(userInfo));
    }

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newInput = {
            ...input,
            [name]: value,
        };
        setInput(newInput);
    }

    const login = async () => {
        try{
            const { accessToken, refreshToken } = (await instance.post('/auth', input)).data;
            const userInfo = (await getUser(accessToken)).data;
            const user = {
                ...userInfo,
                isLogin: true
            };
            onInsert(user);
            window.sessionStorage.setItem("access-token", accessToken);
            window.sessionStorage.setItem("refresh-token", refreshToken);
            nav('/');
        }catch(error){
            console.log(error);
        }
    }

    const getUser = (accessToken: string) => {
        return instance.get('/user', { headers: { Authorization: `Bearer ${accessToken}` }})
    }

    return(
        <div className={classNames("login")}>
            <Header/>
            <div className={classNames("login login-input-div")}>
                <h1 className={classNames("login-input-div title")}>로그인</h1>
                <div className={classNames("login-input-div list-div")}>
                    <p className={classNames("list-div login-text")}>로그인</p>
                    <ul className={classNames("list-div ul")}>
                        <li className={classNames("login-input-list")}>
                            <BsFillPersonFill className={classNames("input-list icon")} />
                            <input type="text" value={input.email} name="email" onChange={(e)=>{change(e)}} />
                        </li>
                        <li className={classNames("login-input-list")}>
                            <FaLock className={classNames("input-list icon")} />
                            <input type="password" value={input.password} name="password" onChange={(e)=>{change(e)}} />
                        </li>
                        <li className={classNames("login-input-list")}>
                            <button onClick={login} className={classNames("input-list login-button")}>로그인</button>
                        </li>
                    </ul>
                    <span className={classNames("signup-link")}>회원 가입은 <Link to="/signup">여기</Link>에서 할 수 있습니다.</span>
                </div>
            </div>
        </div>
    )
}