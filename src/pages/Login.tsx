import { Helmet } from "react-helmet";
import styled from "styled-components";

const Container = styled.div``;

const Login = () => {
  return (
    <Container>
      <Helmet>
        <title>로그인</title>
        <meta
          name="description"
          content="책을 찾고 관리할 수 있는 Check입니다."
        />
      </Helmet>
    </Container>
  );
};

export default Login;
