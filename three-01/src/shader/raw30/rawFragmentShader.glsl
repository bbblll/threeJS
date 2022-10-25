precision lowp float;
varying vec2 vUv;
varying float vHeight;

void main()
{
   gl_FragColor = vec4(vUv,0.0+0.1*vHeight,0.2);
}