precision lowp float;
attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;
varying float vHeight;


uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float utime;


void main()
   {
      vUv = uv;
      vec4 modelMatrixVec = modelMatrix* vec4( position, 1.0 );
      modelMatrixVec.z = cos(modelMatrixVec.x*0.5 + utime*5.0);
      modelMatrixVec.z += cos(modelMatrixVec.y*0.5 + utime*5.0);
      vHeight = modelMatrixVec.z;
      gl_Position = projectionMatrix * viewMatrix *modelMatrixVec;
   }