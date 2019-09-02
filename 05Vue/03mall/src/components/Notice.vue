<template>
  <div class="notice-com">
    <div class="notice-popup" v-if="noticePopupShow">
      <div class="notice-popup-ctn" v-for="item in alerts" :key="item.id">
        <div class="notice-popup-ctt">{{item.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Notice',
    data() {
        return {
            alerts: [], 
            noticePopupShow: false
        }
    },
    created () {
        // id自增控制
        this.id = 0
    },
    methods: {
        add(opt) {
            // 控制弹窗是一个单例
            const id = '_id' + this.id++
            const alert = {...opt, id: id}
            this.noticePopupShow = true
            this.alerts.push(alert)
            console.log(this.alerts)
            // 默认1秒后自动关闭
            const duration = opt.duration || 1
            setTimeout(()=> {
                this.del(id)
            }, duration * 1000)
        },
        del(id) {
            for (let i = 0; i < this.alerts.length; i++) {
                const element = this.alerts[i];
                if (element.id === id) {
                    this.alerts.splice(i, 1)
                    this.noticePopupShow = false
                    break;
                }
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.notice-popup {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  .notice-popup-ctn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 80%;
    display: flex;
    align-items: center;
    padding: 13px 16px;
    color: #ccc;
    background-color: rgba(37, 38, 45, 0.9);
    border-radius: 2px;
    .notice-popup-ctt {
        line-height: 20px; 
        text-align: justify;
    }
  }
}
</style>