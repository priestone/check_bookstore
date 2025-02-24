import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import styled from "styled-components";
import { Book, getBooks } from "../api";

const Container = styled.div``;

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

  return <Container>홈입니다.</Container>;
};

export default Home;
