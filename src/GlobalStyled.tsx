import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyled = createGlobalStyle`

${reset}

body{
    color:#1d1d1d;
    font-family: "Noto Sans KR", serif;
}

img{
    width:100%;
    display:block;
}

a{
    text-decoration:none;
    color:black;
    display:block;
}
`;
