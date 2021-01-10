const createPixelGIF = (hexColor: string) => {
  var keyStr =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

  return function createPixelGIF() {
    return (
      'data:image/gif;base64,R0lGODlhAQABAPAA' +
      encodeHex() +
      '/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
    )
  }

  function encodeHex() {
    var rgb
    if (typeof hexColor == 'string') {
      var s = hexColor.substring(1, 7)
      if (s.length < 6) s = s[0] + s[0] + s[1] + s[1] + s[2] + s[2]
      rgb = [
        parseInt(s[0] + s[1], 16),
        parseInt(s[2] + s[3], 16),
        parseInt(s[4] + s[5], 16),
      ]
    } else
      rgb = [
        (hexColor & (0xff << 16)) >> 16,
        (hexColor & (0xff << 8)) >> 8,
        hexColor & 0xff,
      ]

    return encodeRGB(rgb[0], rgb[1], rgb[2])
  }

  function encodeRGB(r, g, b) {
    return encode_triplet(0, r, g) + encode_triplet(b, 255, 255)
  }

  function encode_triplet(e1, e2, e3) {
    const enc1 = e1 >> 2
    const enc2 = ((e1 & 3) << 4) | (e2 >> 4)
    const enc3 = ((e2 & 15) << 2) | (e3 >> 6)
    const enc4 = e3 & 63
    return (
      keyStr.charAt(enc1) +
      keyStr.charAt(enc2) +
      keyStr.charAt(enc3) +
      keyStr.charAt(enc4)
    )
  }
}

export default createPixelGIF
