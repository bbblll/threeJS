precision lowp float;
varying vec2 vUv;

uniform float utime;


void main()
{
   // 带蓝色的彩色画布
   // gl_FragColor = vec4(vUv,1,0.5);

   // x轴黑白渐变
   // float strenth = vUv.x;
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // y轴黑白渐变
   // float strenth = vUv.y;
   // gl_FragColor = vec4(strenth,strenth,strenth,1);
   // y轴黑白渐变(逆向)
   // float strenth =1.0- vUv.y;
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // y轴取模,多层渐变
   // float strenth =1.0- vUv.y;
   // strenth = mod(strenth*10.0,1.0);
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // step（y斑马纹）
   // float strenth =1.0- vUv.y;
   // strenth = step(0.5,mod(strenth*10.0,1.0));
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // step（x斑马纹）
   // float strenth =1.0- vUv.x;
   // strenth = step(0.5,mod(strenth*10.0,1.0));
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 条纹相加（或）
   // float strenthX =vUv.x;
   // strenthX = step(0.6,mod(strenthX*10.0,1.0));
   // float strenthY =vUv.y;
   // strenthY = step(0.6,mod(strenthY*10.0,1.0));
   // float strenth = step(1.0,strenthX+strenthY);
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 条纹相乘（与）
   // float strenthX =vUv.x;
   // strenthX = step(0.6,mod(strenthX*10.0,1.0));
   // float strenthY =vUv.y;
   // strenthY = step(0.6,mod(strenthY*10.0,1.0));
   // float strenth = step(1.0,strenthX*strenthY);
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // T
   // float strenthX_1 = step(0.8,mod(vUv.x*10.0-0.05+utime,1.0));
   // float strenthY_1 = step(0.4,mod(vUv.y*10.0+0.5,1.0));
   // float strenth_1 = step(1.0,strenthX_1 - strenthY_1);

   // float strenthX_2 = step(0.5,mod(vUv.x*10.0+0.3+utime,1.0));
   // float strenthY_2 = step(0.8,mod(vUv.y*10.0,1.0));
   // float strenth_2 = step(1.0,strenthY_2-strenthX_2);

   // float strenth = strenth_1 + strenth_2;

   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 对称渐变
   // float strenth = abs(vUv.x-0.5);
   // gl_FragColor = vec4(strenth,strenth,strenth,1);

   // 对称渐变2
   float strenth =0.5 - abs(vUv.x-0.5);
   gl_FragColor = vec4(strenth,strenth,strenth,1);
}