precision lowp float;

// 接收高度，颜色渐变

varying float vheight;
uniform float hscale;

void main()
{
   float colorDown =0.2*(hscale*0.5 + vheight)/hscale +0.2;
   gl_FragColor = vec4(colorDown,colorDown,0.0,1.0);
}


