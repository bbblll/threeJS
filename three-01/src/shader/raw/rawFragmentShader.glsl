precision lowp float;

// 接收高度，颜色渐变

varying float vheight;
uniform float hscale;

uniform float uopacity;
uniform vec3 highcolor;
uniform vec3 lowcolor;


void main()
{
   float colorDown =0.2*(hscale*0.5 + vheight)/hscale +0.4;
   vec3 mixColor = mix(highcolor,lowcolor,colorDown);
   gl_FragColor = vec4(mixColor,uopacity*colorDown);
}


