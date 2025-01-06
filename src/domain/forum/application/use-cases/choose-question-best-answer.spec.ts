import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: ChooseQuestionBestAnswerUseCase; // system under test

describe("Choose Question Best Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryQuestionsRepository,
    );
  });

  test("should be able to choose question best answer", async () => {
    const question = makeQuestion();

    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    });

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
      answer.id,
    );
  });

  test("should not be able to choose question best answer be another user", async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID("another-author"),
    });

    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswersRepository.create(answer);

    await expect(
      async () =>
        await sut.execute({
          authorId: "author-expected",
          answerId: answer.id.toString(),
        }),
    ).rejects.toBeInstanceOf(Error);
  });
});
