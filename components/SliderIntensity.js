import React, { useState } from "react";
import styled from "styled-components";

export default function SliderIntensity({
  selectedEmotionType,
  defaultIntensity,
  onChange,
  emotionTypes,
}) {
  const [newValue, setNewValue] = useState(defaultIntensity || 1);

  const emotionType = emotionTypes.find(
    (type) => type._id === selectedEmotionType
  );
  const $thumbColor = emotionType
    ? emotionType.color
    : "var(--color-form-foreground)";

  const handleSliderChange = (event) => {
    const value = event.target.value;
    setNewValue(value);
    onChange(value);
  };

  return (
    <SliderContainer>
      <StyledSlider
        type="range"
        min="1"
        max="3"
        value={newValue}
        onChange={handleSliderChange}
        $thumbColor={$thumbColor}
      />
    </SliderContainer>
  );
}

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 20px 0;
`;

const StyledSlider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  background: var(--color-slider-intensity);
  outline: none;
  border-radius: 5px;
  position: relative;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background-color: ${({ $thumbColor }) => $thumbColor};
    border-radius: 50%;
    cursor: pointer;
    transition: width 0.3s ease, height 0.3s ease;

    ${({ value }) => {
      let size = "20px";
      if (value === "2") {
        size = "30px";
      } else if (value === "3") {
        size = "40px";
      }
      return `width: ${size}; height: ${size};`;
    }}
  }

  &::-moz-range-thumb {
    background-color: ${({ $thumbColor }) => $thumbColor};

    border-radius: 50%;
    cursor: pointer;
    transition: width 0.3s ease, height 0.3s ease;

    ${({ value }) => {
      let size = "20px";
      if (value === "2") {
        size = "30px";
      } else if (value === "3") {
        size = "40px";
      }
      return `width: ${size}; height: ${size};`;
    }}
  }
`;
