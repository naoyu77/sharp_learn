# Sharp で画像処理を学ぶ

Node.js で画像処理を行うためのライブラリ「Sharp」の学習メモ。

## セットアップ

```bash
npm init -y
npm install sharp
```

## 基本的な使い方

```javascript
const sharp = require('sharp');

// 画像を読み込んで処理して保存
await sharp('input.jpg')
  .resize(300, 200)
  .toFile('output.jpg');
```

---

## ぼかし（Blur）

画像をぼかす処理。各ピクセルの色を周囲と混ぜ合わせて平均化する。

```javascript
sharp('input.jpg')
  .blur(sigma)  // sigmaが大きいほど強くぼける
  .toFile('output.jpg');
```

| sigma値 | 効果 |
|--------|------|
| 0.3〜3 | 軽いぼかし |
| 5〜10 | 中程度 |
| 15〜20+ | 強いぼかし |

**用途**: 背景ぼかし、プライバシー保護、デザイン効果

---

## 色調補正

### 明るさ・彩度の調整（modulate）

```javascript
sharp('input.jpg')
  .modulate({
    brightness: 1.3,   // 1.0が基準。大きいと明るく
    saturation: 1.5,   // 1.0が基準。大きいと鮮やかに
    hue: 15            // 色相を回転（度数）
  })
  .toFile('output.jpg');
```

| パラメータ | 値 | 効果 |
|-----------|-----|------|
| brightness | 0.7 | 暗く |
| brightness | 1.3 | 明るく |
| saturation | 0.5 | 淡く（pale） |
| saturation | 1.5 | 鮮やか（vivid） |

### コントラスト調整（linear）

```javascript
// コントラストを上げる
sharp('input.jpg')
  .linear(1.3, -(128 * 0.3))
  .toFile('output.jpg');
```

### 色味の変更（tint）

```javascript
// 暖色系（オレンジっぽく）
sharp('input.jpg')
  .tint({ r: 255, g: 220, b: 180 })
  .toFile('warm.jpg');

// 寒色系（青っぽく）
sharp('input.jpg')
  .tint({ r: 180, g: 200, b: 255 })
  .toFile('cool.jpg');
```

### その他の色処理

```javascript
// グレースケール
sharp('input.jpg').grayscale()

// セピア調
sharp('input.jpg').grayscale().tint({ r: 180, g: 140, b: 100 })

// ネガティブ（色反転）
sharp('input.jpg').negate()

// ガンマ補正
sharp('input.jpg').gamma(1.8)
```

---

## リサイズ

```javascript
// 幅300px、高さ自動
sharp('input.jpg').resize(300)

// 幅300px、高さ200px
sharp('input.jpg').resize(300, 200)

// アスペクト比を維持して収める
sharp('input.jpg').resize(300, 200, { fit: 'contain' })

// 切り抜いて埋める
sharp('input.jpg').resize(300, 200, { fit: 'cover' })
```

---

## 回転

```javascript
// 90度回転
sharp('input.jpg').rotate(90)

// 45度回転（背景色指定）
sharp('input.jpg').rotate(45, { background: { r: 255, g: 255, b: 255 } })
```

---

## 画像の合成（composite）

複数の画像を重ね合わせる。

```javascript
sharp('base.jpg')
  .composite([
    { input: 'overlay.png', left: 10, top: 10 }
  ])
  .toFile('output.jpg');
```

---

## 新規画像の作成

```javascript
sharp({
  create: {
    width: 300,
    height: 200,
    channels: 3,
    background: { r: 255, g: 0, b: 0 }  // 赤
  }
})
.png()
.toFile('red.png');
```

---

## 画像情報の取得

```javascript
const metadata = await sharp('input.jpg').metadata();
console.log(metadata);
// { format: 'jpeg', width: 800, height: 600, ... }
```

---

## フォーマット変換

```javascript
// PNG → JPEG
sharp('input.png').jpeg({ quality: 80 }).toFile('output.jpg');

// JPEG → PNG
sharp('input.jpg').png().toFile('output.png');

// WebP（軽量フォーマット）
sharp('input.jpg').webp({ quality: 80 }).toFile('output.webp');
```

---

## 処理のチェーン

複数の処理を連続して適用できる。

```javascript
await sharp('input.jpg')
  .resize(400, 300)
  .blur(3)
  .modulate({ brightness: 1.1, saturation: 1.2 })
  .jpeg({ quality: 85 })
  .toFile('output.jpg');
```

---

## Sharp vs ImageMagick

| 項目 | Sharp | ImageMagick |
|-----|-------|-------------|
| 速度 | 非常に高速 | 普通 |
| メモリ | 少ない | 多め |
| 対応フォーマット | 20種類程度 | 200種類以上 |
| 機能の数 | 基本〜中級 | 非常に豊富 |
| インストール | npm のみ | システムに別途必要 |

**結論**: 普段使いはSharp、特殊な処理はImageMagick

---

## プロジェクト構成

```
imagemagick_learn/
├── sample_photo.jpg      # 元画像
├── index.js              # 基本サンプル
├── blur.js               # ぼかし処理
├── color.js              # 色調補正
├── montage.js            # サムネイル一覧作成
├── output/
│   ├── blur/             # ぼかし出力
│   ├── color/            # 色調補正出力
│   └── montage.jpg       # 一覧画像
└── package.json
```

## 実行方法

```bash
node index.js    # 基本サンプル
node blur.js     # ぼかし処理
node color.js    # 色調補正
node montage.js  # サムネイル一覧作成
```

---

## 参考リンク

- [Sharp 公式ドキュメント](https://sharp.pixelplumbing.com/)
- [Sharp GitHub](https://github.com/lovell/sharp)
