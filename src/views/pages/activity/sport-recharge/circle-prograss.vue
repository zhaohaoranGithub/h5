<template>
  <div class="circle-prograss">
    <svg class="alert-circle" width="140" height="140" preserveAspectRatio="xMaxYMax meet" viewBox="0 0 140 140" >
			<defs> 
				<linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%"> 
				  <stop offset="0%" stop-color="#e16d02"/> 
					<stop offset="50%" stop-color="#d8880b"/> 
					<stop offset="100%" stop-color="#fbed7d"/> 
				</linearGradient> 
				<linearGradient id="unlinear" x1="0%" y1="0%" x2="100%" y2="0%"> 
					<stop offset="0%" stop-color="#e16d02"/> 
					<stop offset="50%" stop-color="#d8880b"/> 
					<stop offset="100%" stop-color="#fbed7d"/> 
				</linearGradient> 
			</defs>
      <circle :cx="cx" :cy="cy" :r="r" fill="none" stroke="#2e2526" stroke-width="10" stroke-linecap="round"/>
      <circle class="demo2" id="J_demo2" :cx="cx" :cy="cy" :r="r" fill="none" stroke="url(#linear)" stroke-width="10" :stroke-dasharray="strokeDasharray"/>
			<!-- <text class="alert-sec-unit" x="90" y="130" fill="#BDBDBD">{{value}}</text>
			<text class="alert-sec-unit" x="100" y="170" fill="#BDBDBD">倍</text> -->
		</svg>
  </div>
</template>
<script>
export default {
  name:"circle-prograss",
   props:["precent"],
  data(){
    return {
      cx:70,
      cy:70,
      r:35,
      value:0,
      multipleTotal:200,
      strokeDasharray:"0,1000",
      timer:null,
    }
  },
  methods:{
    rotateCircle(){
      let circleLength = Math.floor(2 * Math.PI * this.r);
      let val = Math.max(0,this.value);
      val = Math.min(100,this.value);
      this.strokeDasharray="" + circleLength * val / 100 + ",10000"
    },

  },
  mounted(){
    this.rotateCircle();
    let self=this;
    setTimeout(function(){
      self.value=self.precent
      self.rotateCircle();
    },1000)
  }
}
</script>
<style lang="scss" scoped>
@include b(circle-prograss){
  display: block;
  border-radius: 10px 10px 0 0;
  box-shadow: 5px 9px 17px rgba(102,102,102,0.75);
  color: #FFF;
  text-align: center;
}
.alert-circle {
		position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    @include utils-bg(url("./img/progress-bg.png") no-repeat top center, cover);
	}
.demo2 {
  transition: stroke-dasharray 1s ease-in;
}
.alert-sec-unit {
  font-size: 40px
}
</style>


