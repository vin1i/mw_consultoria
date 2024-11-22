import React from "react";
import { PageButton, PaginationContainer } from "./styles";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <PaginationContainer>
      <PageButton
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        aria-label="Página anterior"
      >
        Anterior
      </PageButton>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <PageButton
            key={page}
            $isActive={currentPage === page}
            onClick={() => handlePageChange(page)}
            aria-label={`Página ${page}`}
          >
            {page}
          </PageButton>
        );
      })}

      <PageButton
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        aria-label="Próxima página"
      >
        Próxima
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
