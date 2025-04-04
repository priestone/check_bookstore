import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import BookList from "./pages/BookList";
import MyStore from "./pages/MyStore";
import Login from "./pages/Login";
import Header from "./components/Header";
import Detail from "./pages/Detail";
import MyBookOption from "./pages/MyBookOption";
import SignUp from "./pages/SignUp";

const Router = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/booklist" element={<BookList></BookList>}></Route>
        <Route path="/detail" element={<Detail></Detail>}></Route>
        <Route path="/mystore" element={<MyStore></MyStore>}></Route>
        <Route
          path="/mybookoption"
          element={<MyBookOption></MyBookOption>}
        ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </HashRouter>
  );
};

export default Router;
