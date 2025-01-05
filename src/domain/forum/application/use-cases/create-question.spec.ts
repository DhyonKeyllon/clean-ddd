import { QuestionsRepository } from "../repositories/questions-repository";
import { CreateQuestionUseCase } from "./create-question";

const fakeCreateQuestRepository: QuestionsRepository = {
  create: async () => {},
};

test("should create a question", async () => {
  const createQuestion = new CreateQuestionUseCase(fakeCreateQuestRepository);

  const { question } = await createQuestion.execute({
    authorId: "1",
    title: "Título da Nova pergunta",
    content: "Conteúdo da nova pergunta",
  });

  expect(question.title).toEqual("Título da Nova pergunta");
  expect(question.content).toEqual("Conteúdo da nova pergunta");
  expect(question.slug.value).toEqual("titulo-da-nova-pergunta");
});
