import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getBooks } from "../api";
import Loading from "./Loading";

const Container = styled.div`
  width: 100%;
  height: 700px;
  background-color: bisque;
  position: relative;

  @media screen and (max-width: 768px) {
    height: 600px;
  }

  @media screen and (max-width: 480px) {
    height: 400px;
  }
`;

const TextArea = styled.div`
  position: absolute;
  left: 5%;
  bottom: 30%;
  z-index: 10;
  font-weight: 800;

  h3 {
    font-size: 60px;
  }

  h4 {
    font-size: 80px;
  }

  @media screen and (max-width: 1200px) {
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);

    h4 {
      width: 400px;
    }
  }

  @media screen and (max-width: 480px) {
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);

    h3 {
      font-size: 46px;
      width: 130px;
    }

    h4 {
      font-size: 40px;
      width: 190px;
    }
  }
`;
const ImgArea = styled.div`
  position: absolute;
  right: 10%;
  top: 50%;
  /* width: 700px; */
  gap: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: translateY(-50%);
  z-index: 9;

  @media screen and (max-width: 1600px) {
    right: 50px;
  }

  @media screen and (max-width: 1200px) {
    top: 5%;
    right: 50%;
    transform: translateX(50%);
  }
`;

const BookImg = styled.div`
  width: 340px;
  height: 474px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 1600px) {
    width: 240px;
    height: 335px;
  }

  @media screen and (max-width: 768px) {
    width: 180px;
    height: 251px;
  }

  @media screen and (max-width: 480px) {
    width: 130px;
    height: 180px;
  }
`;
const Banner = () => {
  const {
    data: items,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
    select: (data) => data.response?.body?.items?.item || [],
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error occurred!</div>;

  const BannerImages = items.filter(
    (item: any) => item.IMAGE && item.IMAGE.trim() !== ""
  );

  const twoImages = BannerImages.slice(0, 2);

  return (
    <Container>
      <TextArea>
        <h3>금주의</h3>
        <h4>HOT Pick</h4>
      </TextArea>
      <ImgArea>
        {twoImages.length > 0 ? (
          twoImages.map((item: any, index: number) => (
            <BookImg key={index}>
              <img src={item.IMAGE} alt={`배너 이미지 ${index + 1}`} />
            </BookImg>
          ))
        ) : (
          <Loading />
        )}
      </ImgArea>
    </Container>
  );
};

export default Banner;
