const sharp = require('sharp');

async function main() {
  const input = 'sample_photo.jpg';
  const outDir = 'output/blur';

  // 1. 軽いぼかし (sigma: 3)
  await sharp(input)
    .blur(3)
    .toFile(`${outDir}/light.jpg`);
  console.log('✓ light.jpg - 軽いぼかし');

  // 2. 中程度のぼかし (sigma: 10)
  await sharp(input)
    .blur(10)
    .toFile(`${outDir}/medium.jpg`);
  console.log('✓ medium.jpg - 中程度のぼかし');

  // 3. 強いぼかし (sigma: 20)
  await sharp(input)
    .blur(20)
    .toFile(`${outDir}/strong.jpg`);
  console.log('✓ strong.jpg - 強いぼかし');

  // 4. 中央フォーカス（周囲ぼかし）
  const metadata = await sharp(input).metadata();
  const { width, height } = metadata;
  const blurred = await sharp(input).blur(15).toBuffer();

  await sharp(blurred)
    .composite([{
      input: await sharp(input)
        .extract({
          left: Math.floor(width / 4),
          top: Math.floor(height / 4),
          width: Math.floor(width / 2),
          height: Math.floor(height / 2)
        })
        .toBuffer(),
      left: Math.floor(width / 4),
      top: Math.floor(height / 4)
    }])
    .toFile(`${outDir}/focus_center.jpg`);
  console.log('✓ focus_center.jpg - 中央フォーカス');

  console.log('\n完了！');
}

main().catch(console.error);
