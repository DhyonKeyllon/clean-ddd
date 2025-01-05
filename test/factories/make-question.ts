import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Question,
  QuestionProps,
} from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    title: "Título da Nova pergunta",
    content: "Conteúdo da nova pergunta",
    slug: Slug.create("titulo-da-nova-pergunta"),
    authorId: new UniqueEntityID("1"),
    ...override,
  });

  return question;
}
