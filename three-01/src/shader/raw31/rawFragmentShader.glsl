precision lowp float;
varying vec2 vUv;
varying float vHeight;

uniform sampler2D utexture;

void main()
{
   // gl_FragColor = vec4(vUv,0.0+0.1*vHeight,0.2);
   vec4 textureColor = texture2D(utexture,vUv);
   gl_FragColor = textureColor*(vHeight*0.03+0.97);

}