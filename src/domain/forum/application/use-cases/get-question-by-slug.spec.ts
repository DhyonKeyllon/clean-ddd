import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";

import { Slug } from "../../enterprise/entities/value-objects/slug";
import { makeQuestion } from "test/factories/make-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase; // system under test

describe("Get Question by Slug", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  test("should be able to find a question by slug", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create("titulo-da-nova-pergunta"),
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: "titulo-da-nova-pergunta",
    });

    expect(question.id).toBeTruthy();
    expect(question.title).toEqual(newQuestion.title);
  });
});
