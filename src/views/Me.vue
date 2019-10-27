<template>
  <div class="me">
    <!-- 登录信息 -->
    <header>
      <div class="head-img"></div>
      <div>
        <p v-if="userInfo">{{userInfo._id}}</p>
        <p v-else @click="handleLogin">登录/注册</p>
        <i class="fa fa-mobile-phone"></i>
        <span v-if="userInfo">{{encrypePhone(userInfo.phone)}}</span>
        <span v-else>登录后享受更多特权</span>
      </div>
      <i class="fa fa-angle-right"></i>
    </header>
    <!-- 选择地址 -->
    <div class="address" @click="myAddress">
       <i class="fa fa-map-marker"></i>
       <span>我的地址</span>
       <i class="fa fa-angle-right"></i>
    </div>

    <!-- 退出登录 -->
    <button class="loginOut-btn" @click="handleLogout">退出登录</button>
  </div>
</template>

<script>
export default {
  name:"me",
  data(){
    return{
      userInfo:null,
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm => vm.getData())
  },
  methods:{
    getData(){
      const user_Id = localStorage.ele_login;
      this.$axios(`/api/user/user_info/${user_Id}`)
      .then(res => {
        // console.log(res.data);
        this.userInfo = res.data;
        console.log(this.userInfo);
        
      });
    },
    // 登录/注册
    handleLogin(){
      this.$router.push('/login');
    },
    // 电话号码隐藏中间数字
    encrypePhone(phone){
      return phone.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")
    },
    // 退出登录
    handleLogout(){
      localStorage.removeItem('ele_login');
      this.$router.push('/login');
    },
    myAddress(){
      if (this.userInfo.myAddress) {
        this.$router.push('/myAddress');
      }else{
        this.$router.push('/addAddress');
      }
      
    }
  }
}
</script>

<style scoped>
/* 头部 */
.me{
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: auto;
}
header{
  padding: 6.666667vw 4vw;
  color: #fff;
  background-image: linear-gradient(90deg, #0af, #0085ff);
  display: flex;
  align-items: center;
}
/* 头像 */
.head-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-position: 0px 0px;
  background-size: 60px;
  background-image: url(https://shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png);
}
/* 用户名和手机号 */
header p{
  max-width: 40vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1.3rem;
  margin-bottom: 2.133333vw;
  font-weight: 700;
  display: flex;
  align-items: center;
}
header span{
  font-size: 0.8rem;
  margin-left: 0.5vw;
}
header>i{
  position: absolute;
  font-size: 1.2rem;
  right: 4vw;
}
/* 我的地址 */
.address{
  height: 10vw;
  width:100%;
  background: #fff;
  margin-top: 2vw;
  display: flex;
  align-items: center;
}
.address>i:nth-of-type(1){
  color:#009eef;
  font-size: 1.2rem;
  margin-left: 4vw;
}
.address>span{
  font-size: 1rem;
  margin-left: 2vw;
}
.address>i:nth-of-type(2){
  position: absolute;
  right: 2vw;
  color:#666;
  font-size: 1.2rem;
}
.loginOut-btn{
  display: block;
  width: 100%;
  text-align: center;
  padding: 3.733333vw 0;
  margin: 5.333333vw 0;
  color: #ff5339;
  border-radius: 0.8vw;
  font-size: 1rem;
  font-weight: 700;
  background-color: #fff;
  border: 0;
}
</style>

