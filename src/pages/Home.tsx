import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getBooks } from "../api";
import Banner from "../components/Banner";
import noimage from "../components/imgs/noimage.jpg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loading from "../components/Loading";

const Container = styled.div`
  padding: 0 200px 100px 200px;

  h2 {
    margin: 100px 0 20px 0;
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

const Home = () => {
  const {
    data: items,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
    select: (data) => data.response?.body?.items?.item || [],
  });

  console.log(items);

  if (isLoading) return <Loading />;
  if (error) return <div>Error occurred!</div>;

  const BooksImages: Book[] = items.filter(
    (book: Book) => book.IMAGE && book.IMAGE.trim() !== ""
  );

  const tenItems = (BooksImages || []).slice(0, 10);

  return (
    <Container>
      <Banner></Banner>
      <Helmet>
        <title>Home | Check</title>
        <meta
          name="description"
          content="책을 찾고 관리할 수 있는 Check입니다."
        />
      </Helmet>
      <h2>HOT Pick</h2>
      <Bookgrid>
        {tenItems.map((book: Book, index: number) => (
          <Link to="/detail" key={index} state={{ book }}>
            <Contents>
              <img
                src={book.IMAGE ? book.IMAGE : noimage}
                alt={book.TITLE || "책 이미지"}
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
    </Container>
  );
};

export default Home;
