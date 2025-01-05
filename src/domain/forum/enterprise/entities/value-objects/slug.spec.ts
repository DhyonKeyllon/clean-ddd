import { Slug } from "./slug";

test("it should be able to create new slug from text", () => {
  const slug = Slug.createFromText("Slug text example");

  expect(slug.value).toEqual("slug-text-example");
});
