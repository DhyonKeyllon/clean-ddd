import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface QuestionAttachmentProps {
  questionId: UniqueEntityID;
  attachmentId: UniqueEntityID;
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  static create(props: QuestionAttachmentProps, id?: UniqueEntityID) {
    const attachment = new QuestionAttachment(props, id);

    return attachment;
  }
}
