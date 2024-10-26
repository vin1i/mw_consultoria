import styled from "styled-components";
import BannerHome from "../../assets/BannerHome.png";

export const Container = styled.div`
  padding: 25px 150px;
  position: relative;
  background-image: url(${BannerHome});
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Text = styled.div`
  font-size: 30px;
  background-color: rgba(156, 25, 43, 0.75);
  color: var(--white);
  padding: 30px 20px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  width: 70%;
  max-width: 55%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Divider = styled.div`
  width: 80%;
  height: 2px;
  background-color: var(--white);
  margin: 5px 0;
`;

