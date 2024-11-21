import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "assets/searchIcon/SearchIcon.svg";

export default function SearchBar({ searchTerm, onSearch, onClearSearch }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchInputChange = (event) => {
    const term = event.target.value;
    onSearch(term);
  };

  const toggleSearchBar = () => {
    setIsExpanded((prev) => !prev);
  };
  const handleClearSearch = () => {
    onClearSearch();
    onSearch("");
  };
  return (
    <StyledSearchWrapper>
      <StyledSearchInputWrapper $isExpanded={isExpanded}>
        <StyledSearchInput
          type="text"
          placeholder="Search all Emotions"
          value={searchTerm}
          onChange={handleSearchInputChange}
          $isExpanded={isExpanded}
        />
        {isExpanded && searchTerm && (
          <ClearSearchButton onClick={handleClearSearch}>X</ClearSearchButton>
        )}
      </StyledSearchInputWrapper>
      <StyledSearchButton onClick={toggleSearchBar}>
        <StyledSearchIcon isActive={isExpanded} />
      </StyledSearchButton>
    </StyledSearchWrapper>
  );
}

const StyledSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  transition: all 0.3s ease;
  padding: 10px;
`;

const StyledSearchButton = styled.button`
  font-size: 24px;
  color: #313366;
  width: 48px;
  height: 48px;
  cursor: pointer;
  background: none;
  border: none;
  transition: transform 0.3s ease;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  opacity: ${(props) => (props.isActive ? "100%" : "40%")};
  transition: opacity 0.3s ease;
`;

const StyledSearchInputWrapper = styled.div`
  width: ${(props) => (props.$isExpanded ? "86%" : "0")};
  opacity: ${(props) => (props.$isExpanded ? "1" : "0")};
  position: relative;
  transition: width 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
`;

const StyledSearchInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #313366;
  }
`;

const ClearSearchButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 16px;
  color: #313366;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;
