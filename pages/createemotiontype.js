import CreateEmotionTypeForm from "@/components/CreateEmotionTypeForm";
import Heading from "@/components/Heading";

export default function CreateEmotionType() {
  async function handleCreateEmotionType(data) {
    const response = await fetch("/api/emotionTypes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const createdData = await response.json();
    return createdData.id;
  }

  return (
    <>
      <Heading>Create Emotion Type</Heading>
      <CreateEmotionTypeForm onSubmit={handleCreateEmotionType} />
    </>
  );
}
