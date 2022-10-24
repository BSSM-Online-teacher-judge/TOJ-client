import '../../styles/Signup.scss'
import { Header } from "../../allFiles";
import classNames from "classnames"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import {authInstance, instance} from "../../instance";

interface SignUp {
  email: string;
  password: string;
  name: string;
  nickName: string;
  grade: string;
  classRoom: string;
}

export default function Signup() {
  const nav = useNavigate();
  const [input, setInput] = useState<SignUp>({
    email: "",
    password: "",
    name: "",
    nickName: "",
    grade: "",
    classRoom: "",
  });
  const [certification, setCertification] = useState(false);
  const [code, setCode] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const [robot, setRobot] = useState(false);

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "code") setCode(value);
    else if (name === "check-password") setCheckPw(value);
    else {
      const newInput = {
        ...input,
        [name]: value,
      };
      setInput(newInput);
    }
  };

  const signup = async () => {
    try {
      if (!(input.password === checkPw)) {
        alert("비밀번호가 같지 않습니다.");
      } else if (input.name === "") {
        alert("이름이 입력되지 않았습니다.");
      } else if (Number(input.grade) > 3) {
        alert("학년이 유효하지 않습니다.");
      } else if (Number(input.classRoom) > 4) {
        alert("반이 유효하지 않습니다.");
      } else if (robot) {
        alert("로봇은 가입할 수 없습니다.");
      } else {
        await instance.post("/user", input);
        alert("회원가입 성공");
        nav("/login");
      }
    } catch (error) {
      alert("회원가입에 실패했습니다.");
      console.log(error);
    }
  };

  const sendEmail = async () => {
    if (!/^20[0-9]{7}@bssm.hs.kr$/g.test(input.email)) {
      alert("학교 이메일 계정만 사용할 수 있습니다.");
    } else {
      try {
        await authInstance.post(`/user/send-mail?email=${input.email}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const checkCode = async () => {
    if (!/^20[0-9]{7}@bssm.hs.kr$/g.test(input.email)) {
      alert("학교 이메일 계정만 사용할 수 있습니다.");
    } else {
      const result = await authInstance.delete("/user/check-code", {
        data: {
          email: input.email,
          code: code,
        },
      });
      console.log(result.data);
      setCertification(result.data);
    }
  };

  return (
    <div className={classNames("signUp")}>
      <Header />
      <div className={classNames("signUp input-div")}>
        <h1 className={classNames("input-div title")}>회원가입</h1>
        <div className={classNames("input-div input")}>
          <p style={{ fontSize: "20px", marginBottom: "10px" }}>회원가입</p>
          <p>
            계정이 이미 있는 경우에는{" "}
            <Link style={{ color: "#0076C0" }} to="/login">
              로그인
            </Link>
            해주세요
          </p>
          <div className={classNames("input list")}>
            <ul className={classNames("list ul")}>
              <li className={classNames("ul email-li")}>
                <p>이메일(아이디)</p>
                <input
                  type="email"
                  name="email"
                  value={input?.email}
                  onChange={(e) => {
                    change(e);
                  }}
                  readOnly={certification}
                />
              </li>
              <li className={classNames("ul certification-li")}>
                {certification ? (
                  <span style={{ color: "#0076C0", fontSize: "14px" }}>
                    인증 완료
                  </span>
                ) : (
                  <span style={{ color: "red", fontSize: "14px" }}>
                    인증 미완료
                  </span>
                )}
                <button onClick={sendEmail}>이메일 인증</button>
              </li>
              <li className={classNames("ul check-code-li")}>
                <p>인증 코드</p>
                <input
                  type="text"
                  value={code}
                  name="code"
                  onChange={(e) => {
                    change(e);
                  }}
                />
                <button onClick={checkCode}>확인</button>
              </li>
              <li className={classNames("ul password-li")}>
                <li className={classNames("password-li password-input-li")}>
                  <p>비밀번호</p>
                  <input
                    type="password"
                    name="password"
                    value={input?.password}
                    onChange={(e) => {
                      change(e);
                    }}
                  />
                </li>
                <li className={classNames("password-li password-check-li")}>
                  <p>비밀번호 확인</p>
                  <input
                    type="password"
                    name="check-password"
                    value={checkPw}
                    onChange={(e) => {
                      change(e);
                    }}
                  />
                </li>
              </li>
              <li className={classNames("ul name-li")}>
                <p>이름</p>
                <input
                  type="text"
                  name="name"
                  value={input?.name}
                  onChange={(e) => {
                    change(e);
                  }}
                />
              </li>
              <li className={classNames("ul nickname-li")}>
                <p>닉네임</p>
                <input
                  type="text"
                  name="nickName"
                  value={input?.nickName}
                  onChange={(e) => {
                    change(e);
                  }}
                />
              </li>
              <li className={classNames("ul grade-li")}>
                <p>학년</p>
                <input
                  type="text"
                  name="grade"
                  value={input?.grade}
                  onChange={(e) => {
                    change(e);
                  }}
                />
              </li>
              <li className={classNames("ul classroom-li")}>
                <p>반</p>
                <input
                  type="text"
                  name="classRoom"
                  value={input?.classRoom}
                  onChange={(e) => {
                    change(e);
                  }}
                />
              </li>
              <li className={classNames("ul select-li")}>
                <input
                  type="checkbox"
                  name="robot"
                  checked={robot}
                  onClick={() => {
                    setRobot((prev) => !prev);
                  }}
                />
                <span className={classNames("select-text")}>로봇입니까?</span>
              </li>
            </ul>
          </div>
          <button
            onClick={signup}
            disabled={certification ? false : true}
            className={classNames("input button")}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
