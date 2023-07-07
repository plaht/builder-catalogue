import { getBrickUrl } from './url';

describe('url utils test', () => {
  it('should return a valid brick url based on brick id and coolor', () => {
    expect(getBrickUrl('guido', 'olive_green')).toBe(
      'https://img.bricklink.com/ItemImage/PN/olive_green/guido.png'
    );
  });
});
