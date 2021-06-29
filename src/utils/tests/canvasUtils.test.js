import { getCroppedImg } from '../canvasUtils';
import { timeout } from '../testUtils';

describe('Canvas Utils tests', () => {
  it('should ensure that it returns a promise', async () => {
    const imageSrc = 'https://abcd.com';
    const pixelCrop = 'https://as.com';
    const data = getCroppedImg(imageSrc, pixelCrop);
    await timeout(500);
    expect(data).not.toBeNull();
  });
});
