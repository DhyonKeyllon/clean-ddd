import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase; // system under test

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  test("should be able to create an answer", async () => {
    const { answer } = await sut.execute({
      instructorId: "1",
      questionId: "1",
      content: "Conteúdo da resposta",
    });

    expect(answer.id).toBeTruthy();

    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id);

    expect(answer.content).toEqual("Conteúdo da resposta");
  });
});
