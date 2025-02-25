import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getBooks } from "../api";
import noimage from "../components/imgs/noimage.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link, useLocation } from "react-router-dom";

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

const StyledSwiper = styled(Swiper)`
  position: relative;

  .swiper-button-prev,
  .swiper-button-next {
    color: #239cff !important;
    display: block !important;
  }

  .swiper-button-prev::after {
    content: "<";
    font-size: 24px;
    font-family: Arial, sans-serif;
  }

  .swiper-button-next::after {
    content: ">";
    font-size: 24px;
    font-family: Arial, sans-serif;
  }

  .swiper-button-prev {
    left: 10px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    z-index: 900;
  }

  .swiper-button-next {
    right: 10px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    z-index: 10;
  }

  .swiper-pagination {
    bottom: 10px !important;
    .swiper-pagination-bullet {
      width: 16px !important;
      height: 16px !important;
      background-color: #239cff !important;
      opacity: 1 !important;
      margin: 0 6px !important;
    }
    .swiper-pagination-bullet-active {
      background-color: #ff6600 !important;
    }
  }
`;

const NavContainer = styled.div`
  position: absolute;
  width: 87%;
  transform: translate(-80px, -500px);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #239cff;
  cursor: pointer;
`;

const PaginationContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  .swiper-pagination-bullet {
    width: 20px !important;
    height: 20px !important;
    background-color: #cce2ff !important;
    opacity: 1 !important;
    margin: 0 6px !important;
  }
  .swiper-pagination-bullet-active {
    background-color: #239cff !important;
  }
`;

const BookList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  const {
    data: items,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
    select: (data) => data.response?.body?.items?.item || [],
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const books: Book[] = items;

  const filteredBooks = searchQuery
    ? books.filter(
        (book) =>
          book.TITLE.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.AUTHOR.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : books;

  const pages: Book[][] = [];
  for (let i = 0; i < filteredBooks.length; i += 10) {
    pages.push(filteredBooks.slice(i, i + 10));
  }

  let titleText = "책목록";
  if (searchQuery) {
    titleText =
      filteredBooks.length > 0
        ? `${searchQuery}에 대한 검색결과입니다.`
        : `${searchQuery}에 대한 검색결과가 존재하지 않습니다.`;
  }

  return (
    <Container>
      <h2>{titleText}</h2>
      <StyledSwiper
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        slidesPerView={1}
        spaceBetween={20}
        style={{ height: "auto", display: "block" }}
      >
        {pages.map((page, index) => (
          <SwiperSlide key={index}>
            <Bookgrid>
              {page.map((book: Book) => (
                <Link to={"/detail"}>
                  <Contents key={book.BOOK_KEY}>
                    <img
                      src={book.IMAGE ? book.IMAGE : noimage}
                      alt={book.TITLE}
                    />
                    <h3>
                      {book.TITLE.length > 20
                        ? book.TITLE.slice(0, 21) + "..."
                        : book.TITLE}
                    </h3>
                    <h4>{`${book.AUTHOR} | ${book.PUBLISHER}`}</h4>
                  </Contents>
                </Link>
              ))}
            </Bookgrid>
          </SwiperSlide>
        ))}
      </StyledSwiper>

      <NavContainer>
        <NavButton className="custom-prev">&lt;</NavButton>
        <NavButton className="custom-next">&gt;</NavButton>
      </NavContainer>
      <PaginationContainer className="custom-pagination" />
    </Container>
  );
};

export default BookList;
