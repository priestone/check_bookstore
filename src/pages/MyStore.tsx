import { Link } from "react-router-dom";
import styled from "styled-components";
import noimage from "../components/imgs/noimage.jpg";
import { useEffect, useState } from "react";

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
  a {
    height: 380px;
  }
`;

const Contents = styled.div`
  height: 380px;
  padding: 10px;

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  h3 {
    font-size: 16px;
    margin-top: 10px;
  }

  h4 {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 10px;
  }

  P {
    font-size: 14px;
    margin-top: 10px;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
`;

const DiscountPrice = styled.span`
  font-size: 14px;
  color: black;
  font-weight: bold;
`;

const OriginalPrice = styled.span`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  text-decoration: line-through;
`;

const DiscountRate = styled.span`
  font-size: 12px;
  color: red;
`;

const MyStore = () => {
  const [storeBooks, setStoreBooks] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("mystore");
    if (stored) {
      try {
        setStoreBooks(JSON.parse(stored));
      } catch (error) {
        console.error("로컬스토리지 파싱 오류:", error);
      }
    }
  }, []);

  return (
    <Container>
      <h2>내서점</h2>
      <Bookgrid>
        {storeBooks.length > 0 ? (
          storeBooks.map((book, index) => {
            const cleanSalePrice = Number(
              book.salePrice.toString().replace(/[^0-9]/g, "")
            );
            const cleanDiscountRate = Number(
              book.discountRate.toString().replace(/[^0-9]/g, "")
            );

            const discountedPrice =
              cleanSalePrice - (cleanSalePrice * cleanDiscountRate) / 100;
            return (
              <Link to="/detail" key={index} state={{ book }}>
                <Contents>
                  <img
                    src={book.IMAGE ? book.IMAGE : noimage}
                    alt={book.TITLE}
                  />
                  <h3>{book.editedTitle || book.TITLE}</h3>
                  {book.discountRate ? (
                    <PriceContainer>
                      <DiscountPrice>
                        {discountedPrice.toLocaleString()}원
                      </DiscountPrice>
                      <OriginalPrice>
                        {Number(book.salePrice).toLocaleString()}원
                      </OriginalPrice>
                      <DiscountRate>{book.discountRate}%</DiscountRate>
                    </PriceContainer>
                  ) : (
                    <div
                      style={{
                        fontSize: "14px",
                        color: "black",
                        marginTop: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      {Number(book.salePrice).toLocaleString()}원
                    </div>
                  )}
                  <p>판매수량: 0 / {book.saleQuantity}</p>
                  <p>
                    {book.discountStart
                      ? `할인기간 : ${book.discountStart} ~ ${book.discountEnd}`
                      : `할인상품이 아닙니다.`}
                  </p>
                </Contents>
              </Link>
            );
          })
        ) : (
          <p>저장된 책이 없습니다.</p>
        )}
      </Bookgrid>
    </Container>
  );
};

export default MyStore;
