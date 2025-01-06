import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface ListQuestionCommentsUseCaseRequest {
  page: number;
  id: string;
}

interface ListQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[];
}

export class ListQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    id,
    page,
  }: ListQuestionCommentsUseCaseRequest): Promise<ListQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(id, {
        page,
      });

    return {
      questionComments,
    };
  }
}
