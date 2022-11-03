precision lowp float;

varying vec4 mPosition;
varying vec3 lPosition;


// 将modelPosition传给片元着色器（世界坐标）
// 将局部坐标传给片元着色器
// 按照高度从上到下混合（红，黄）

// 设置外部着色gl_FrontFacing,boolean
//关掉透明度
// 飞的越高越暗

void main()
   {
      mPosition = modelMatrix* vec4( position, 1.0 );
      lPosition = position;
      gl_Position = projectionMatrix * viewMatrix *mPosition;
   }