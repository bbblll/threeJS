precision lowp float;
varying vec2 vUv;

uniform float utime;
uniform float scale;

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

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

void main()
{
   // 噪声函数
   // float strenth = noise(vUv*50.0);
   // gl_FragColor = vec4(strenth,strenth,strenth,1.0);

   // 移动
   // float strenth =abs(noise(vUv*10.0 + utime)*30.0 );
   // gl_FragColor = vec4(strenth,strenth,strenth,1.0);

   // 取绝对值
   // float strenth =abs(noise(vUv*10.0)*scale );
   // gl_FragColor = vec4(strenth,strenth,strenth,1.0);

   // 发光路径，取反
   // float strenth =1.0-abs(noise(vUv*30.0)*10.0 );
   // gl_FragColor = vec4(strenth,strenth,strenth,1.0);

   // sin（水波纹）
   // float strenth =sin(noise(vUv*10.0)*20.0+utime*5.0 );
   // gl_FragColor = vec4(strenth,strenth,strenth,1.0);

   // 颜色混合（黑，黄）
   // float strenth =step(0.95,1.0-abs(noise(vUv*20.0)*10.0 ));

   // vec3 color_1 = vec3(0.0, 0.0, 0.0);
   // vec3 color_2 = vec3(1.0, 1.0, 0.0);
   // vec3 mix_color = mix(color_1,color_2,strenth);

   // gl_FragColor = vec4(mix_color,1.0);

   // 混合颜色（uv，白）
   float strenth = step(0.5,1.0-abs(noise(vUv*20.0)*10.0 ));

   vec3 color_1 = vec3(0.7,0.7, 0.7);
   vec3 color_2 = vec3(1.0,vUv);
   vec3 mix_color = mix(color_1,color_2,strenth);

   gl_FragColor = vec4(mix_color,1.0);
}

// 噪声函数
// 取绝对值
// 发光路径，取反
// sin
// 加时间（水波纹）
// 颜色混合（黑，黄）
// 混合颜色（uv，白）