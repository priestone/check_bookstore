import { Helmet } from "react-helmet";
import styled from "styled-components";
import logo from "../components/imgs/logo.svg";
import { Link } from "react-router-dom";

const Container = styled.div`
  h2 {
    font-size: 40px;
    font-weight: bold;
    margin-top: 50px;
  }
`;

const LoginWrap = styled.div`
  width: 500px;
  height: 600px;
  margin: 0px auto;
  /* background-color: salmon; */
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const Logo = styled.div`
  width: 200px;
  margin-top: 50px;
`;

const InputWrap = styled.form`
  width: 90%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
`;

const IdWrap = styled.input`
  all: unset;
  width: 90%;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  background-color: white;
  padding: 0 10px;
`;

const PasswordWrap = styled.input`
  all: unset;
  width: 90%;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  background-color: white;
  padding: 0 10px;
  margin-top: 10px;
`;

const LoginButton = styled.button`
  all: unset;
  width: 90%;
  height: 50px;
  border-radius: 4px;
  background-color: #1086e7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 22px;
  padding: 0 10px;
  margin-top: 50px;
  cursor: pointer;
`;

const Bar = styled.div`
  width: 90%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const SignUpWrap = styled.div``;

const SignUp = () => {
  return (
    <Container>
      <Helmet>
        <title>로그인</title>
        <meta
          name="description"
          content="책을 찾고 관리할 수 있는 Check입니다."
        />
      </Helmet>
      <LoginWrap>
        <h2>회원가입</h2>
        <InputWrap>
          <IdWrap placeholder="아이디를 입력해주세요"></IdWrap>
          <PasswordWrap placeholder="비밀번호를 입력해주세요"></PasswordWrap>
          <LoginButton>회원가입</LoginButton>
        </InputWrap>
        <Bar></Bar>
        <Link to={"/login"}>
          <SignUpWrap>로그인</SignUpWrap>
        </Link>
      </LoginWrap>
    </Container>
  );
};

export default SignUp;
