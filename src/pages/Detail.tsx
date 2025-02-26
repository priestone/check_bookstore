import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import noimage from "../components/imgs/noimage.jpg";
import { useState } from "react";
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
  margin-top: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: space-between;
  flex-direction: column;

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
  height: 20px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 5px;
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

const UnitLabel = styled.h5`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  /* color: rgba(0, 0, 0, 0.6); */
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const SaveButton = styled.button`
  all: unset;
  width: 236px;
  height: 50px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "lightgreen")};
  color: ${(props) => (props.disabled ? "rgba(0,0,0,0.5)" : "black")};
  border-radius: 4px;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  margin: 0 auto;
`;

const Detail = () => {
  const location = useLocation();
  const { book } = location.state || {};
  const navigate = useNavigate();

  const [editedTitle, setEditedTitle] = useState(book.TITLE || "");
  const [salePrice, setSalePrice] = useState("");
  const [saleQuantity, setSaleQuantity] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [discountStart, setDiscountStart] = useState("");
  const [discountEnd, setDiscountEnd] = useState("");
  const [discountRateError, setDiscountRateError] = useState("");
  const [discountPeriodError, setDiscountPeriodError] = useState("");
  const [inputError, setInputError] = useState("");

  if (!book) {
    return (
      <Container>
        <h2>잘못된 접근입니다. 올바른 경로로 접근해 주세요.</h2>
      </Container>
    );
  }

  const handleSave = () => {
    if (!editedTitle.trim() || !salePrice.trim() || !saleQuantity.trim()) {
      setInputError("도서명, 판매가격, 판매수량을 모두 입력해주세요.");
      return;
    }
    if (Number(discountRate) > 0 && Number(discountRate) < 100) {
      if (!discountStart || !discountEnd) {
        setDiscountPeriodError("할인기간을 입력해주세요.");
        return;
      }
    }

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
    navigate("/mystore");
  };

  const isSaveDisabled =
    !editedTitle.trim() || !salePrice.trim() || !saleQuantity.trim();

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
          <p>
            정가 <span>14,000 원</span>
          </p>
          <Bar />
          <SaveBox>
            <h4>책 편집</h4>
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
              <InputWithUnitWrapper>
                <InputWithUnit
                  type="number"
                  placeholder="숫자만 입력하세요"
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
                  placeholder="숫자만 입력하세요"
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
                  placeholder="숫자만 입력하세요"
                  value={discountRate}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDiscountRate(value);
                    const num = Number(value);
                    if (value && (num <= 0 || num >= 100)) {
                      setDiscountRateError(
                        "할인율은 0보다 크고 100보다 작아야 합니다."
                      );
                    } else {
                      setDiscountRateError("");
                    }
                  }}
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
              ></SaveInput>
              ~
              <SaveInput
                type="date"
                value={discountEnd}
                onChange={(e) => setDiscountEnd(e.target.value)}
              ></SaveInput>
            </SaveOption>
            {discountPeriodError && (
              <ErrorMessage>{discountPeriodError}</ErrorMessage>
            )}
            <SaveButton onClick={handleSave} disabled={isSaveDisabled}>
              내서점에 담기
            </SaveButton>
          </SaveBox>
        </TextWrap>
      </DetailWrap>
    </Container>
  );
};

export default Detail;
