import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  SearchInput,
  IconRightArrow,
  IconMagnifyingGlass,
} from "./styles";

function Search({ filterProduct }) {
  const targetRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      filterProduct(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      hover={isHovered || isFocused}
    >
      <SearchInput
        ref={targetRef}
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        showSearchInput={isHovered || isFocused}
      />
      {isHovered || isFocused ? "" : <IconMagnifyingGlass />}
    </Container>
  );
}

export default Search;
