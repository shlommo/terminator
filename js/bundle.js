!function(e){var n={};function r(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s=16)}([function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nvar UniformModel = function () {\n  function UniformModel() {\n    _classCallCheck(this, UniformModel);\n\n    this.glTime = null;\n    this.glResolution = null;\n    this.glAudioPower = null;\n  }\n\n  _createClass(UniformModel, [{\n    key: "time",\n    get: function get() {\n      return this.glTime;\n    },\n    set: function set(glTime) {\n      this.glTime = glTime;\n    }\n  }, {\n    key: "resolution",\n    get: function get() {\n      return this.glResolution;\n    },\n    set: function set(glResolution) {\n      this.glResolution = glResolution;\n    }\n  }, {\n    key: "audioPower",\n    get: function get() {\n      return this.audioPower;\n    },\n    set: function set(audioPower) {\n      this.glAudioPower = audioPower;\n    }\n  }]);\n\n  return UniformModel;\n}();\n\nexports.default = new UniformModel();\n\n//# sourceURL=webpack:///./src/js/renderGraphic/render-video-stream/data/uniform-model.js?')},function(module,exports){eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/scss/style.scss?")},function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar audioCtx = new (window.AudioContext || window.webkitAudioContext)();\nvar source = void 0;\nvar analyser = audioCtx.createAnalyser();\n\nif (navigator.mediaDevices.getUserMedia) {\n  var constraints = { audio: true };\n  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {\n    source = audioCtx.createMediaStreamSource(stream);\n    source.connect(analyser);\n  }).catch(function (err) {\n    console.log('The following gUM error occured: ' + err);\n  });\n} else {\n  console.log('getUserMedia not supported on your browser!');\n}\n\nexports.default = analyser;\n\n//# sourceURL=webpack:///./src/js/analyser.js?")},function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _uniformModel = __webpack_require__(0);\n\nvar _uniformModel2 = _interopRequireDefault(_uniformModel);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar GL_TIME = 0;\nvar uniforms = _uniformModel2.default;\nvar audioPower = 0;\n\nfunction postprocessWebGL(canvas, gl, sourceCanvas, delta, audioData) {\n  var resolution = [window.innerWidth, window.innerHeight];\n  GL_TIME += delta;\n  audioPower = audioData.reduce(function (a, b) {\n    return a + b;\n  });\n\n  gl.uniform1f(uniforms.glAudioPower, audioPower);\n\n  gl.uniform1f(uniforms.time, GL_TIME / 1000);\n  gl.uniform2fv(uniforms.resolution, new Float32Array(resolution));\n\n  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sourceCanvas);\n  gl.viewport(0, 0, canvas.width, canvas.height);\n  gl.enable(gl.DEPTH_TEST);\n  gl.clear(gl.COLOR_BUFFER_BIT);\n  gl.drawArrays(gl.TRIANGLES, 0, 6);\n}\n\nexports.default = postprocessWebGL;\n\n//# sourceURL=webpack:///./src/js/renderGraphic/render-video-stream/postprocess-webgl.js?')},function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n                    value: true\n});\nvar random = "float random(vec2 co){\\n                    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\\n                  }";\n\nexports.default = random;\n\n//# sourceURL=webpack:///./src/js/renderGraphic/render-video-stream/shaders/tools/random.js?')},function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nvar snoice = "vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}\\n                vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}\\n\\n                float snoise(vec3 v) {\\n                  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\\n                  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\\n\\n                // First corner\\n                  vec3 i  = floor(v + dot(v, C.yyy) );\\n                  vec3 x0 =   v - i + dot(i, C.xxx) ;\\n\\n                // Other corners\\n                  vec3 g = step(x0.yzx, x0.xyz);\\n                  vec3 l = 1.0 - g;\\n                  vec3 i1 = min( g.xyz, l.zxy );\\n                  vec3 i2 = max( g.xyz, l.zxy );\\n\\n                  //  x0 = x0 - 0. + 0.0 * C\\n                  vec3 x1 = x0 - i1 + 1.0 * C.xxx;\\n                  vec3 x2 = x0 - i2 + 2.0 * C.xxx;\\n                  vec3 x3 = x0 - 1. + 3.0 * C.xxx;\\n\\n                // Permutations\\n                  i = mod(i, 289.0 );\\n                  vec4 p = permute( permute( permute(\\n                            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\\n                          + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\\n                          + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\\n\\n                // Gradients\\n                // ( N*N points uniformly over a square, mapped onto an octahedron.)\\n                  float n_ = 1.0/7.0; // N=7\\n                  vec3  ns = n_ * D.wyz - D.xzx;\\n\\n                  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)\\n\\n                  vec4 x_ = floor(j * ns.z);\\n                  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\\n\\n                  vec4 x = x_ *ns.x + ns.yyyy;\\n                  vec4 y = y_ *ns.x + ns.yyyy;\\n                  vec4 h = 1.0 - abs(x) - abs(y);\\n\\n                  vec4 b0 = vec4( x.xy, y.xy );\\n                  vec4 b1 = vec4( x.zw, y.zw );\\n\\n                  vec4 s0 = floor(b0)*2.0 + 1.0;\\n                  vec4 s1 = floor(b1)*2.0 + 1.0;\\n                  vec4 sh = -step(h, vec4(0.0));\\n\\n                  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\\n                  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\\n\\n                  vec3 p0 = vec3(a0.xy,h.x);\\n                  vec3 p1 = vec3(a0.zw,h.y);\\n                  vec3 p2 = vec3(a1.xy,h.z);\\n                  vec3 p3 = vec3(a1.zw,h.w);\\n\\n                //Normalise gradients\\n                  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\\n                  p0 *= norm.x;\\n                  p1 *= norm.y;\\n                  p2 *= norm.z;\\n                  p3 *= norm.w;\\n\\n                // Mix final noise value\\n                  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\\n                  m = m * m;\\n                  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\\n                                                dot(p2,x2), dot(p3,x3) ) );\\n                }";\n\nexports.default = snoice;\n\n//# sourceURL=webpack:///./src/js/renderGraphic/render-video-stream/shaders/tools/snoice.js?')},function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _snoice = __webpack_require__(5);\n\nvar _snoice2 = _interopRequireDefault(_snoice);\n\nvar _random = __webpack_require__(4);\n\nvar _random2 = _interopRequireDefault(_random);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar fsSource = 'precision highp float;\\n                  varying vec2 v_texcoord;\\n                  uniform sampler2D u_texture;\\n                  uniform vec2 u_resolution;\\n                  uniform float u_time;\\n                  uniform float u_audio_power;\\n\\n                  const float interval = 3.0;\\n\\n                  ' + _snoice2.default + '\\n                  ' + _random2.default + '\\n\\n                  void main() {\\n                    float strength = smoothstep(interval * 0.5, interval, interval - mod(u_time + u_audio_power * 10000.0, interval));\\n\\n                    vec2 shake = vec2(strength * 8.0 + 0.5) * vec2(\\n                      random(vec2(u_time)) * 2.0 - 1.0,\\n                      random(vec2(u_time * 2.0)) * 2.0 - 1.0\\n                    ) / u_resolution;\\n\\n                    float y = v_texcoord.y * u_resolution.y;\\n                    float rgbWave = (\\n                      snoise(vec3(0.0, y * 0.01, u_time * 400.0)) * (2.0 + strength * 32.0)\\n                      * snoise(vec3(0.0, y * 0.02, u_time * 200.0)) * (1.0 + strength * 4.0)\\n                      + step(0.9995, sin(y * 0.005 + u_time * 1.6)) * 12.0\\n                      + step(0.9999, sin(y * 0.005 + u_time * 2.0)) * -18.0\\n                    ) / u_resolution.x;\\n                    float rgbDiff = (6.0 + sin(u_time * 500.0 + v_texcoord.y * 40.0) * (20.0 * strength + 1.0)) / u_resolution.x;\\n                    float rgbUvX = v_texcoord.x + rgbWave;\\n                    float r = texture2D(u_texture, vec2(rgbUvX + rgbDiff, v_texcoord.y) + shake).r;\\n                    float g = texture2D(u_texture, vec2(rgbUvX, v_texcoord.y) + shake).g;\\n                    float b = texture2D(u_texture, vec2(rgbUvX - rgbDiff, v_texcoord.y) + shake).b;\\n                    float grayScale = (r + g + b) / 3.0;\\n\\n                    float whiteNoise = (random(v_texcoord + mod(u_time, 10.0)) * 2.0 - 1.0) * (0.1 + strength * 0.15);\\n\\n                    float bnTime = floor(u_time * 20.0) * 200.0;\\n                    float noiseX = step((snoise(vec3(0.0, v_texcoord.x * 3.0, bnTime)) + 1.0) / 2.0, 0.12 + strength * 0.3);\\n                    float noiseY = step((snoise(vec3(0.0, v_texcoord.y * 3.0, bnTime)) + 1.0) / 2.0, 0.12 + strength * 0.3);\\n                    float bnMask = noiseX * noiseY;\\n                    float bnUvX = v_texcoord.x + sin(bnTime) * 0.2;\\n                    float bnR = texture2D(u_texture, vec2(bnUvX + rgbDiff, v_texcoord.y)).r * bnMask;\\n                    float bnG = texture2D(u_texture, vec2(bnUvX, v_texcoord.y)).g * bnMask;\\n                    float bnB = texture2D(u_texture, vec2(bnUvX - rgbDiff, v_texcoord.y)).b * bnMask;\\n                    vec4 blockNoise = vec4(bnR, 0, 0, 1.0);\\n\\n                    float bnTime2 = floor(u_time * 25.0) * 300.0;\\n                    float noiseX2 = step((snoise(vec3(0.0, v_texcoord.x * 2.0, bnTime2)) + 1.0) / 2.0, 0.12 + strength * 0.5);\\n                    float noiseY2 = step((snoise(vec3(0.0, v_texcoord.y * 8.0, bnTime2)) + 1.0) / 2.0, 0.12 + strength * 0.3);\\n                    float bnMask2 = noiseX2 * noiseY2;\\n                    float bnR2 = texture2D(u_texture, vec2(bnUvX + rgbDiff, v_texcoord.y)).r * bnMask2;\\n                    float bnG2 = texture2D(u_texture, vec2(bnUvX, v_texcoord.y)).g * bnMask2;\\n                    float bnB2 = texture2D(u_texture, vec2(bnUvX - rgbDiff, v_texcoord.y)).b * bnMask2;\\n                    vec4 blockNoise2 = vec4(bnR2, 0, 0, 1.0);\\n\\n                    float waveNoise = (sin(v_texcoord.y * 1200.0) + 1.0) / 2.0 * (0.1 + strength * 0.1);\\n\\n                    // gl_FragColor = vec4(grayScale, 0, 0, 1.0) * (1.0 - bnMask - bnMask2) + (whiteNoise + blockNoise + blockNoise2 - waveNoise);\\n                    gl_FragColor = vec4(grayScale, 0, 0, 1.0);\\n                  }';\n\nexports.default = fsSource;\n\n//# sourceURL=webpack:///./src/js/renderGraphic/render-video-stream/shaders/fs-source.js?")},function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n                    value: true\n});\nvar vsSource = "attribute vec2 coordinates;\\n                    attribute vec2 texture_coordinates;\\n                    varying vec2 v_texcoord;\\n                    void main() {\\n                      gl_Position = vec4(coordinates, 0.0, 1.0);\\n                      v_texcoord = texture_coordinates;\\n                    }";\n\nexports.default = vsSource;\n\n//# sourceURL=webpack:///./src/js/renderGraphic/render-video-stream/shaders/vs-source.js?')},function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _uniformModel = __webpack_require__(0);\n\nvar _uniformModel2 = _interopRequireDefault(_uniformModel);\n\nvar _vsSource = __webpack_require__(7);\n\nvar _vsSource2 = _interopRequireDefault(_vsSource);\n\nvar _fsSource = __webpack_require__(6);\n\nvar _fsSource2 = _interopRequireDefault(_fsSource);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar uniforms = _uniformModel2.default;\n\nfunction prepareWebGL(gl) {\n  var program = gl.createProgram();\n\n  var vertexShader = gl.createShader(gl.VERTEX_SHADER);\n  gl.shaderSource(vertexShader, _vsSource2.default);\n  gl.compileShader(vertexShader);\n\n  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);\n  gl.shaderSource(fragmentShader, _fsSource2.default);\n  gl.compileShader(fragmentShader);\n\n  gl.attachShader(program, vertexShader);\n  gl.attachShader(program, fragmentShader);\n\n  gl.linkProgram(program);\n  gl.useProgram(program);\n\n  var positionLocation = gl.getAttribLocation(program, 'coordinates');\n  var texcoordLocation = gl.getAttribLocation(program, 'texture_coordinates');\n  uniforms.time = gl.getUniformLocation(program, 'u_time');\n  uniforms.resolution = gl.getUniformLocation(program, 'u_resolution');\n  uniforms.audioPower = gl.getUniformLocation(program, 'u_audio_power');\n\n  var vsBuffer = gl.createBuffer();\n  var vertices = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];\n\n  gl.bindBuffer(gl.ARRAY_BUFFER, vsBuffer);\n  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);\n  gl.enableVertexAttribArray(positionLocation);\n  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);\n\n  var txBuffer = gl.createBuffer();\n  var textureCoordinates = [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0];\n\n  gl.bindBuffer(gl.ARRAY_BUFFER, txBuffer);\n  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);\n  gl.enableVertexAttribArray(texcoordLocation);\n  gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);\n\n  var texture = gl.createTexture();\n  gl.bindTexture(gl.TEXTURE_2D, texture);\n  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);\n  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);\n  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);\n  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);\n}\n\nexports.default = prepareWebGL;\n\n//# sourceURL=webpack:///./src/js/renderGraphic/render-video-stream/prepare-webgl.js?")},function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Point = function () {\n  function Point(canvasEl, pos) {\n    _classCallCheck(this, Point);\n\n    this.canvas = canvasEl;\n    this.vpx = this.canvas.width / 2;\n    this.vpy = this.canvas.height / 2;\n\n    this.x = pos.x - this.vpx || 0;\n    this.y = pos.y - this.vpy || 0;\n    this.z = pos.z || 0;\n\n    this.cX = 0;\n    this.cY = 0;\n    this.cZ = 0;\n\n    this.xPos = 0;\n    this.yPos = 0;\n    this.map2D();\n  }\n\n  _createClass(Point, [{\n    key: 'rotateZ',\n    value: function rotateZ(angleZ) {\n      var cosZ = Math.cos(angleZ);\n      var sinZ = Math.sin(angleZ);\n      var x1 = this.x * cosZ - this.y * sinZ;\n      var y1 = this.y * cosZ + this.x * sinZ;\n\n      this.x = x1;\n      this.y = y1;\n    }\n  }, {\n    key: 'map2D',\n    value: function map2D() {\n      var scaleX = this.vpx / (this.vpx + this.z + this.cZ);\n      var scaleY = this.vpx / (this.vpx + this.z + this.cZ);\n\n      this.xPos = this.vpx + (this.cX + this.x) * scaleX;\n      this.yPos = this.vpy + (this.cY + this.y) * scaleY;\n    }\n  }]);\n\n  return Point;\n}();\n\nvar Square = function () {\n  function Square(canvasEl, z) {\n    _classCallCheck(this, Square);\n\n    this.canvas = canvasEl;\n    this.ctx = this.canvas.getContext('2d');\n\n    this.z = z || 0;\n\n    this.vpx = this.canvas.width / 2;\n    this.vpy = this.canvas.height / 2;\n\n    this.width = this.canvas.width / 6;\n    this.height = this.canvas.height / 3;\n    this.points = [new Point(this.canvas, {\n      x: this.vpx - this.width,\n      y: this.vpy - this.height,\n      z: this.z\n    }), new Point(this.canvas, {\n      x: this.vpx + this.width,\n      y: this.vpy - this.height,\n      z: this.z\n    }), new Point(this.canvas, {\n      x: this.vpx + this.width,\n      y: this.vpy + this.height,\n      z: this.z\n    }), new Point(this.canvas, {\n      x: this.vpx - this.width,\n      y: this.vpy + this.height,\n      z: this.z\n    })];\n    this.dist = 0;\n  }\n\n  _createClass(Square, [{\n    key: 'update',\n    value: function update() {\n      for (var p = 0; p < this.points.length; p++) {\n        this.points[p].rotateZ(0.002);\n        this.points[p].z -= 3;\n        if (this.points[p].z < -300) {\n          this.points[p].z = 2700;\n        }\n        this.points[p].map2D();\n      }\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      this.ctx.beginPath();\n      this.ctx.moveTo(this.points[0].xPos, this.points[0].yPos);\n      for (var p = 1; p < this.points.length; p++) {\n        if (this.points[p].z > -(this.vpx - 50)) {\n          this.ctx.lineTo(this.points[p].xPos, this.points[p].yPos);\n        }\n      }\n\n      this.ctx.closePath();\n      this.ctx.stroke();\n\n      this.dist = this.points[this.points.length - 1].z;\n    }\n  }]);\n\n  return Square;\n}();\n\n// Init graphics stuff\n\n\nvar squares = [];\nvar canvas = document.getElementById('canvasSquare');\nvar ctx = canvas.getContext('2d');\nfunction render() {\n  ctx.clearRect(4, 4, canvas.width - 8, canvas.height - 8);\n\n  squares.sort(function (a, b) {\n    return b.dist - a.dist;\n  });\n\n  for (var i = 0, len = squares.length; i < len; i++) {\n    squares[i].update();\n    squares[i].render();\n  }\n  requestAnimationFrame(render);\n}\n\nfunction renderSquareMap() {\n  for (var i = 0; i < 15; i++) {\n    squares.push(new Square(canvas, -300 + i * 200));\n  }\n\n  ctx.strokeStyle = '#fff';\n  ctx.lineWidth = 8;\n  ctx.strokeRect(0, 0, canvas.width, canvas.height);\n  ctx.lineWidth = 2;\n  render();\n}\n\nexports.default = renderSquareMap;\n\n//# sourceURL=webpack:///./src/js/renderGraphic/render-interface/modules/render-square-map.js?")},function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nfunction renderSpectrum(array, ctx, startX) {\n  var lineStep = 5;\n  var lineHeight = 15;\n  for (var i = 0; i < array.length; i++) {\n    var value = array[i];\n    var lineX = i * lineStep;\n    ctx.fillRect(startX + lineX, 0 + value, 3, lineHeight);\n  }\n}\n\nexports.default = renderSpectrum;\n\n//# sourceURL=webpack:///./src/js/renderGraphic/render-interface/modules/render-spectrum.js?')},function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar it = 0;\nfunction renderWords(ctx, text, fz, width, height) {\n  var lineHeight = 16;\n  var textBase = height / 4; // базовая высота отрисовки текста\n  if (it === text.length) {\n    setTimeout(function () {\n      ctx.clearRect(0, 0, width / 2, height);\n      it = 0;\n    }, 1000);\n    return false;\n  }\n  ctx.fillStyle = '#fff';\n  ctx.font = fz + 'px Apple';\n  ctx.fillText(text[it], 20, textBase + lineHeight * it);\n  it += 1;\n\n  return true;\n}\n\nexports.default = renderWords;\n\n//# sourceURL=webpack:///./src/js/renderGraphic/render-interface/modules/render-words.js?")},function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nfunction getSeveralRandomInt(f, min, max, q) {\n  var nums = '';\n  var it = 0;\n  while (it !== q) {\n    nums += f(min, max);\n    it += 1;\n  }\n  return nums;\n}\n\nfunction genCharArray(charA, charZ) {\n  var a = [];\n  var i = charA.charCodeAt(0);\n  var j = charZ.charCodeAt(0);\n\n  for (; i <= j; i++) {\n    a.push(String.fromCharCode(i));\n  }\n  return a;\n}\n\nfunction getRandomFromArr(arr, q, randomFunc) {\n  var randomStr = '';\n  var it = 0;\n  var randomNum = 0;\n  var randomLetter = '';\n\n  while (it !== q) {\n    randomNum = randomFunc(0, arr.length);\n    randomLetter = arr[randomNum];\n    randomStr += randomLetter;\n    it += 1;\n  }\n\n  return randomStr;\n}\n\nfunction getRandomInt(min, max) {\n  return Math.floor(Math.random() * (max - min)) + min;\n}\n\nfunction genNumArr(min, max) {\n  var nums = [];\n\n  for (var i = min; i <= max; i++) {\n    nums.push(i);\n  }\n  return nums;\n}\n\nfunction randomizeText(num) {\n  var alphabet = genCharArray('A', 'Z');\n  var nums = genNumArr(0, 9);\n  var numsWithAlphabet = nums.concat(alphabet);\n  var randomTemp = '';\n  var randomArr = [];\n\n  for (var i = 0; i <= num; i++) {\n    var firstPart = getSeveralRandomInt(getRandomInt, 0, 10, 2);\n    var secondPart = getRandomFromArr(alphabet, 6, getRandomInt);\n    var thirdPart = getRandomFromArr(numsWithAlphabet, 2, getRandomInt);\n    var foutrhPart = getSeveralRandomInt(getRandomInt, 0, 10, 2);\n    randomTemp = firstPart + ' ' + secondPart + ' ' + thirdPart + ' ' + foutrhPart;\n    randomArr.push(randomTemp);\n  }\n  return randomArr;\n}\n\nexports.default = randomizeText;\n\n//# sourceURL=webpack:///./src/js/renderGraphic/render-interface/utils/rondomize-text.js?")},function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _rondomizeText = __webpack_require__(12);\n\nvar _rondomizeText2 = _interopRequireDefault(_rondomizeText);\n\nvar _renderWords = __webpack_require__(11);\n\nvar _renderWords2 = _interopRequireDefault(_renderWords);\n\nvar _renderSpectrum = __webpack_require__(10);\n\nvar _renderSpectrum2 = _interopRequireDefault(_renderSpectrum);\n\nvar _renderSquareMap = __webpack_require__(9);\n\nvar _renderSquareMap2 = _interopRequireDefault(_renderSquareMap);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction renderInterface(canvasEl, audioAnalyser, audioData) {\n  var canvas = canvasEl;\n  var ctx = canvas.getContext('2d');\n  var demo = document.querySelector('.demo');\n  canvas.width = demo.offsetWidth;\n  canvas.height = demo.offsetHeight;\n  var canvasWidth = canvas.width;\n  var canvasHeight = canvas.height;\n  var fz = 8; // font-size\n  var magicBase = 22;\n\n  var analyser = audioAnalyser;\n  var analyserStartX = canvasWidth / 1.5;\n\n  function render() {\n    var sampleArr = (0, _rondomizeText2.default)(magicBase);\n    (0, _renderWords2.default)(ctx, sampleArr, fz, canvasWidth, canvasHeight);\n\n    analyser.getByteFrequencyData(audioData);\n    ctx.clearRect(analyserStartX, 0, canvasWidth, canvasHeight / 2);\n    (0, _renderSpectrum2.default)(audioData, ctx, analyserStartX);\n\n    requestAnimationFrame(render);\n  }\n  render();\n  (0, _renderSquareMap2.default)();\n}\n\nexports.default = renderInterface;\n\n//# sourceURL=webpack:///./src/js/renderGraphic/render-interface/index.js?")},function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _index = __webpack_require__(13);\n\nvar _index2 = _interopRequireDefault(_index);\n\nvar _prepareWebgl = __webpack_require__(8);\n\nvar _prepareWebgl2 = _interopRequireDefault(_prepareWebgl);\n\nvar _postprocessWebgl = __webpack_require__(3);\n\nvar _postprocessWebgl2 = _interopRequireDefault(_postprocessWebgl);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar canvasBackLayer = document.getElementById('canvasBackLayer');\n\nfunction renderGraphic(canvas, gl, video, audioAnalyser) {\n  var PREVIOUS_T = 0;\n\n  if (!gl) {\n    alert('Ваш браузер слишком стар для этого.');\n    return;\n  }\n\n  var analyser = audioAnalyser;\n  analyser.fftSize = 512;\n  var bufferLength = analyser.fftSize;\n  var dataArray = new Uint8Array(bufferLength);\n  analyser.getByteFrequencyData(dataArray);\n\n  (0, _index2.default)(canvasBackLayer, analyser, dataArray);\n\n  function mainLoop(t) {\n    var delta = t - PREVIOUS_T;\n    PREVIOUS_T = t;\n\n    analyser.getByteFrequencyData(dataArray);\n\n    (0, _postprocessWebgl2.default)(canvas, gl, video, delta, dataArray);\n    requestAnimationFrame(mainLoop);\n  }\n\n  (0, _prepareWebgl2.default)(gl);\n  requestAnimationFrame(mainLoop);\n}\n\nexports.default = renderGraphic;\n\n//# sourceURL=webpack:///./src/js/renderGraphic/index.js?")},function(module,exports,__webpack_require__){"use strict";eval("\n\nvar _index = __webpack_require__(14);\n\nvar _index2 = _interopRequireDefault(_index);\n\nvar _analyser = __webpack_require__(2);\n\nvar _analyser2 = _interopRequireDefault(_analyser);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar canvas = document.getElementById('canvasStreaming');\nvar gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');\nvar video = document.getElementById('player');\n\nvar navigatorConfig = {\n  audio: false,\n  video: {\n    width: window.innerWidth,\n    height: window.innerHeight\n  }\n};\n\nnavigator.mediaDevices.getUserMedia(navigatorConfig).then(function (stream) {\n  video.src = URL.createObjectURL(stream);\n  (0, _index2.default)(canvas, gl, video, _analyser2.default);\n});\n\n//# sourceURL=webpack:///./src/js/index.js?")},function(module,exports,__webpack_require__){eval("__webpack_require__(15);\nmodule.exports = __webpack_require__(1);\n\n\n//# sourceURL=webpack:///multi_./src/js/index.js_./src/scss/style.scss?")}]);