precision lowp float;
varying vec2 vUv;

uniform float utime;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
   vec2(12.9898,78.233)))*
   43758.5453123);
}

vec2 rotate(vec2 uv,float rotation,vec2 mid){
   return vec2(
      cos(rotation)*(uv.x - mid.x) + sin(rotation)*(uv.y - mid.y)+mid.x,
      cos(rotation)*(uv.y - mid.y) - sin(rotation)*(uv.x - mid.x)+mid.y
   );
}

void main()
{
   // 绘制圆
   // float strenth = step(0.2,distance(vUv,vec2(0.5,0.5)));
   // gl_FragColor = vec4(strenth,strenth,strenth,1);
    // 圆环（相乘）
   // float strenth = step(0.2,distance(vUv,vec2(0.5,0.5)));
   // strenth*=1.0-step(0.3,distance(vUv,vec2(0.5,0.5)));
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 圆环（绝对值）
   // float strenth = step(0.01,abs(distance(vUv,vec2(0.5,0.5))-0.3));
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 圆环（绝对值）
   // float strenth = step(0.01,
   // mod(abs(distance(vUv,vec2(0.5,0.5))-0.3),0.1)
   // );
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // // 诡异图案
   // vec2 new_uv = vec2(
   //    vUv.x,
   //    vUv.y + sin(vUv.x*100.0)*0.1
   // );
   // float strenth = step(0.01,abs(distance(new_uv,vec2(0.5,0.5))-0.3));
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 诡异图案
   // vec2 new_uv = vec2(
   //    vUv.x + sin(vUv.y*100.0)*0.1,
   //    vUv.y + sin(vUv.x*100.0)*0.1
   // );
   // float strenth = step(0.01,abs(distance(new_uv,vec2(0.5,0.5))-0.3));
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 反三角函数，设置角度渐变
   // float strenth = atan(vUv.y, vUv.x);
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 反三角函数，设置角度渐变，改编中中心
   // float strenth = atan(vUv.y-0.5, vUv.x-0.5);
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 设置角度渐变，全角度渐变,函数会根据输入，得到(-pI,pI)之间的值
   // float strenth = (atan(vUv.y-0.5, vUv.x-0.5)+3.14)/6.28;
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 雷达
   // float alpha = step(0.6,1.0-distance(vUv,vec2(0.5,0.5)));
   // float strenth = alpha*(0.8*(atan(vUv.y-0.5, vUv.x-0.5)+3.14)/6.28);
   // gl_FragColor = vec4(strenth,strenth,strenth,alpha);

   // 雷达旋转
   // vec2 new_uv = rotate(vUv,utime*5.0,vec2(0.5));
   // float alpha = step(0.6,1.0-distance(new_uv,vec2(0.5,0.5)));
   // float strenth = alpha*(0.8*(atan(new_uv.y-0.5, new_uv.x-0.5)+3.14)/6.28);
   // gl_FragColor = vec4(strenth,strenth,strenth,alpha);

   // 万花筒
   // float alpha = step(0.6,1.0-distance(vUv,vec2(0.5,0.5)));
   // float strenth = alpha*(0.8*(atan(vUv.y-0.5, vUv.x-0.5)+3.14)/6.28);
   // strenth = mod(strenth*30.0,0.8);
   // gl_FragColor = vec4(strenth,strenth,strenth,alpha);

   // 万花筒sin
   float alpha = step(0.6,1.0-distance(vUv,vec2(0.5,0.5)));
   float strenth = alpha*(0.8*(atan(vUv.y-0.5, vUv.x-0.5)+3.14)/6.28);
   strenth = sin(strenth*100.0);
   gl_FragColor = vec4(strenth,strenth,strenth,alpha);
}

// 绘制圆
// 圆环（相乘）
// 圆环（绝对值）
// 多重圆环
// 诡异图案
// 反三角函数，设置角度渐变，改编中中心
// 设置角度渐变，全角度渐变
// 雷达
// 雷达旋转（旋转uv）
// 万花筒，
// 万花筒sin