import { QuestionAttachment } from "../../enterprise/entities/question-attachment";

export interface QuestionAttachmentsRepository {
  findManyByQuestionaId(id: string): Promise<QuestionAttachment[]>;
  deleteManyByQuestionId(id: string): Promise<void>;
}
