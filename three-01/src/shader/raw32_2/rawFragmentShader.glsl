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
   // 十字架对称渐变min
   // float strenth =min(abs(vUv.x-0.5),abs(vUv.y-0.5));
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 十字架对称渐变max
   // float strenth =max(abs(vUv.x-0.5),abs(vUv.y-0.5));
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 十字架对称渐变max
   // float strenth =1.0-max(abs(vUv.x-0.5),abs(vUv.y-0.5));
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 方形框 step
   // float strenth =step(0.3,max(abs(vUv.x-0.5),abs(vUv.y-0.5)));
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 小方框 step
   // float strenth =1.0-step(0.3,max(abs(vUv.x-0.5),abs(vUv.y-0.5)));
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 阶梯渐变floor，ceil
   // float strenth = floor(vUv.x*10.0)/10.0;
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 格子渐变floor，ceil
   // float strenth = ceil(vUv.x*10.0)/10.0 * ceil(vUv.y*10.0)/10.0;
   // gl_FragColor = vec4(strenth,strenth,0.2,1);

   // 随机效果(并不是真正的随机，同输入情况下会得到同输出)
   // float strenth = random(vUv);
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 随机格子
   // float strenth = ceil(vUv.x*10.0)/10.0 * ceil(vUv.y*10.0)/10.0;
   // strenth = random(vec2(strenth,strenth));
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 外亮中黑
   // float strenth = 1.0-distance(vUv, vec2(0.5,0.5));
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 外黑中亮
   // float strenth = distance(vUv, vec2(0.5,0.5));
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 外黑中亮
   // float strenth =0.15/distance(vUv, vec2(0.5,0.5));
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 小太阳
   // float strenth =0.08/distance(vUv, vec2(0.5,0.5)) - 0.5;
   // gl_FragColor = vec4(strenth,strenth,strenth,strenth);

   // 拉伸,(想保持图像位置，还得改变中心位置)
   // float strenth =0.08/distance(vec2(vUv.x,vUv.y*5.0), vec2(0.5,2.5)) - 0.5;
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 位移
   // float strenth =0.08/distance(vUv, vec2(0.5,0.5+0.1)) - 0.5;
   // gl_FragColor = vec4(strenth,strenth,strenth,strenth);

   // 十字星
   // float strenth =0.05/distance(vec2(vUv.x,vUv.y*5.0), vec2(0.5,2.5)) - 0.5;
   // strenth+=0.05/distance(vec2(vUv.x*5.0,vUv.y), vec2(2.5,0.5)) - 0.5;
   // gl_FragColor = vec4(strenth,strenth,strenth,strenth);

   // 十字星旋转
   // vec2 rotate_uv = rotate(vUv,utime,vec2(0.5,0.5));
   // float strenth =0.05/distance(vec2(rotate_uv.x,rotate_uv.y*5.0), vec2(0.5,2.5)) - 0.5;
   // strenth+=0.05/distance(vec2(rotate_uv.x*5.0,rotate_uv.y), vec2(2.5,0.5)) - 0.5;
   // gl_FragColor = vec4(strenth,strenth,strenth,strenth);

   // 十字星高速旋转
   vec2 rotate_uv = rotate(vUv,utime*10.0,vec2(0.5,0.5));
   float strenth =0.05/distance(vec2(rotate_uv.x,rotate_uv.y*5.0), vec2(0.5,2.5)) - 0.5;
   strenth+=0.05/distance(vec2(rotate_uv.x*5.0,rotate_uv.y), vec2(2.5,0.5)) - 0.5;
   gl_FragColor = vec4(strenth,strenth,strenth,strenth);

}

// 十字架对称渐变min，max
// 星星
// 方形框 step
// 阶梯渐变floor，ceil
// 条纹相乘，格子渐变
// 随机效果，随机格子
// 向量长度，设置渐变length
// 点之间距离，设置渐变distance(外黑中亮，外亮中黑)
// 相除实现光晕效果
// 小太阳，减去常数，设置透明度
// 拉伸，偏移
// 十字星
// 十字星旋转
// 十字星高速旋转