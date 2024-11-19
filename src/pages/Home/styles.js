import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  padding: 16px;
`;

export const Header = styled.div`
  text-align: center;
  margin-top: 16px;
  h2 {
    font-size: 1.8em;
    color: var(--black);
  }
`;

export const ImoveisSection = styled.section`
  padding: 24px;
  background-color: var(--white);
  h2 {
    text-align: center;
    font-size: 2em;
    color: var(--black);
    margin-bottom: 16px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;
