import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { EditQuestionUseCase } from "./edit-question";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase; // system under test

describe("Edit Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  test("should be able to edit an question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1"),
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      authorId: "author-1",
      questionId: newQuestion.id.toValue(),
      title: "Question test",
      content: "Content test",
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "Question test",
      content: "Content test",
    });
  });

  test("should not be able to edit an question be another user", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1"),
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await expect(
      async () =>
        await sut.execute({
          authorId: "author-2",
          questionId: newQuestion.id.toValue(),
          title: "Question test",
          content: "Content test",
        }),
    ).rejects.toBeInstanceOf(Error);
  });
});
