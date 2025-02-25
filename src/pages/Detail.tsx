import { useLocation } from "react-router-dom";
import styled from "styled-components";
import noimage from "../components/imgs/noimage.jpg";
import { useState } from "react";

const Container = styled.div`
  padding: 0 200px 100px 200px;
`;

const DetailWrap = styled.div`
  width: 100%;
  height: 600px;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const BookImg = styled.div`
  height: 100%;
  overflow: hidden;
  background-color: salmon;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TextWrap = styled.div`
  width: 46%;
  height: 100%;
  /* background-color: lightblue; */
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;

  h2 {
    font-size: 30px;
  }

  h3 {
    font-size: 16px;
    margin-bottom: 10px;
    opacity: 0.7;
  }

  p {
    font-size: 16px;
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: 20px;
  }
`;

const SaveInput = styled.input`
  all: unset;
  width: 200px;
  height: 20px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 5px;
`;

const SaveButton = styled.div`
  width: 236px;
  height: 50px;
  background-color: lightgreen;
  border-radius: 4px;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  margin: 0 auto;
`;

const Detail = () => {
  const location = useLocation();
  const { book } = location.state || {};

  const [editedTitle, setEditedTitle] = useState(book.TITLE || "");
  const [salePrice, setSalePrice] = useState("");
  const [saleQuantity, setSaleQuantity] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [discountStart, setDiscountStart] = useState("");
  const [discountEnd, setDiscountEnd] = useState("");

  if (!book) {
    return (
      <Container>
        <h2>잘못된 접근입니다. 올바른 경로로 접근해 주세요.</h2>
      </Container>
    );
  }

  const handleSave = () => {
    const savedBook = {
      ...book,
      editedTitle,
      salePrice,
      saleQuantity,
      discountRate,
      discountStart,
      discountEnd,
    };

    const existing = localStorage.getItem("mystore");
    let storeArray = [];
    if (existing) {
      try {
        storeArray = JSON.parse(existing);
      } catch (error) {
        storeArray = [];
      }
    }

    storeArray.push(savedBook);
    localStorage.setItem("mystore", JSON.stringify(storeArray));
    alert("내 서점에 저장되었습니다!");
  };

  return (
    <Container>
      <DetailWrap>
        <BookImg>
          <img src={book.IMAGE ? book.IMAGE : noimage} alt={book.TITLE} />
        </BookImg>
        <TextWrap>
          <h2>{book.TITLE}</h2>
          <Bar />
          <h3>{`${book.AUTHOR} | ${book.PUBLISHER}`}</h3>
          <h3>출간년도 : {book.PUBLISH_YEAR}년</h3>
          <Bar />
          <p>
            정가 <span>14,000 원</span>
          </p>
          <Bar />
          <SaveBox>
            <p>책 편집</p>
            <SaveOption>
              <p>도서명</p>
              <SaveInput
                placeholder="책 제목을 적어주세요"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              ></SaveInput>
            </SaveOption>
            <SaveOption>
              <p>판매가격</p>
              <SaveInput
                placeholder="판매 가격을 적어주세요"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              ></SaveInput>
            </SaveOption>
            <SaveOption>
              <p>판매수량</p>
              <SaveInput
                placeholder="판매 수량을 적어주세요"
                value={saleQuantity}
                onChange={(e) => setSaleQuantity(e.target.value)}
              ></SaveInput>
            </SaveOption>
            <SaveOption>
              <p>할인율(%)</p>
              <SaveInput
                placeholder="퍼센트는 생략해주세요"
                value={discountRate}
                onChange={(e) => setDiscountRate(e.target.value)}
              ></SaveInput>
            </SaveOption>
            <SaveOption>
              <p>할인기간</p>
              <SaveInput
                type="date"
                value={discountStart}
                onChange={(e) => setDiscountStart(e.target.value)}
              ></SaveInput>
              ~
              <SaveInput
                type="date"
                value={discountEnd}
                onChange={(e) => setDiscountEnd(e.target.value)}
              ></SaveInput>
            </SaveOption>
            <SaveButton onClick={handleSave}>내서점에 담기</SaveButton>
          </SaveBox>
        </TextWrap>
      </DetailWrap>
    </Container>
  );
};

export default Detail;
