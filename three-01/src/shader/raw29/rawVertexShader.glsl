precision lowp float;
attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;


void main()
   {
      vUv = uv;
      gl_Position = projectionMatrix * viewMatrix *modelMatrix* vec4( position, 1.0 );
   }