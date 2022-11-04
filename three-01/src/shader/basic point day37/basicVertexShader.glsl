attribute float textureIndex;

varying float vTextureIndex;

void main(){
   gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
   gl_PointSize = 50.0;
   vTextureIndex = textureIndex;
}