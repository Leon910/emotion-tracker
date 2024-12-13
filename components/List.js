import styled from "styled-components";
import EmotionCard from "./EmotionCard";
import OptionsMenu from "./OptionsMenu";

export default function EmotionList({
  emotions,
  onToggleBookmark,
  myBookmarkedEmotions,
  searchTerm,
  onDeleteEmotion,
}) {
  emotions.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

  return emotions.length === 0 ? (
    <StyledMessage>No entries found.</StyledMessage>
  ) : (
    <StyledList>
      {emotions.map((emotion) => (
        <StyledCardList key={emotion._id}>
          <EmotionCard
            emotion={emotion}
            onToggleBookmark={onToggleBookmark}
            isBookmarked={myBookmarkedEmotions.includes(emotion._id)}
            intensity={emotion.intensity}
            searchTerm={searchTerm}
            onDeleteEmotion={onDeleteEmotion}
          />
        </StyledCardList>
      ))}
    </StyledList>
  );
}

const StyledList = styled.ul`
  margin-bottom: 48px;
  padding: 0 1rem;
`;

const StyledMessage = styled.p`
  text-align: center;
  color: var(--color-secondary);
  font-size: 1.1rem;
  padding: 24px 16px;
`;

const StyledCardList = styled.li`
  list-style-type: none;
`;
