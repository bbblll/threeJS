uniform vec3 uColor;
void main(){
   float strength = distance(
      gl_PointCoord,
      vec2(0.5,0.5 )
   );
   strength = 3.0 - 8.0*strength;
   // gl_FragColor = vec4(gl_PointCoord*strength,1.0*strength,strength);
   gl_FragColor = vec4(uColor*strength,strength);

}