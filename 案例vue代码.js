new Vue({
    el: '.bdiv',
    data: {
        licl: Number,
        mtext: '',
        sendlist: Array,
        murl: '',
        imgurl: './img/timgn.png',
        users: Array,
        click: 0,
        mvurl: '',
        time1: null, //定时器1
        time2: null //定时器1
    },
    methods: {
        sendReqlist() {
            // 获取列表
            axios.get(`https://autumnfish.cn/search?keywords=${this.mtext}`).then(resp => {
                // console.log(resp.data.result.songs)
                this.sendlist = resp.data.result.songs
            })
        },
        muiclick(itemid, index) {
            this.licl = index;
            // console.log(this.licl);
            // console.log(itemid);
            //点击播放
            axios.get('https://autumnfish.cn/song/url?id=' + itemid).then(resp => {
                // console.log(resp)
                this.murl = resp.data.data[0].url
            });
            //图片展示
            axios.get('https://autumnfish.cn/song/detail?ids=' + itemid).then(resp => {
                // console.log(resp)
                this.imgurl = resp.data.songs[0].al.picUrl;
            });
            // 热门评论
            axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + itemid).then(resp => {
                // console.log(resp)
                this.users = resp.data.hotComments
                    // console.log(this.user)
            });
            //唱片旋转
            function cfsz() {
                clearInterval(this.time1);
                this.time1 = null;
                var count = 0;
                var bigmig = document.querySelector('.img2');
                var smallmig = document.querySelector('.img3');
                this.time1 = setInterval(() => {
                    count++;
                    var a = "rotate(" + count + "deg)";
                    bigmig.style.transform = a;
                    smallmig.style.transform = a;
                }, 50);
            }
            //图片摆动
            function zzxz() {
                clearInterval(this.time2);
                this.time2 = null;
                var count = -60;
                var img1 = document.querySelector('.img1');
                this.time2 = setInterval(() => {
                    count++;
                    if (count >= -40) count = -60
                    var a = "rotate(" + count + "deg)";
                    img1.style.transform = a;
                }, 100);
            }
            cfsz();
            zzxz();

        },
        //mv播放
        mvclick(mvid) {
            // console.log(mvid)
            var mv = document.querySelector('#mvbroad');
            this.click++;
            if (this.click % 2 == 1) {
                mv.style.display = "block";
                axios.get('https://autumnfish.cn/mv/url?id=' + mvid).then(resp => {
                    // console.log(resp)
                    this.mvurl = resp.data.data.url;
                    // console.log(this.mvurl)
                });
            } else {
                mv.style.display = "none";
                this.mvurl = '';
            }

        }

    }


})