// 设置颜色与gl_PointCoord相关
// 设置渐变圆
// 设置圆点
uniform vec3 uColor;

void main(){
   // gl_FragColor = vec4(gl_PointCoord,0.0,1.0);

   float strength = distance(
      gl_PointCoord,
      vec2(0.5,0.5)
   );
   strength *= 4.0;
   strength = 2.0 - strength;

   // strength =1.0 - step(0.5, strength);

   gl_FragColor = vec4(uColor,strength);
}