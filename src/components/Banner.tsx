import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getBooks } from "../api";

const Container = styled.div`
  width: 100%;
  height: 700px;
  background-color: bisque;
  position: relative;
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
`;
const ImgArea = styled.div`
  position: absolute;
  right: 10%;
  top: 50%;
  width: 700px;
  gap: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: translateY(-50%);
  z-index: 9;
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

  if (isLoading) return <div>Loading...</div>;
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
          <div>No image available</div>
        )}
      </ImgArea>
    </Container>
  );
};

export default Banner;
