import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

const CustomScrollbar = ({ children, style }) => {
  return (
    <Scrollbars
      autoHide
      autoHideTimeout={500}
      autoHideDuration={200}
      style={{
        ...style,
        overflow: "hidden", // Garante que o scroll padrão não apareça
      }}
      renderThumbVertical={(props) => (
        <div
          {...props}
          style={{
            backgroundColor: "#9c192b", // Vermelho para o thumb
            borderRadius: "50px",
            width: "8px",
          }}
        />
      )}
      renderTrackVertical={(props) => (
        <div
          {...props}
          style={{
            right: "2px",
            bottom: "2px",
            top: "2px",
            borderRadius: "50px",
            backgroundColor: "transparent", // Fundo transparente
          }}
        />
      )}
    >
      {children}
    </Scrollbars>
  );
};

export default CustomScrollbar;