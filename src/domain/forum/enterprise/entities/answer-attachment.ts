import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface AnswerAttachmentProps {
  answerId: string;
  attachmentId: string;
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  static create(props: AnswerAttachmentProps, id?: UniqueEntityID) {
    const attachment = new AnswerAttachment(props, id);

    return attachment;
  }
}
