import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const onChangeEmail = useCallback(e => {
    const emailRegex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    setEmail(e.target.value);
    if (emailRegex.test(e.target.value)) {
      setEmailMessage("올바른 이메일 형식입니다.");
      setIsEmail(true);
    } else {
      setEmailMessage(
        "이메일 형식이 올바르지 않습니다. 다시 한번 확인해 주세요."
      );
      setIsEmail(false);
    }
  }, []);

  const onChangePassword = useCallback(e => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    setPassword(e.target.value);
    if (passwordRegex.test(e.target.value)) {
      setPasswordMessage("올바른 비밀번호 형식입니다.");
      setIsPassword(true);
    } else {
      setPasswordMessage(
        "비밀번호는 특수 문자를 포함하여 8자 이상 작성해 주십시오."
      );
      setIsPassword(false);
    }
  }, []);

  const navigate = useNavigate();

  const onSignUp = () => {
    navigate("/auth/signup");
  };

  const onSubmit = useCallback(
    async e => {
      e.preventDefault();
      try {
        await axios
          .post("http://localhost:8080/users/login", {
            email: email,
            password: password,
          })
          .then(res => {
            if (res.status === 200) {
              localStorage.setItem("token", res.Access_token);
              navigate("/");
            }
          });
      } catch (err) {
        console.error(err);
        alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
      }
    },
    [email, password, navigate]
  );

  return (
    <LoginBody>
      <LoginWrapper onSubmit={onSubmit}>
        <LoginIntro>
          프리온보딩 <br />
          프론트엔드 챌린지 8월
        </LoginIntro>
        <EmailWrapper>
          <p>이메일</p>
          <LoginInput
            type="email"
            placeholder="이메일을 입력해 주세요."
            value={email}
            onChange={onChangeEmail}
          />
          {email.length > 0 && (
            <EmailText isEmail={isEmail}>{emailMessage}</EmailText>
          )}
        </EmailWrapper>
        <PasswordWrapper>
          <p>비밀번호</p>
          <LoginInput
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            value={password}
            onChange={onChangePassword}
          />
          {password.length > 0 && (
            <PasswordText isPassword={isPassword}>
              {passwordMessage}
            </PasswordText>
          )}
        </PasswordWrapper>
        <LoginButton disabled={!(isEmail && isPassword)} type="submit">
          로그인
        </LoginButton>
        <SignUpButton type="button" onClick={onSignUp}>
          회원가입
        </SignUpButton>
      </LoginWrapper>
    </LoginBody>
  );
};

export default Login;

const LoginBody = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

const LoginWrapper = styled.form`
  width: 25rem;
  height: 38.375rem;
  border: none;
  border-radius: 0.313rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
`;

const LoginIntro = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: 3rem 0;
`;

const EmailWrapper = styled.div`
  width: 80%;
  margin: 0.5rem 0;

  p {
    margin: 0;
    font-size: 15px;
    color: #767676;
  }
`;

const PasswordWrapper = styled.div`
  width: 80%;
  margin: 0.5rem 0;

  p {
    margin: 0;
    font-size: 15px;
    color: #767676;
  }
`;

const LoginInput = styled.input`
  height: 3.125rem;
  width: 90%;
  margin: 0.5rem 0;
  border: 1px solid #e1e2e3;
  border-radius: 0.313rem;
  padding: 0 0.938rem;
`;

const LoginButton = styled.button`
  height: 3.125rem;
  width: 80%;
  margin: 3rem 0 0.5rem 0;
  background-color: #36f;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 1.688rem;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    background-color: #e1e2e3;
    cursor: default;
    :hover {
      background-color: #e1e2e3;
    }
  }

  &:hover {
    background-color: #002b5b;
  }
`;

const SignUpButton = styled.button`
  height: 3.125rem;
  width: 80%;
  margin: 0.5rem 0;
  background-color: #36f;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 1.688rem;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #002b5b;
  }
`;

const EmailText = styled.span`
  color: ${props => (props.isEmail ? "black" : "red")};
`;

const PasswordText = styled.span`
  color: ${props => (props.isPassword ? "black" : "red")};
`;
