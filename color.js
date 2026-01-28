const sharp = require('sharp');

async function main() {
  const input = 'sample_photo.jpg';
  const outDir = 'output/color';

  // 1. 明るくする
  await sharp(input)
    .modulate({ brightness: 1.3 })
    .toFile(`${outDir}/bright.jpg`);
  console.log('✓ bright.jpg - 明るく');

  // 2. 暗くする
  await sharp(input)
    .modulate({ brightness: 0.7 })
    .toFile(`${outDir}/dark.jpg`);
  console.log('✓ dark.jpg - 暗く');

  // 3. 彩度を上げる（鮮やかに）
  await sharp(input)
    .modulate({ saturation: 1.5 })
    .toFile(`${outDir}/vivid.jpg`);
  console.log('✓ vivid.jpg - 鮮やかに');

  // 4. 彩度を下げる（淡く）
  await sharp(input)
    .modulate({ saturation: 0.5 })
    .toFile(`${outDir}/pale.jpg`);
  console.log('✓ pale.jpg - 淡く');

  // 5. コントラストを上げる（くっきり）
  await sharp(input)
    .linear(1.3, -(128 * 0.3))
    .toFile(`${outDir}/contrast.jpg`);
  console.log('✓ contrast.jpg - コントラスト高');

  // 6. 暖色系
  await sharp(input)
    .modulate({ hue: 15 })
    .tint({ r: 255, g: 220, b: 180 })
    .toFile(`${outDir}/warm.jpg`);
  console.log('✓ warm.jpg - 暖色系');

  // 7. 寒色系
  await sharp(input)
    .tint({ r: 180, g: 200, b: 255 })
    .toFile(`${outDir}/cool.jpg`);
  console.log('✓ cool.jpg - 寒色系');

  // 8. セピア調
  await sharp(input)
    .grayscale()
    .tint({ r: 180, g: 140, b: 100 })
    .toFile(`${outDir}/sepia.jpg`);
  console.log('✓ sepia.jpg - セピア調');

  console.log('\n完了！');
}

main().catch(console.error);
