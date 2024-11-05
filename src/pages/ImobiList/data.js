// Importe as imagens diretamente
import Foto1 from "../../assets/Foto1.png";
import Foto2 from "../../assets/Foto2.png";
import MarisaWebberFoto from "../../assets/MarisaWebberFoto.png";

export const properties = [
  {
    id: 1,
    tipo: "Edifício Sunny Garden",
    descricao: `Descubra o conforto e a elegância desta cobertura de 114 m2 no coração do Brooklin. Com uma sala ampla equipada com lareira e varanda, este espaço é perfeito para momentos de descontração e convívio. A sala de jantar oferece um ambiente ideal para refeições em família. A cozinha, bem planejada, e a área de serviço proporcionam pra cidade no dia a dia. A cobertura dispõe de dois dormitórios, sendo uma suíte espaçosa, além de um banheiro social. Inclui uma vaga de garagem. O condomínio oferece uma série de comodidades para toda a família, incluindo playground para as crianças, salão de festas para celebrações especiais e salão de jogos para entretenimento.
      
Localizado em uma região privilegiada, o imóvel está próximo a importantes vias de acesso como a Av. Jornalista Roberto Marinho e a Av. Santo Amaro, além de uma ampla variedade de comércios, padarias, supermercados, bancos, igreja e colégios.

Aproveite a conveniência de viver em um bairro que oferece tudo o que você precisa ao seu alcance. Não perca esta oportunidade única!
    `,
    quartos: 2,
    banheiros: 2,
    suites: 1,
    vagas: 1,
    metrosQuadrados: 114,
    endereco: "Av Portugal, 401, Cidade Monções",
    valor: 1990000,
    thumb: Foto1,
    slug: "edificio-sunny-garden",
    imagens: [Foto1, Foto2, MarisaWebberFoto],
  },
  {
    id: 2,
    tipo: "Apartamento Moderno",
    descricao:
      "Apartamento moderno com boa ventilação e acabamentos de alta qualidade.",
    quartos: 2,
    banheiros: 1,
    suites: 0,
    vagas: 1,
    metrosQuadrados: 80,
    endereco: "Rua DEF, 456",
    valor: 300000,
    thumb: Foto2,
    slug: "apartamento-moderno",
  },
  {
    id: 3,
    tipo: "Casa Espetacular",
    descricao: "Casa ampla com quintal espaçoso e área de lazer completa.",
    quartos: 4,
    banheiros: 3,
    suites: 2,
    vagas: 2,
    metrosQuadrados: 200,
    endereco: "Rua GHI, 789",
    valor: 700000,
    thumb: MarisaWebberFoto,
    slug: "casa-espetacular",
  },
  {
    id: 4,
    tipo: "Apartamento Luxuoso",
    descricao: "Apartamento luxuoso com acabamentos de alta qualidade e vista para a cidade.",
    quartos: 3,
    banheiros: 2,
    suites: 1,
    vagas: 1,
    metrosQuadrados: 120,
    endereco: "Rua JKL, 123",
    valor: 500000,
    thumb: Foto1,
    slug: "apartamento-luxuoso",
    imagens: [Foto1, Foto2, MarisaWebberFoto],
  },
  {
    id: 5,
    tipo: "Casa Moderna",
    descricao: "Casa moderna com design minimalista e acabamentos de alta qualidade.",
    quartos: 4,
    banheiros: 3,
    suites: 2,
    vagas: 2,
    metrosQuadrados: 250,
    endereco: "Rua MNO, 456",
    valor: 800000,
    thumb: Foto2,
    slug: "casa-moderna",
    imagens: [MarisaWebberFoto, Foto1, Foto2],
  },
  {
    id: 6,
    tipo: "Edifício Residencial",
    descricao: "Edifício residencial com apartamentos de 2 e 3 quartos e acabamentos de alta qualidade.",
    quartos: 3,
    banheiros: 2,
    suites: 1,
    vagas: 1,
    metrosQuadrados: 150,
    endereco: "Rua PQR, 789",
    valor: 400000,
    thumb: MarisaWebberFoto,
    slug: "edificio-residencial",
    imagens: [Foto1, MarisaWebberFoto, Foto2]
  },
];
