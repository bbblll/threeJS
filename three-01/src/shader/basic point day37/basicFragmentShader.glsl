uniform sampler2D utexture;
uniform sampler2D utexture1;
uniform sampler2D utexture2;

varying float vTextureIndex;

void main(){
   vec4 textureColor;
   if(vTextureIndex == 1.0){
      textureColor = texture2D(
      utexture,
      gl_PointCoord
   );
   }else if(vTextureIndex == 0.0){
      textureColor = texture2D(
      utexture1,
      gl_PointCoord
   );
   }else{
      textureColor = texture2D(
      utexture2,
      gl_PointCoord
   );
   }
   
   gl_FragColor = vec4(gl_PointCoord,1.0,textureColor.r);
}