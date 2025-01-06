import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeAnswerComment } from "test/factories/make-answer-comment";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase; // system under test

describe("Delete Answer Comment", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  });

  test("should be able to delete an answer comment", async () => {
    const newAnswerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-comment-1"),
    );

    await inMemoryAnswerCommentsRepository.create(newAnswerComment);

    await sut.execute({
      authorId: "author-1",
      answerCommentId: "answer-comment-1",
    });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  });

  test("should not be able to delete an answer comment be another user", async () => {
    const newAnswerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-comment-1"),
    );

    await inMemoryAnswerCommentsRepository.create(newAnswerComment);

    await expect(
      async () =>
        await sut.execute({
          authorId: "author-2",
          answerCommentId: "answer-comment-1",
        }),
    ).rejects.toBeInstanceOf(Error);
  });
});
