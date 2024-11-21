import styled from "styled-components";
import BookmarkButton from "./BookmarkButton";
import Link from "next/link";
import EmotionCardContent from "./EmotionCardContent";
import formatDate from "./TransformDateTime";
import { allEmotionIcons } from "@/lib/allEmotionOptions";
import Highlighter from "react-highlight-words";

export default function EmotionCard({
  emotion,
  onToggleBookmark,
  isBookmarked,
  isDetailsPage = false,
  customEmotionTypes,
  intensity,
  searchTerm,
}) {
  const { date, time } = formatDate(emotion.dateTime);

  const emotionTypeData = customEmotionTypes.find(
    (customEmotionType) => customEmotionType.emotionType === emotion.emotionType
  );

  const emotionIcon = allEmotionIcons.find(
    (emotionIcon) => emotionIcon.emotionIconId === emotionTypeData.emotionIconId
  )?.emotionIcon;
  console.log(customEmotionTypes);

  return (
    <StyledCardWrapper>
      {isDetailsPage ? (
        <StyledOuterBox color={emotionTypeData.color}>
          <StyledTopBox color={emotionTypeData.color}>
            <StyledDate>{date}</StyledDate>
            <StyledTime>{time}</StyledTime>
          </StyledTopBox>
          <StyledEmotionCard>
            <EmotionCardContent
              emotionColor={emotionTypeData.color}
              emotionIcon={emotionIcon}
              emotion={{
                ...emotion,
                notes: (
                  <Highlighter
                    searchWords={[searchTerm]}
                    autoEscape={true}
                    textToHighlight={emotion.notes}
                  />
                ),
              }}
            />
            <BookmarkButton
              isBookmarked={isBookmarked}
              onToggleBookmark={() => onToggleBookmark(emotion.id)}
            />
          </StyledEmotionCard>
        </StyledOuterBox>
      ) : (
        <>
          <StyledLink key={emotion.id} href={`emotion/${emotion.id}`}>
            <StyledOuterBox color={emotionTypeData.color}>
              <StyledTopBox color={emotionTypeData.color}>
                <StyledDate>{date}</StyledDate>
                <StyledTime>{time}</StyledTime>
              </StyledTopBox>
              <StyledEmotionCard>
                <EmotionCardContent
                  emotionColor={emotionTypeData.color}
                  emotionIcon={emotionIcon}
                  emotion={{
                    ...emotion,
                    notes: (
                      <Highlighter
                        searchWords={[searchTerm]}
                        autoEscape={true}
                        textToHighlight={emotion.notes}
                      />
                    ),
                  }}
                  intensity={intensity}
                />
              </StyledEmotionCard>
            </StyledOuterBox>
          </StyledLink>
          <BookmarkButton
            isBookmarked={isBookmarked}
            onToggleBookmark={() => onToggleBookmark(emotion.id)}
          />
        </>
      )}
    </StyledCardWrapper>
  );
}

const StyledCardWrapper = styled.div`
  position: relative;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  &:visited {
    color: inherit;
  }
`;

const StyledOuterBox = styled.div`
  background-color: var(--color-background);
  border: 1px solid ${({ color }) => color || "var(--color-border)"};
  border-radius: 0.5rem;
  box-shadow: 0 1px 4px var(--color-shadow);
  margin: 24px 8px;
  overflow: hidden;
`;

const StyledTopBox = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: ${({ color }) => color || "var(--color-background)"};
  padding: 5px;
`;

const StyledDate = styled.p`
  margin: 0;
  padding-left: 1rem;
  font-size: 0.8rem;
  color: var(--color-cards-foreground);
`;

const StyledTime = styled.p`
  margin: 0;
  padding-left: 1rem;
  font-size: 0.8rem;
  color: var(--color-cards-foreground);
`;

const StyledEmotionCard = styled.section`
  display: flex;
  flex-direction: column;
  align-items: left;
  font-size: 1rem;
  padding: 26px 8px;
  background-color: var(--color-background-cards);
  word-break: break-word;
`;
