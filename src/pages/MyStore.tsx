import { Link } from "react-router-dom";
import styled from "styled-components";
import noimage from "../components/imgs/noimage.jpg";

const Container = styled.div`
  padding: 0 200px 100px 200px;

  h2 {
    margin: 30px 0 20px 10px;
    font-size: 30px;
    font-weight: bold;
  }
`;

const Bookgrid = styled.div`
  width: 100%;
  height: 900px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
`;

const Contents = styled.div`
  height: 380px;
  padding: 10px;

  img {
    width: 100%;
    height: 340px;
    object-fit: cover;
  }

  h3 {
    font-size: 16px;
    margin-top: 10px;
  }

  h4 {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 10px;
  }
`;

const MyStore = () => {
  return (
    <Container>
      <h2>내서점</h2>
      <Bookgrid>
        <Link to="/detail">
          <Contents>
            <img src={noimage} alt={"책 이미지"} />
            <h3>Title</h3>
            <h4>지음</h4>
          </Contents>
        </Link>
      </Bookgrid>
    </Container>
  );
};

export default MyStore;
