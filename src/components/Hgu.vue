<template>
  <div class="com-container">
    <div class="com-echarts" ref='ref'>
      <!-- <div class="about">▍关于信息工程学院</div> -->
      <!-- <p><span class="itemTitle"><span>▍</span>关于信息工程学院</span></p> -->
      <!-- <img src="../assets/images/logo (1).png" alt=""> -->
      <!-- {{information}} -->
        <div>信息工程学院源于我校1981年成立的计算站和原物探系的电子技术教研室。1989年招收第一届应用电子技术专业学生，1993年招收第一届计算机专业专科学生，1994年成立计算机科学与技术系；1996年成立信息工程系，下设计算机科学与技术和应用电子技术两个专业，并开始招收计算机应用技术专业本科生；1999年，开始应用电子技术专业本科招生；2003年，信息工程系改为信息工程学院
          。2006年，获批计算机科学与技术一级学科硕士学位授予点并开始招收研究生，2010年升级为“计算机科学与技术”一级学科硕士学位授予点。学院是河北省教育厅批准的二级学院综合改革试点单位。</div>
        <div>信息工程学院秉承“志道据德、知本迭至”的院训，致力于培养 “肯吃苦、善动手、会管理、能创新”的信息技术工程师。</div>
        <div>信息工程学院遵循“科学办学，内涵发展优先”的办学指导思想，顺应信息科学与技术的发展、地方经济和国家发展的需要，先后培养了4000多名优秀毕业生，受到了用人单位的一致好评。</div>
    </div>
  </div>
</template>

<script>
  export default{
    name:'Hgu',
    data(){
      return{
        
      }
    },
  }
</script>

<style scoped>
  .com-container{
    margin: 0;
    padding: 0;
  }
div{
  color: black;
}
.com-echarts{
  position: relative;
  top: 13%;
}
.com-echarts div{
  text-indent: 2em;
  font-size: 18px;
}
.com-echarts p{
  font-weight: 500;
  transform: translate(10px,0);
}
</style>