import styled from "styled-components";
import logo from "./imgs/logo.svg";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 100px;
  padding: 20px 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const Logo = styled.div`
  width: 135px;
`;

const SearchWrap = styled.div``;

const Search = styled.input`
  all: unset;
  width: 400px;
  height: 30px;
  border-radius: 4px;
  border: 2px solid #239cff;
  padding: 5px;
`;

const MenuWrap = styled.ul`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Menu = styled.li`
  font-size: 18px;
`;

const Header = () => {
  return (
    <Container>
      <Link to={"/"}>
        <Logo>
          <img src={logo} alt="로고이미지" />
        </Logo>
      </Link>

      <SearchWrap>
        <Search></Search>
      </SearchWrap>
      <MenuWrap>
        <Link to={"/booklist"}>
          <Menu>책목록</Menu>
        </Link>
        <Link to={"/mystore"}>
          <Menu>내서점</Menu>
        </Link>
        <Link to={"/login"}>
          <Menu>로그인</Menu>
        </Link>
      </MenuWrap>
    </Container>
  );
};

export default Header;
