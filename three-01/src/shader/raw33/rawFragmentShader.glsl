precision lowp float;

varying vec4 mPosition;
varying vec3 lPosition;

void main()
{
   vec3 redColor = vec3(1.0,0.0,0.0);
   vec3 yellowColor = vec3(1.0,1.0,0.0);
   vec3 mixColor;
   if(gl_FrontFacing){
      //越高越暗
      mixColor = mix(yellowColor,redColor,0.5+lPosition/3.0)/mPosition.y*20.0;
   }else{
      mixColor = mix(yellowColor,redColor,lPosition/3.0);
   }
   gl_FragColor = vec4(mixColor,1.0);
}


