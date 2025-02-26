import axios from "axios";

const options = axios.create({
  baseURL: "https://apis.data.go.kr/6270000/dgsmartlib",
  params: {
    servicekey:
      "C+SiwDIWt9bJ0RfedaXFXWOyA1G0PAnZpt4nZkJjBrXjNpXM6wXK1+Myp4oeKKS9wFJACGkcjrqdgXqaW935gw==",
    pageNo: 1,
    numOfRows: 100,
    code: "AH17",
  },
});

export const getBooks = () =>
  options.get("bestBookList").then((res) => res.data);
