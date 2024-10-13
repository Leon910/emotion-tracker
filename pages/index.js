import Heading from "@/components/Heading";
import EmotionForm from "@/components/EmotionForm";
import EmotionList from "@/components/EmotionList";
import Image from "next/image";
import styled from "styled-components";

export default function HomePage({
  objects,
  onCreateEmotion,
  onUpdateEmotion,
}) {
  return (
    <div>
      <Heading>Mood Wave</Heading>
      <ImageWrapper>
        <Image
          src="/images/logo-mw.png"
          alt="Mood Wave"
          width={50}
          height={50}
        />
      </ImageWrapper>
      <EmotionForm
        objects={objects}
        onCreateEmotion={onCreateEmotion}
        onUpdateEmotion={onUpdateEmotion}
      />
      <EmotionList objects={objects} />
    </div>
  );
}

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 0 20px 0;
`;
