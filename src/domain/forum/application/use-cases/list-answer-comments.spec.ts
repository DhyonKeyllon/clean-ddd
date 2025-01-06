import { ListAnswerCommentsUseCase } from "./list-answer-comments";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { makeAnswer } from "test/factories/make-answer";
import { makeAnswerComment } from "test/factories/make-answer-comment";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: ListAnswerCommentsUseCase; // system under test

describe("List answer comments", async () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new ListAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
  });

  test("should be able to list a answer comments ", async () => {
    const answer = makeAnswer();

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: answer.id }),
    );
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: answer.id }),
    );
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: answer.id }),
    );

    const { answerComments } = await sut.execute({
      page: 1,
      id: answer.id.toString(),
    });

    expect(answerComments).toHaveLength(3);
  });

  test("should be able to list a paginated answer answers", async () => {
    const answer = makeAnswer();

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: answer.id,
        }),
      );
    }

    const { answerComments } = await sut.execute({
      page: 2,
      id: answer.id.toString(),
    });

    expect(answerComments).toHaveLength(2);
  });
});
