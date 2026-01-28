const sharp = require('sharp');

async function main() {
  // サムネイルにする画像リスト
  const images = [
    { file: 'sample_photo.jpg', label: 'オリジナル' },
    { file: 'output/blur/light.jpg', label: '軽いぼかし' },
    { file: 'output/blur/medium.jpg', label: '中ぼかし' },
    { file: 'output/blur/strong.jpg', label: '強いぼかし' },
    { file: 'output/blur/focus_center.jpg', label: '中央フォーカス' },
    { file: 'output/color/bright.jpg', label: '明るく' },
    { file: 'output/color/dark.jpg', label: '暗く' },
    { file: 'output/color/vivid.jpg', label: '鮮やか' },
    { file: 'output/color/pale.jpg', label: '淡く' },
    { file: 'output/color/contrast.jpg', label: 'コントラスト' },
    { file: 'output/color/warm.jpg', label: '暖色系' },
    { file: 'output/color/cool.jpg', label: '寒色系' },
    { file: 'output/color/sepia.jpg', label: 'セピア' },
  ];

  const thumbWidth = 200;
  const thumbHeight = 150;
  const cols = 4;
  const rows = Math.ceil(images.length / cols);
  const padding = 10;
  const labelHeight = 25;

  const totalWidth = cols * thumbWidth + (cols + 1) * padding;
  const totalHeight = rows * (thumbHeight + labelHeight) + (rows + 1) * padding;

  // 各サムネイルを作成
  const composites = [];

  for (let i = 0; i < images.length; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = padding + col * (thumbWidth + padding);
    const y = padding + row * (thumbHeight + labelHeight + padding);

    // サムネイル画像
    const thumb = await sharp(images[i].file)
      .resize(thumbWidth, thumbHeight, { fit: 'cover' })
      .toBuffer();

    composites.push({
      input: thumb,
      left: x,
      top: y
    });

    // ラベル（SVGで作成）
    const labelSvg = Buffer.from(`
      <svg width="${thumbWidth}" height="${labelHeight}">
        <rect width="100%" height="100%" fill="#333"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
              fill="white" font-size="12" font-family="sans-serif">
          ${images[i].label}
        </text>
      </svg>
    `);

    composites.push({
      input: labelSvg,
      left: x,
      top: y + thumbHeight
    });
  }

  // ベース画像を作成して合成
  await sharp({
    create: {
      width: totalWidth,
      height: totalHeight,
      channels: 3,
      background: { r: 50, g: 50, b: 50 }
    }
  })
    .composite(composites)
    .jpeg({ quality: 90 })
    .toFile('output/montage.jpg');

  console.log(`✓ output/montage.jpg を作成しました (${totalWidth}x${totalHeight})`);
  console.log(`  ${images.length}枚の画像を ${cols}x${rows} のグリッドに配置`);
}

main().catch(console.error);
