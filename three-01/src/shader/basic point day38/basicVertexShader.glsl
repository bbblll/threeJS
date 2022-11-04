// 计算角度
// 中间转的块（偏移角度除距离）
// 设置变换后的xz

attribute float textureIndex;
attribute float aScale;
uniform float utime;

varying float vTextureIndex;
varying vec3 vcolor;

void main(){
   vec4 modelPosition = modelMatrix*vec4( position, 1.0 );
   vTextureIndex = textureIndex;
   vcolor = color;
   
   float angle = atan(modelPosition.x,modelPosition.z);
   float distanceToCenter = length(modelPosition.xz);
   angle = angle - 10.0*utime/(distanceToCenter+0.1);
   modelPosition.x = distanceToCenter*cos(angle);
   modelPosition.z = distanceToCenter*sin(angle);

   vec4 viewPosition = viewMatrix*modelPosition;
   gl_Position = projectionMatrix * viewPosition;

   gl_PointSize = 100.0/-viewPosition.z*aScale;
   
}