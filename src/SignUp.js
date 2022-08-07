import axios from "axios";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);

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

  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordCheck(e.target.value);
      if (password === e.target.value) {
        setPasswordCheckMessage("비밀번호가 일치합니다.");
        setIsPasswordCheck(true);
      } else {
        setPasswordCheckMessage(
          "비밀번호가 일치하지 않습니다. 다시 한번 확인해 주세요."
        );
        setIsPasswordCheck(false);
      }
    },
    [password]
  );

  const onSubmit = useCallback(
    async e => {
      e.preventDefault();
      try {
        await axios
          .post("http://localhost:8080/users/create", {
            email: email,
            password: password,
          })
          .then(res => {
            if (res.status === 200) {
              navigate("/auth");
            }
          });
      } catch (err) {
        console.error(err);
        alert("이미 존재하는 유저입니다.");
      }
    },
    [email, password, navigate]
  );
  return (
    <SignUpBody>
      <SignUpWrapper onSubmit={onSubmit}>
        <p>회원가입</p>
        <EmailWrapper>
          <p>이메일</p>
          <EmailInput
            placeholder="이메일을 입력해 주세요."
            onChange={onChangeEmail}
            type="email"
            value={email}
          />
          {email.length > 0 && (
            <EmailText isEmail={isEmail}>{emailMessage}</EmailText>
          )}
        </EmailWrapper>
        <PassWordWrapper>
          <p>비밀번호</p>
          <PasswordInput
            placeholder="비밀번호를 입력해 주세요."
            type="password"
            onChange={onChangePassword}
            value={password}
          />
          {password.length > 0 && (
            <PasswordText isPassword={isPassword}>
              {passwordMessage}
            </PasswordText>
          )}
        </PassWordWrapper>
        <PassWordCheckWrapper>
          <p>비밀번호 확인</p>
          <PasswordCheckInput
            placeholder="비밀번호를 다시 입력해 주세요."
            type="password"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
          {passwordCheck.length > 0 && (
            <PasswordCheckText isPasswordCheck={isPasswordCheck}>
              {passwordCheckMessage}
            </PasswordCheckText>
          )}
        </PassWordCheckWrapper>
        <SubmitWrapper>
          <SubmitButton
            type="submit"
            disabled={!(isEmail && isPassword && isPasswordCheck)}
          >
            회원가입
          </SubmitButton>
        </SubmitWrapper>
      </SignUpWrapper>
    </SignUpBody>
  );
};

export default SignUp;

const SignUpBody = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpWrapper = styled.form`
  width: 45%;
  height: 100vh;
  border-radius: 0.313rem;
  border: 1px solid #e1e2e3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    font-weight: bold;
  }
`;

const EmailWrapper = styled.div`
  width: 80%;
  margin: 1rem 0;

  p {
    margin-bottom: 0.5rem;
    font-size: 15px;
    color: #767676;
  }
`;

const PassWordWrapper = styled.div`
  width: 80%;
  margin: 1rem 0;

  p {
    margin-bottom: 0.5rem;
    font-size: 15px;
    color: #767676;
  }
`;

const PassWordCheckWrapper = styled.div`
  width: 80%;
  margin: 1rem 0;

  p {
    margin-bottom: 0.5rem;
    font-size: 15px;
    color: #767676;
  }
`;

const EmailInput = styled.input`
  margin-bottom: 0.5rem;
  height: 3.125rem;
  width: 100%;
  border-radius: 0.313rem;
  border: 1px solid #e1e2e3;
  padding: 0 0.938rem;
`;

const PasswordInput = styled.input`
  margin-bottom: 0.5rem;
  height: 3.125rem;
  width: 100%;
  border: 1px solid #e1e2e3;
  border-radius: 0.313rem;
  padding: 0 0.938rem;
`;

const PasswordCheckInput = styled.input`
  margin-bottom: 0.5rem;
  height: 3.125rem;
  width: 100%;
  border: 1px solid #e1e2e3;
  border-radius: 0.313rem;
  padding: 0 0.938rem;
`;

const SubmitWrapper = styled.div`
  width: 80%;
  margin: 5rem 0;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 3.125rem;
  border: none;
  border-radius: 1.688rem;
  background-color: #36f;
  color: white;
  cursor: pointer;

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

const EmailText = styled.span`
  color: ${props => (props.isEmail ? "black" : "red")};
`;

const PasswordText = styled.span`
  color: ${props => (props.isPassword ? "black" : "red")};
`;

const PasswordCheckText = styled.span`
  color: ${props => (props.isPasswordCheck ? "black" : "red")};
`;
