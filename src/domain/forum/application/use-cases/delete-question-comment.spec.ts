import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository";
import { DeleteQuestionCommentUseCase } from "./delete-question-comment";
import { makeQuestionComment } from "test/factories/make-question-comment";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase; // system under test

describe("Delete QuestionComment", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
  });

  test("should be able to delete an question comment", async () => {
    const newQuestionComment = makeQuestionComment(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-comment-1"),
    );

    await inMemoryQuestionCommentsRepository.create(newQuestionComment);

    await sut.execute({
      authorId: "author-1",
      questionCommentId: "question-comment-1",
    });

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
  });

  test("should not be able to delete an question comment be another user", async () => {
    const newQuestionComment = makeQuestionComment(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-comment-1"),
    );

    await inMemoryQuestionCommentsRepository.create(newQuestionComment);

    await expect(
      async () =>
        await sut.execute({
          authorId: "author-2",
          questionCommentId: "question-comment-1",
        }),
    ).rejects.toBeInstanceOf(Error);
  });
});
