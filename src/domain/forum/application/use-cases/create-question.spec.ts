import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { CreateQuestionUseCase } from "./create-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase; // system under test

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  test("should be able to create an question", async () => {
    const result = await sut.execute({
      authorId: "1",
      title: "Título da Nova pergunta",
      content: "Conteúdo da nova pergunta",
      attachmentsIds: ["1", "2"],
    });

    expect(result.isRight()).toBe(true);

    expect(inMemoryQuestionsRepository.items[0].id).toEqual(
      result.value?.question.id,
    );
    expect(inMemoryQuestionsRepository.items[0].attachments).toHaveLength(2);
    expect(inMemoryQuestionsRepository.items[0].attachments).toEqual(
      result.value?.question.attachments,
    );
    expect(result.value?.question.title).toEqual("Título da Nova pergunta");
    expect(result.value?.question.content).toEqual("Conteúdo da nova pergunta");
    expect(result.value?.question.slug.value).toEqual(
      "titulo-da-nova-pergunta",
    );
  });
});
