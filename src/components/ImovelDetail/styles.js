import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: var(--white);
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px;
    margin: 10px;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

export const ContentContainer = styled.div`
  display: flex;
  margin: 0 20px 20px 20px;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;

  h1,
  p,
  div {
    margin: 0;
  }

  @media (max-width: 768px) {
    gap: 12px;
    padding-top: 10px;
  }
`;

export const Title = styled.h1`
  font-size: 22px;
  font-weight: bold;
  color: var(--black);
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 5px;
  }
`;

export const Address = styled.p`
  font-size: 18px;
  color: var(--red);

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;

  p {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-size: 16px;
  }

  svg {
    color: var(--red);
    flex-shrink: 0;
  }

  p:nth-child(odd) {
    grid-column: 1;
  }

  p:nth-child(even) {
    grid-column: 2;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 10px 0;

  .price-container {
    display: flex;
    align-items: flex-end;
    gap: 10px;
  }

  .price-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;

    .label {
      font-size: 12px;
      color: var(--black);
      text-transform: uppercase;
      margin-bottom: 2px;
    }

    .value {
      font-size: 18px;
      font-weight: bold;
      color: var(--black);
      line-height: 1;
    }

    &.highlight {
      .label {
        font-size: 12px;
        color: #757575;
        text-transform: uppercase;
      }

      .value {
        font-size: 40px;
        color: var(--red);
      }
    }

    .value,
    &.highlight .value {
      align-self: flex-end;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;

    .price-container {
      flex-direction: column;
      align-items: flex-start;
    }

    .price-item {
      align-items: flex-start;
      .value {
        font-size: 18px;
      }

      &.highlight .value {
        font-size: 30px;
      }
    }
  }
`;

export const CarouselWrapper = styled.div`
  width: 100%;
  border-radius: 15px;
  position: relative;
  margin-bottom: 15px;

  .slick-list {
    border-radius: 15px;
    overflow: hidden;
  }

  img {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
  }

  iframe {
    width: 100%;
    height: 400px;
    border-radius: 15px;
  }

  .slick-dots {
    position: absolute;
    bottom: 8px;
    width: 100%;
    display: flex;
    justify-content: center;
    overflow-x: auto;
    gap: 8px;
    list-style: none;
    padding: 0 10px;
  }

  .slick-dots li {
    margin: 0;
    flex-shrink: 0;
  }

  .slick-dots li button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--grey);
    border: none;
    transition: background-color 0.3s ease;
    font-size: 0;
    line-height: 0;
  }

  .slick-dots::-webkit-scrollbar {
    display: none;
  }

  .slick-dots li button::before {
    content: none;
  }

  .slick-dots li.slick-active button {
    background-color: var(--red);
  }

  .slick-dots li button:hover {
    background-color: var(--red);
  }

  @media (max-width: 768px) {
    img {
      max-height: 250px;
    }
    iframe {
      height: 250px;
    }
    .slick-dots {
      bottom: 5px;
      padding: 0 5px;
    }
  }
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  margin: 8px 0;
  white-space: pre-wrap;

  @media (max-width: 768px) {
    font-size: 13px;
    margin: 6px 0;
  }
`;

export const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  background-color: ${({ status }) =>
    status === "Disponível"
      ? "rgba(76, 175, 80, 0.2)"
      : status === "Indisponível"
      ? "rgba(244, 67, 54, 0.2)"
      : "rgba(158, 158, 158, 0.2)"};
  color: ${({ status }) =>
    status === "Disponível"
      ? "green"
      : status === "Indisponível"
      ? "red"
      : "gray"};
  font-weight: bold;
  font-size: 1rem;
`;

export const WhatsAppButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--red);
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  width: fit-content;

  &:hover {
    background-color: var(--dark-red);
  }

  svg {
    margin-left: 10px;
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 15px;

    svg {
      font-size: 18px;
    }
  }
`;
