import { commaShilding } from './../utils/index';

it('Shilding posgresql queries function ', () => {
  expect(commaShilding(`asdf'adsf`)).toBe(`asdf''adsf`);
  expect(commaShilding(`''`)).toBe(`''''`);
});
