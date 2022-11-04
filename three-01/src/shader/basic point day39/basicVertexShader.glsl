attribute vec3 direction;

uniform float utime;
void main(){
   vec4 modelPosition = modelMatrix * vec4( position, 1.0 );
   modelPosition.xyz += direction*utime;
   vec4 viewPosition = viewMatrix * modelPosition;

   gl_Position = projectionMatrix * viewPosition;
   gl_PointSize = 100.0/-viewPosition.z;
}