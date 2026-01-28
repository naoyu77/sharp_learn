const sharp = require('sharp');

// サンプル画像を作成してから処理する例
async function main() {
  // 1. 新しい画像を作成（300x200の赤い画像）
  await sharp({
    create: {
      width: 300,
      height: 200,
      channels: 3,
      background: { r: 255, g: 0, b: 0 }
    }
  })
  .png()
  .toFile('sample.png');
  console.log('✓ sample.png を作成しました');

  // 2. リサイズ
  await sharp('sample.png')
    .resize(150, 100)
    .toFile('resized.png');
  console.log('✓ resized.png を作成しました（リサイズ）');

  // 3. グレースケール変換
  await sharp('sample.png')
    .grayscale()
    .toFile('grayscale.png');
  console.log('✓ grayscale.png を作成しました（グレースケール）');

  // 4. 回転
  await sharp('sample.png')
    .rotate(45, { background: { r: 255, g: 255, b: 255 } })
    .toFile('rotated.png');
  console.log('✓ rotated.png を作成しました（45度回転）');

  // 5. 画像情報の取得
  const metadata = await sharp('sample.png').metadata();
  console.log('\n画像情報:', metadata);
}

main().catch(console.error);
