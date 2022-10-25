precision lowp float;
attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;


uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float utime;


void main()
   {
      vUv = uv;
      vec4 modelMatrixVec = modelMatrix* vec4( position, 1.0 );
      gl_Position = projectionMatrix * viewMatrix *modelMatrixVec;
   }