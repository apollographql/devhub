const {transformer} = require('..');
const data = require('./mock-data');

test('parse collections', async () => {
  const {1: secondRecord, length} = await transformer(data);

  expect(length).toBe(56);

  // test the second record because we'd expect it to have a section title since
  // it will be the first record that is descended from a heading
  expect(secondRecord).toEqual(
    expect.objectContaining({
      objectID: expect.any(String),
      index: expect.any(Number),
      url: expect.any(String),
      slug: expect.any(String),
      categories: expect.any(Array),
      date: expect.any(String),
      title: expect.any(String),
      sectionTitle: expect.any(String),
      excerpt: expect.any(String),
      text: expect.any(String),
      ancestors: expect.any(Array),
      type: expect.any(String)
    })
  );
});
