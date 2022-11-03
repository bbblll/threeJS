precision lowp float;

// y沿着（x*z）起伏，三角函数 （这里会有个鸡蛋盒子的效果，和相加有点像）
// 添加xz为输入的噪声
// 传递高度给片元着色器
// 噪音绝对值
uniform float xzfrequency;
uniform float hscale;
uniform float xzscale;
uniform float nfrequency;
uniform float nscale;
uniform float utime;

uniform float xspeed;
uniform float yspeed;
uniform float nspeed;








varying float vheight;

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
      vec4 mPosition = modelMatrix* vec4( position, 1.0 );
      vheight = sin(mPosition.x*xzfrequency+utime*xspeed)*sin(mPosition.y*xzfrequency*xzscale+utime*yspeed)*hscale;
      vheight += -abs(noise(mPosition.xy*nfrequency+utime*nspeed))*nscale;
      mPosition.z = vheight;

      gl_Position = projectionMatrix * viewMatrix *mPosition;
   }