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
    font-size: 16px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 10px;
  }

  P {
    font-size: 12px;
    margin-top: 10px;
  }
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
          storeBooks.map((book, index) => (
            <Link to="/detail" key={index} state={{ book }}>
              <Contents>
                <img src={book.IMAGE ? book.IMAGE : noimage} alt={book.TITLE} />
                <h3>{book.editedTitle || book.TITLE}</h3>
                <h4>
                  {book.salePrice ? `${book.salePrice}원` : "가격 정보 없음"}
                </h4>
                <p>판매수량: {book.saleQuantity || "정보 없음"}</p>
                <p>
                  할인기간: {book.discountStart || "-"} ~{" "}
                  {book.discountEnd || "-"}
                </p>
              </Contents>
            </Link>
          ))
        ) : (
          <p>저장된 책이 없습니다.</p>
        )}
      </Bookgrid>
    </Container>
  );
};

export default MyStore;
