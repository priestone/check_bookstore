import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import styled from "styled-components";
import { Book, getBooks } from "../api";
import Banner from "../components/Banner";

const Container = styled.div`
  height: 100vh;
  padding: 0 200px 100px 200px;
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

  return (
    <Container>
      <Banner />
      haha
    </Container>
  );
};

export default Home;
