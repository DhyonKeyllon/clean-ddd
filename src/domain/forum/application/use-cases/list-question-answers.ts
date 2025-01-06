import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface ListQuestionAnswersUseCaseRequest {
  page: number;
  id: string;
}

interface ListQuestionAnswersUseCaseResponse {
  answers: Answer[];
}

export class ListQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    id,
    page,
  }: ListQuestionAnswersUseCaseRequest): Promise<ListQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(id, {
      page,
    });

    return {
      answers,
    };
  }
}
