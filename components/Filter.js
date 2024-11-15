import styled, { css } from "styled-components";
import { useState, useRef, useEffect } from "react";
import { emotionList } from "@/lib/emotionList";
import useScreenSize from "../lib/hooks/useScreenSize";

export default function Filter({
  emotions,
  selectedFilterButton,
  setSelectedFilterButton,
}) {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef(null);
  const screenSize = useScreenSize();

  const filteredEmotions = selectedFilterButton
    ? emotions.filter((emotion) => emotion.emotionType === selectedFilterButton)
    : emotions;

  function updateArrowVisibility() {
    const tabsBox = scrollContainerRef.current;
    if (tabsBox) {
      const canScrollLeft = tabsBox.scrollLeft > 0;
      const canScrollRight =
        tabsBox.scrollWidth > tabsBox.clientWidth + tabsBox.scrollLeft;
      setShowLeftArrow(canScrollLeft);
      setShowRightArrow(canScrollRight);
    }
  }

  function scrollTabsHorizontally(direction) {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -100 : 100;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    const tabsBox = scrollContainerRef.current;
    if (tabsBox) {
      tabsBox.scrollLeft = (tabsBox.scrollWidth - tabsBox.clientWidth) / 2;
      updateArrowVisibility();
    }
  }, [screenSize.width]);

  return (
    <>
      <StyledDivWrapper>
        <StyledWrapper>
          {showLeftArrow && (
            <StyledIconLeft
              aria-label="Icon to slide the filter to the left"
              onClick={() => scrollTabsHorizontally("left")}
            >
              &#9664;
            </StyledIconLeft>
          )}
          <StyledTabsBox
            ref={scrollContainerRef}
            onScroll={updateArrowVisibility}
          >
            {emotionList.map((emotion) => (
              <StyledTab
                key={emotion.id}
                onClick={() =>
                  setSelectedFilterButton(
                    emotion.emotionType === selectedFilterButton
                      ? ""
                      : emotion.emotionType
                  )
                }
                $isSelected={emotion.emotionType === selectedFilterButton}
                $color={emotion.color}
              >
                {emotion.emotionType}
              </StyledTab>
            ))}
          </StyledTabsBox>
          {showRightArrow && (
            <StyledIconRight
              aria-label="Icon to slide the filter to the right"
              onClick={() => scrollTabsHorizontally("right")}
            >
              &#9654;
            </StyledIconRight>
          )}
        </StyledWrapper>
      </StyledDivWrapper>
      <StyledAppliedInfo>
        {selectedFilterButton ? (
          <>
            #{selectedFilterButton}
            <StyledClearFilter onClick={() => setSelectedFilterButton("")}>
              ×
            </StyledClearFilter>
          </>
        ) : (
          ""
        )}
      </StyledAppliedInfo>
    </>
  );
}

const StyledDivWrapper = styled.div`
  background-color: #f6f4f3;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
`;

const StyledWrapper = styled.div`
  padding: 0 20px;
  position: relative;
  max-width: 1000px;
`;

const StyledIconLeft = styled.div`
  position: absolute;
  top: 0;
  left: -30px;
  height: 100%;
  width: 120px;
  font-size: 1.5rem;
  color: #313366;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background: linear-gradient(90deg, #f6f4f3 40%, transparent);
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

const StyledTabsBox = styled.ul`
  display: flex;
  gap: 12px;
  list-style: none;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  margin-right: 30px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledTab = styled.li`
  color: #313366;
  cursor: pointer;
  font-size: 1rem;
  white-space: nowrap;
  background: #f9f9f9;
  padding: 8px 10px;
  border: 1px solid #e0e1f0;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  opacity: 70%;
  -webkit-tap-highlight-color: transparent;

  ${({ $isSelected, $color }) =>
    $isSelected &&
    css`
      background: ${$color};
      opacity: 100%;
    `}
`;

const StyledIconRight = styled.div`
  position: absolute;
  top: 0;
  right: -30px;
  height: 100%;
  width: 120px;
  font-size: 1.5rem;
  color: #313366;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-90deg, #f6f4f3 40%, transparent);
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

const StyledAppliedInfo = styled.p`
  margin: 0;
  padding: 10px 0 10px 20px;
  color: #313366;
`;

const StyledClearFilter = styled.span`
  margin-left: 4px;
  cursor: pointer;
  color: #a6a6a6;
  position: relative;
  top: -6px;

  &:hover {
    color: #313366;
  }
`;

const StyledMessage = styled.p`
  text-align: center;
  color: #777;
  font-size: 1.1rem;
  padding: 24px 16px;
`;

const StyledUlContainer = styled.ul`
  padding: 0;
`;

const StyledCardList = styled.li`
  list-style-type: none;
`;
