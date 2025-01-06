import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface ListAnswerCommentsUseCaseRequest {
  page: number;
  id: string;
}

interface ListAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[];
}

export class ListAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    id,
    page,
  }: ListAnswerCommentsUseCaseRequest): Promise<ListAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(id, {
        page,
      });

    return {
      answerComments,
    };
  }
}
