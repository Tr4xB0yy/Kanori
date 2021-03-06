/*
  CanvasUtils - Tools for using with Canvas
  By: SwitchbladeBot, a Utilily bot for Discord.
  https://github.com/SwitchbladeBot/switchblade
*/
const fs = require('fs')
var { get } = require('snekfetch');
const { createCanvas, registerFont, Context2d, Image } = require('canvas')

const ALIGN = {
  TOP_LEFT: 1,
  TOP_CENTER: 2,
  TOP_RIGHT: 3,
  CENTER_RIGHT: 4,
  BOTTOM_RIGHT: 5,
  BOTTOM_CENTER: 6,
  BOTTOM_LEFT: 7,
  CENTER_LEFT: 8
}
    // Loading the font (Whitney Bold)
console.log("Loading assets for: Whitney Bold");
if (!fs.existsSync('./whitney-bold.ttf')) {
  get('https://cdn.glitch.com/2a3b49aa-7261-4319-ac8a-35251c2672d8%2Fwhitneyhtf-bold.ttf?1530283240370').then(g => {
    var file = g.body;
    console.log("Downloading Whitney bold...");
    fs.writeFile('whitney-bold.ttf', file, function (e) {
      if (e) console.error(e);
      registerFont('./whitney-bold.ttf', { family: 'Whitney', weight: 'Bold' });
      console.log("Whitney Bold carregada e baixada com sucesso.");
    });
  });
} else {
  registerFont('./whitney-bold.ttf', { family: 'Whitney', weight: 'Bold' });
  console.log("Whitney Bold carregado.");
}

module.exports = class CanvasUtils {
  static loadHelper() {
    // Context functions
    Context2d.prototype.roundImage = function (img, x, y, w, h, r) {
      this.drawImage(this.roundImageCanvas(img, w, h, r), x, y, w, h)
      return this
    }

    Context2d.prototype.roundImageCanvas = function (img, w = img.width, h = img.height, r = w * 0.5) {
      const canvas = createCanvas(w, h)
      const ctx = canvas.getContext('2d')

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.globalCompositeOperation = 'source-over'
      ctx.drawImage(img, 0, 0, w, h)

      ctx.fillStyle = '#fff'
      ctx.globalCompositeOperation = 'destination-in'
      ctx.beginPath()
      ctx.arc(w * 0.5, h * 0.5, r, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.fill()

      return canvas
    }

    Context2d.prototype.circle = function (x, y, r, a1, a2) {
      this.beginPath()
      this.arc(x, y, r, a1, a2, true)
      this.closePath()
      this.fill()
      return this
    }

    Context2d.prototype.write = function (text, x, y, font = '12px "Montserrat"', align = ALIGN.BOTTOM_LEFT) {
      this.font = font
      const { width, height } = self.measureText(this, font, text)
      const { x: realX, y: realY } = self.resolveAlign(x, y, width, height, align)
      this.fillText(text, realX, realY)
      return {
        leftX: realX,
        rightX: realX + width,
        bottomY: realY,
        topY: realY - height,
        centerX: realX + width * 0.5,
        centerY: realY + height * 0.5,
        width,
        height
      }
    }
  }

  static measureText (ctx, font, text) {
    ctx.font = font
    const measure = ctx.measureText(text)
    return {
      width: measure.width,
      height: measure.actualBoundingBoxAscent
    }
  }
}

module.exports.ALIGN = ALIGN