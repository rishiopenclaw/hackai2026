import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const FLUID_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Molten Amber - Orange</title>
  <style>
    html, body { margin:0; padding:0; width:100%; height:100%; overflow:hidden; background:#120a05; }
    canvas { width:100%; height:100%; display:block; }
  </style>
</head>
<body>
  <canvas id="fullscreen-canvas"></canvas>
  <script>
    const vertexShaderSource = \
      'attribute vec2 position; void main(){ gl_Position = vec4(position,0.0,1.0); }';

    const fragmentShaderSource = \
      'precision highp float;\n' +
      'uniform vec2 u_resolution; uniform float u_time; uniform vec3 u_bg; uniform vec3 u_c1; uniform vec3 u_c2; uniform vec3 u_c3;\n' +
      'vec3 mod289(vec3 x){ return x-floor(x*(1.0/289.0))*289.0; } vec4 mod289(vec4 x){ return x-floor(x*(1.0/289.0))*289.0; }\n' +
      'vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); } vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159-0.85373472095314*r; }\n' +
      'float snoise(vec3 v){ const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0); vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx); vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy); vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy; i=mod289(i); vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0)); float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx; vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_); vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y); vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw); vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0)); vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww; vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w); vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3))); p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w; vec4 m=max(0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m; return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3))); }\n' +
      'float getSurface(vec2 p,float t){ vec2 q=vec2(snoise(vec3(p*0.7,t*0.4)),snoise(vec3(p*0.7+vec2(5.2,1.3),t*0.4))); vec2 r=vec2(snoise(vec3(p*1.0+q*1.2+vec2(1.7,9.2),t*0.5)),snoise(vec3(p*1.0+q*1.2+vec2(8.3,2.8),t*0.5))); return snoise(vec3(p*1.2+r*1.2,t*0.6)); }\n' +
      'void main(){ vec2 uv=gl_FragCoord.xy/u_resolution.xy; vec2 p=uv*2.0-1.0; p.x*=u_resolution.x/u_resolution.y; float t=u_time*0.25; float angle=t*0.1; mat2 rot=mat2(cos(angle),-sin(angle),sin(angle),cos(angle)); p=rot*p; float h=getSurface(p,t); float hx=getSurface(p+vec2(0.02,0.0),t); float hy=getSurface(p+vec2(0.0,0.02),t); vec3 normal=normalize(vec3(h-hx,h-hy,0.15)); vec3 lightDir=normalize(vec3(0.5,0.8,1.0)); vec3 viewDir=vec3(0.0,0.0,1.0); vec3 halfDir=normalize(lightDir+viewDir); float diffuse=max(dot(normal,lightDir),0.0); float specular=pow(max(dot(normal,halfDir),0.0),20.0); float fresnel=pow(1.0-max(dot(normal,viewDir),0.0),3.0); vec3 colorMap=mix(u_c3,u_c2,smoothstep(-0.4,0.3,h)); colorMap=mix(colorMap,u_c1,smoothstep(0.2,0.8,h)); vec3 litColor=colorMap*(diffuse*0.45+0.55); litColor+=specular*0.15; litColor+=fresnel*u_c1*0.25; float dist=length(p); float blobWobble=snoise(vec3(p*1.0,t*0.6))*0.15; float mask=smoothstep(0.8,0.3,dist+blobWobble+h*0.1); vec2 shadowOffset=vec2(0.04,-0.04); float shadowWobble=snoise(vec3((p-shadowOffset)*1.0,t*0.6))*0.15; float shadowMask=smoothstep(0.9,0.15,length(p-shadowOffset)+shadowWobble+h*0.1); vec3 bgWithShadow=mix(u_bg,u_bg*0.85,shadowMask*0.5); vec3 finalOutput=mix(bgWithShadow,litColor,mask); gl_FragColor=vec4(finalOutput,1.0); }';

    class FluidRenderer {
      constructor(canvasId, config){
        this.canvas=document.getElementById(canvasId); if(!this.canvas) return;
        this.gl=this.canvas.getContext('webgl',{antialias:true,alpha:false});
        this.config=config; this.isPlaying=false;
        this.initShader(); this.initBuffers(); this.initUniforms();
        this.resize(); window.addEventListener('resize',()=>this.resize());
        this.startTime=Date.now(); this.render=this.render.bind(this);
      }
      compileShader(type,source){ const s=this.gl.createShader(type); this.gl.shaderSource(s,source); this.gl.compileShader(s); return s; }
      initShader(){ const vs=this.compileShader(this.gl.VERTEX_SHADER,vertexShaderSource); const fs=this.compileShader(this.gl.FRAGMENT_SHADER,fragmentShaderSource); this.program=this.gl.createProgram(); this.gl.attachShader(this.program,vs); this.gl.attachShader(this.program,fs); this.gl.linkProgram(this.program); }
      initBuffers(){ const v=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]); const b=this.gl.createBuffer(); this.gl.bindBuffer(this.gl.ARRAY_BUFFER,b); this.gl.bufferData(this.gl.ARRAY_BUFFER,v,this.gl.STATIC_DRAW); const p=this.gl.getAttribLocation(this.program,'position'); this.gl.enableVertexAttribArray(p); this.gl.vertexAttribPointer(p,2,this.gl.FLOAT,false,0,0); }
      hexToRgb(hex){ return [parseInt(hex.slice(1,3),16)/255,parseInt(hex.slice(3,5),16)/255,parseInt(hex.slice(5,7),16)/255]; }
      initUniforms(){ this.gl.useProgram(this.program); this.uniforms={res:this.gl.getUniformLocation(this.program,'u_resolution'),time:this.gl.getUniformLocation(this.program,'u_time'),bg:this.gl.getUniformLocation(this.program,'u_bg'),c1:this.gl.getUniformLocation(this.program,'u_c1'),c2:this.gl.getUniformLocation(this.program,'u_c2'),c3:this.gl.getUniformLocation(this.program,'u_c3')}; this.gl.uniform3fv(this.uniforms.bg,this.hexToRgb(this.config.bg)); this.gl.uniform3fv(this.uniforms.c1,this.hexToRgb(this.config.c1)); this.gl.uniform3fv(this.uniforms.c2,this.hexToRgb(this.config.c2)); this.gl.uniform3fv(this.uniforms.c3,this.hexToRgb(this.config.c3)); }
      resize(){ const dpr=Math.min(window.devicePixelRatio||1,1.5); this.canvas.width=this.canvas.clientWidth*dpr; this.canvas.height=this.canvas.clientHeight*dpr; this.gl.viewport(0,0,this.canvas.width,this.canvas.height); this.gl.useProgram(this.program); this.gl.uniform2f(this.uniforms.res,this.canvas.width,this.canvas.height); if(!this.isPlaying) this.forceRender(); }
      forceRender(){ this.gl.useProgram(this.program); this.gl.uniform1f(this.uniforms.time,(Date.now()-this.startTime)*0.001); this.gl.drawArrays(this.gl.TRIANGLES,0,6); }
      render(){ if(!this.isPlaying) return; this.forceRender(); requestAnimationFrame(this.render); }
      play(){ if(!this.isPlaying){ this.isPlaying=true; this.render(); } }
    }

    window.addEventListener('DOMContentLoaded', () => {
      const fluid = new FluidRenderer('fullscreen-canvas', {
        bg:'#120A05', c1:'#FFD9A3', c2:'#FF8A1E', c3:'#5A2600'
      });
      fluid.play();
    });
  </script>
</body>
</html>`;

export default function FluidHero() {
  return (
    <View style={styles.wrap}>
      <View style={styles.inner}>
        {Platform.OS === 'web' ? (
          <View
            style={styles.webFrame}
            dangerouslySetInnerHTML={{
              __html: `<iframe title="Fluid Hero" srcdoc="${FLUID_HTML.replace(/"/g, '&quot;')}" style="width:100%;height:100%;border:0;display:block;" allow="autoplay; fullscreen"></iframe>`,
            }}
          />
        ) : (
          <WebView
            source={{ html: FLUID_HTML, baseUrl: '' }}
            originWhitelist={['*']}
            style={styles.webview}
            javaScriptEnabled
            domStorageEnabled
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            overScrollMode="never"
            bounces={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    backgroundColor: '#090A10',
  },
  inner: {
    flex: 1,
    backgroundColor: '#090A10',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  webFrame: {
    width: '100%',
    height: '100%',
    borderWidth: 0,
  },
});
