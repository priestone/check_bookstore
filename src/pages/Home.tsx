import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import styled from "styled-components";
import { Book, getBooks } from "../api";
import Banner from "../components/Banner";
import noimage from "../components/imgs/noimage.jpg";

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
  /* background-color: green; */
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

const Books = styled.div``;

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred!</div>;

  const BooksImages = items.filter(
    (item: any) => item.IMAGE && item.IMAGE.trim() !== ""
  );

  const tenItems = (BooksImages || []).slice(0, 10);

  return (
    <Container>
      <Banner></Banner>
      <h2>HOT Pick</h2>
      <Bookgrid>
        {tenItems.map((item: any, index: number) => (
          <Contents key={index}>
            <img
              src={item.IMAGE ? item.IMAGE : noimage}
              alt={item.TITLE || "책 이미지"}
            />
            <h3>{item.TITLE || "Title"}</h3>
            <h4>{`${item.AUTHOR} | ${item.PUBLISHER}`}</h4>
          </Contents>
        ))}
      </Bookgrid>
    </Container>
  );
};

export default Home;
