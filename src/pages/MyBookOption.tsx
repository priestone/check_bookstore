import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import noimage from "../components/imgs/noimage.jpg";
import { Helmet } from "react-helmet";

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
`;

const Bar = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.3);
  margin: 10px 0;
`;

const SaveBox = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;

  h4 {
    font-size: 20px;
    font-weight: 600;
  }
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
  height: 25px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 5px;
  border-radius: 4px;
`;

const InputWithUnitWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const InputWithUnit = styled(SaveInput)`
  padding-right: 30px;

  /* Chrome, Safari, Edge, Opera에서 스피너 제거 */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const UnitLabel = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 50px;
`;

const SaveButton = styled.button`
  width: 200px;
  height: 45px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "lightgreen")};
  color: ${(props) => (props.disabled ? "rgba(0,0,0,0.5)" : "black")};
  border-radius: 4px;
  font-size: 16px;
  text-align: center;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const MyBookOption = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};

  const [editedTitle, setEditedTitle] = useState(
    book.editedTitle || book.TITLE
  );
  const [salePrice, setSalePrice] = useState(book.salePrice || "");
  const [saleQuantity, setSaleQuantity] = useState(book.saleQuantity || "");
  const [discountRate, setDiscountRate] = useState(
    book.discountRate ? String(book.discountRate) : ""
  );
  const [discountStart, setDiscountStart] = useState(book.discountStart || "");
  const [discountEnd, setDiscountEnd] = useState(book.discountEnd || "");

  if (!book) {
    return (
      <Container>
        <h2>잘못된 접근입니다. 올바른 경로로 접근해 주세요.</h2>
      </Container>
    );
  }

  const isSaveDisabled =
    !editedTitle.trim() || !salePrice.trim() || !saleQuantity.trim();

  const handleUpdate = () => {
    if (isSaveDisabled)
      return alert("도서명, 판매가격, 판매수량을 모두 입력해주세요.");

    const stored = localStorage.getItem("mystore");
    if (!stored) return;

    let storeArray = JSON.parse(stored);
    storeArray = storeArray.map((item: Book) =>
      item.TITLE === book.TITLE
        ? {
            ...item,
            editedTitle,
            salePrice,
            saleQuantity,
            discountRate,
            discountStart,
            discountEnd,
          }
        : item
    );

    localStorage.setItem("mystore", JSON.stringify(storeArray));
    alert("책 정보가 수정되었습니다!");
    navigate("/mystore");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("정말로 이 책을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    const stored = localStorage.getItem("mystore");
    if (!stored) return;

    let storeArray = JSON.parse(stored);
    storeArray = storeArray.filter((item: Book) => item.TITLE !== book.TITLE);

    localStorage.setItem("mystore", JSON.stringify(storeArray));
    alert("책이 삭제되었습니다!");
    navigate("/mystore");
  };

  return (
    <Container>
      <Helmet>
        <title>{book.TITLE}</title>
        <meta
          name="description"
          content="책을 찾고 관리할 수 있는 Check입니다."
        />
      </Helmet>
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
          <SaveBox>
            <h4>책 정보 수정</h4>
            <SaveOption>
              <p>도서명</p>
              <SaveInput
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </SaveOption>
            <SaveOption>
              <p>판매가격</p>
              <InputWithUnitWrapper>
                <InputWithUnit
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                />
                <UnitLabel>원</UnitLabel>
              </InputWithUnitWrapper>
            </SaveOption>
            <SaveOption>
              <p>판매수량</p>
              <InputWithUnitWrapper>
                <InputWithUnit
                  type="number"
                  value={saleQuantity}
                  onChange={(e) => setSaleQuantity(e.target.value)}
                />
                <UnitLabel>개</UnitLabel>
              </InputWithUnitWrapper>
            </SaveOption>
            <SaveOption>
              <p>할인율(%)</p>
              <InputWithUnitWrapper>
                <InputWithUnit
                  type="number"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(e.target.value)}
                  min={1}
                  max={99}
                />
                <UnitLabel>%</UnitLabel>
              </InputWithUnitWrapper>
            </SaveOption>
            <SaveOption>
              <p>할인기간</p>
              <SaveInput
                type="date"
                value={discountStart}
                onChange={(e) => setDiscountStart(e.target.value)}
              />
              ~
              <SaveInput
                type="date"
                value={discountEnd}
                onChange={(e) => setDiscountEnd(e.target.value)}
              />
            </SaveOption>
            <ButtonWrap>
              <SaveButton onClick={handleUpdate} disabled={isSaveDisabled}>
                수정하기
              </SaveButton>
              <SaveButton
                onClick={handleDelete}
                style={{ backgroundColor: "red", color: "white" }}
              >
                삭제하기
              </SaveButton>
            </ButtonWrap>
          </SaveBox>
        </TextWrap>
      </DetailWrap>
    </Container>
  );
};

export default MyBookOption;
