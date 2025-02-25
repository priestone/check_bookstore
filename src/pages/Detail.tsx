import styled from "styled-components";

const Container = styled.div`
  padding: 0 200px 100px 200px;
`;

const DetailWrap = styled.div`
  width: 100%;
  height: 600px;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const BookImg = styled.div`
  width: 50%;
  height: 100%;
  background-color: salmon;
`;

const TextWrap = styled.div`
  width: 50%;
  height: 100%;
  background-color: lightblue;
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;

  h2 {
    font-size: 40px;
  }

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  p {
    font-size: 20px;
  }

  span {
    margin-left: 50px;
    color: red;
  }
`;

const Bar = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.3);
  margin: 10px 0;
`;

const SaveBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: space-between;
  flex-direction: column;
`;

const SaveOption = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SaveInput = styled.input`
  all: unset;
  width: 236px;
  height: 20px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 5px;
`;

const SaveButton = styled.div`
  width: 236px;
  height: 50px;
  background-color: lightcoral;
  border-radius: 4px;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  margin: 0 auto;
`;

const Detail = () => {
  return (
    <Container>
      <DetailWrap>
        <BookImg></BookImg>
        <TextWrap>
          <h2>불편한 편의점</h2>
          <Bar />
          <h3>김호연 지음 | 나무옆의자</h3>
          <h3>출간년도 : 2024</h3>
          <Bar />
          <p>
            판매가 <span>14,000 원</span>
          </p>
          <Bar />
          <SaveBox>
            <SaveOption>
              <p>도서명</p>
              <SaveInput></SaveInput>
            </SaveOption>
            <SaveOption>
              <p>판매가격</p>
              <SaveInput></SaveInput>
            </SaveOption>
            <SaveOption>
              <p>판매수량</p>
              <SaveInput></SaveInput>
            </SaveOption>
            <SaveOption>
              <p>할인율</p>
              <SaveInput></SaveInput>
            </SaveOption>
            <SaveOption>
              <p>할인기간</p>
              <SaveInput></SaveInput>
            </SaveOption>
            <SaveButton>내 서점에 담기</SaveButton>
          </SaveBox>
        </TextWrap>
      </DetailWrap>
    </Container>
  );
};

export default Detail;
