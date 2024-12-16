import styled from "styled-components";
import formatDate from "./TransformDateTime";

export default function JournalCard({ journalEntry, onDelete }) {
  const { date, time } = formatDate(journalEntry.date);
  const { subject, text } = journalEntry;

  return (
    <StyledCardWrapper>
      <StyledOuterBox>
        <StyledTopBox>
          <StyledDate>
            {date} {time}
          </StyledDate>
          <DeleteButton onClick={onDelete}>✕</DeleteButton>
        </StyledTopBox>
        <StyledJournalCard>
          <StyledSubject>{subject}</StyledSubject>
          <StyledText>{text}</StyledText>
        </StyledJournalCard>
      </StyledOuterBox>
    </StyledCardWrapper>
  );
}

const StyledCardWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const StyledOuterBox = styled.div`
  background-color: var(--color-background);
  border: 1px solid ${({ color }) => color || "var(--color-border)"};
  border-radius: 0.5rem;
  box-shadow: 0 1px 4px var(--color-shadow);
  margin: 24px 0;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
`;

const StyledTopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: grey;
  padding: 5px;
`;

const StyledDate = styled.p`
  margin: 0;
  padding-left: 1rem;
  font-size: 0.8rem;
  color: var(--color-cards-foreground);
`;

const StyledJournalCard = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  padding: 26px 8px;
  background-color: var(--color-background-cards);
  word-break: break-word;
  width: 100%;
`;

const StyledSubject = styled.h3`
  text-align: center;
  font-size: 1rem;
  color: var(--color-text);
  margin-top: -12px;
  margin-bottom: 48px;
`;

const StyledText = styled.p`
  margin-top: 0px;
  text-align: center;
  font-size: 1rem;
  color: var(color--color-secondary);
  body.dark.theme & {
    color: var(--color-secondary);
  }
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  padding: 0 10px;

  &:hover {
    color: red;
  }
`;
