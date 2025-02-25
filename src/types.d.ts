declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

interface Book {
  BOOK_KEY: string;
  TITLE: string;
  IMAGE: string;
  AUTHOR: string;
  PUBLISHER: string;
  PUBLISH_YEAR: string;
}
