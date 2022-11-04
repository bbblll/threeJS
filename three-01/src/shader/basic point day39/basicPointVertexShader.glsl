attribute vec3 direction;

attribute float pointTheda;
attribute float pointFi;

uniform float utime;
uniform float pointR;



void main(){
   // vec4 modelPosition = modelMatrix*vec4( position +direction*utime*0.1, 1.0 );
   // vec3 fromPosition = vec3(0.0,0.0,0.0);

   vec4 modelPosition = modelMatrix*vec4( position, 1.0 );
   // modelPosition.xyz += utime*direction;
   float xzR = utime*pointR*sin(pointFi);
   modelPosition.xyz += vec3(
      xzR*cos(pointTheda),
      utime*pointR*cos(pointFi),
      xzR*sin(pointTheda)
   );
   
   // pointR*sin(pointFi);
   
   // modelPosition.x += xzR*cos(pointTheda);
   // modelPosition.z += xzR*sin(pointTheda);

   vec4 viewPosition = viewMatrix*modelPosition;
   gl_Position = projectionMatrix * viewPosition;

   gl_PointSize = 50.0/-viewPosition.z;
}