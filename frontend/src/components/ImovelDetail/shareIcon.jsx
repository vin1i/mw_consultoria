// import React from "react";
// import { toast } from "react-toastify";
// import { FaShareAlt } from "react-icons/fa";

// // Função para verificar se o dispositivo é móvel
// const isMobile = () => {
//   return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
// };

// const ShareIcon = ({ link, title, description, image }) => {
//     const copyLink = () => {
//         // ... (verificação do dispositivo e da API de compartilhamento)
      
//         const shareData = {
//           title: title || "Compartilhar Imóvel",
//           text: `${title} - ${description}`,
//           url: link,
//         };
      
//         // Verificar se a imagem está presente e incluir no compartilhamento
//         if (image) {
//           fetch(image)
//             .then((response) => response.blob())
//             .then((imageBlob) => {
//               const imageFile = new File([imageBlob], "image.jpg", { type: "image/jpeg" });
//               shareData.files = [imageFile];
      
//               navigator.share(shareData)
//                 .then(() => {
//                   toast.success("Link compartilhado com sucesso!");
//                 })
//                 .catch((error) => {
//                   console.error("Erro ao compartilhar com imagem:", error);
//                   // Tentar compartilhar apenas o texto
//                   delete shareData.files;
//                   navigator.share({
//                     title: shareData.title,
//                     text: shareData.text,
//                     url: shareData.url,
//                   })
//                   .then(() => {
//                     toast.success("Link compartilhado com sucesso (sem imagem).");
//                   })
//                   .catch((error) => {
//                     toast.error("Falha ao compartilhar o link. Tente novamente.");
//                     console.error("Erro ao compartilhar sem imagem:", error);
//                   });
//                 });
//             })
//             .catch((error) => {
//               console.error("Erro ao buscar a imagem:", error);
//               // Compartilhar apenas o texto se houver erro ao buscar a imagem
//               navigator.share({
//                 title: shareData.title,
//                 text: shareData.text,
//                 url: shareData.url,
//               })
//               .then(() => {
//                 toast.success("Link compartilhado com sucesso (sem imagem).");
//               })
//               .catch((error) => {
//                 toast.error("Falha ao compartilhar o link. Tente novamente.");
//                 console.error("Erro ao compartilhar sem imagem:", error);
//               });
//             });
//         } else {
//       // Caso o navegador não suporte a API de compartilhamento, apenas copia o link
//       navigator.clipboard.writeText(link)
//         .then(() => {
//           toast.success("Link copiado com sucesso!");
//         })
//         .catch(() => {
//           toast.error("Falha ao copiar o link. Tente novamente.");
//         });
//     }
//   };

//   return (
//     <button
//       onClick={(e) => {
//         e.preventDefault(); // Prevenir qualquer comportamento padrão que possa estar interferindo
//         copyLink();
//       }}
//       style={{
//         background: "none",
//         border: "none",
//         cursor: "pointer",
//         color: "#555",
//         fontSize: "20px",
//         marginLeft: "10px",
//         marginTop: "5px",
//       }}
//       aria-label="Compartilhar"
//       title="Compartilhar"
//     >
//       <FaShareAlt />
//     </button>
//   );
// };

// export default ShareIcon;
import React from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import { FaFacebook, FaWhatsapp, FaTwitter } from "react-icons/fa";

const ShareIcon = ({ link }) => {
  return (
    <div style={{ display: "flex", gap: "10px", marginLeft: "10px" }}>
      <FacebookShareButton url={link} hashtag="#Imoveis">
        <FaFacebook size={24} color="#3b5998" />
      </FacebookShareButton>

      <WhatsappShareButton url={link} separator=" - ">
        <FaWhatsapp size={24} color="#25d366" />
      </WhatsappShareButton>

      <TwitterShareButton url={link} via="MWConsultoria" hashtags={["Imoveis", "Consultoria"]}>
        <FaTwitter size={24} color="#1da1f2" />
      </TwitterShareButton>
    </div>
  );
};

export default ShareIcon;
