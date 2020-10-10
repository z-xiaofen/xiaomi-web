window.onload = function() {
    // 轮播图—————————————————————
    var left = this.document.querySelector('.left');
    var right = this.document.querySelector('.right');
    var bottom = this.document.querySelector('.bottom');
    var lbt = this.document.querySelector('.lbt');
    var ulo = lbt.querySelector('.ul');
    var lbtWidth = lbt.offsetWidth;

    for (var i = 0; i < ulo.children.length; i++) {
        var la = document.createElement('a');
        // 给每一个bottom 里的 a 加自定义属性 index 
        la.setAttribute('index', i);
        bottom.appendChild(la);
        la.addEventListener('click', function() {
            for (var i = 0; i < bottom.children.length; i++) {
                bottom.children[i].className = '';
            }
            this.className = 'lahover';
            // 获取当前元素的index 
            var index = this.getAttribute('index');
            // 调用动画函数
            animate(ulo, -index * lbtWidth);
            num = index;
            cloo = index;

            // console.log(num);
            // console.log(cloo);
        })
    }
    bottom.children[0].className = 'lahover';

    var first = ulo.children[0].cloneNode(true); // 克隆ulo里的第一个孩子 cloneNode(true) 为深克隆 克隆里面的子节点

    ulo.appendChild(first); // 将克隆的 孩子 添加到 ulo 的结尾

    var num = 0; // 全局变量 num  控制 左右按钮 的 图片滚动

    var cloo = 0; // 全局变量 cloo 控制 下方小圆点 的 图片滚动

    var flag = true; // 节流阀 全局变量
    // 右侧按钮
    right.addEventListener('click', function() {
            // 当节流阀为true时  可以点击 播放下一张
            // 当 flag 为 false 时 点击 按钮 动画不执行
            if (flag) {

                flag = false; // 将flag取反 此时不能播放下一张  
                if (num == ulo.children.length - 1) {
                    ulo.style.left = 0;
                    num = 0;
                }
                num++;
                // 当动画函数执行完毕 调用回调函数  funtion（）将flag赋值为 true  此时
                // 可以点击按钮 触发 动画
                animate(ulo, -num * lbtWidth, function() {
                    flag = true;
                });
                cloo++;
                if (cloo == bottom.children.length) {
                    cloo = 0;
                }
                for (var i = 0; i < bottom.children.length; i++) {

                    bottom.children[i].className = '';
                    // 排他思想 将所有的小圆点的 classname 设为 ‘’
                }

                bottom.children[cloo].className = 'lahover';
                // 将 当前的 小圆点 的 classname 设为 lahover
            }
        })
        // 左侧按钮
    left.addEventListener('click', function() {

        if (flag) {
            flag = false;
            if (num == 0) {
                num = ulo.children.length - 1;
                ulo.style.left = -num * lbtWidth + 'px';
                // console.log('________');
                // console.log(num);
                // console.log(cloo);
            }
            num--;
            animate(ulo, -num * lbtWidth, function() {
                flag = true;
            });
            cloo--;
            if (cloo < 0) {
                cloo = bottom.children.length - 1;
            }
            for (var i = 0; i < bottom.children.length; i++) {
                bottom.children[i].className = '';
            }
            bottom.children[cloo].className = 'lahover';
        }
    })

    // 轮播图自动播放
    var bofang = this.setInterval(function() {
        right.click();
    }, 3000)
    lbt.addEventListener('mouseenter', function() { // 当 鼠标进入 lbt 内 清除 定时器  暂停动画
        clearInterval(bofang);
        bofang = null; // 清除定时器变量
    })
    lbt.addEventListener('mouseleave', function() { // 当 鼠标离开lbt 手动添加 定时器  开始动画
            bofang = setInterval(function() {
                right.click(); //手动调用点击事件
            }, 3000);
        })
        // 轮播图部分 结束————————————————————————————
        //tab栏————————————————————————————————————————————————————————————————————————————————————————
    var tab = document.querySelector('.left-nav');
    var d = document.getElementById('d');
    var li = d.getElementsByTagName('li');
    var div = tab.querySelectorAll('.text-block');

    for (var i = 0; i < li.length; i++) {
        li[i].setAttribute('index', i);
        //在li里设置自定义属性 index 并 赋值
        li[i].onmouseover = function() {
            var inde = this.getAttribute('index');
            // 获取当前 li 的index 属性 的 值
            for (var i = 0; i < div.length; i++) {
                //排他
                div[i].style.display = 'none';
                div[i].onmouseout = function() {
                    this.style.display = 'none';
                }
            }
            div[inde].style.display = 'block'; //留己
        }
        li[i].onmouseout = function() {
            var inde = this.getAttribute('index'); // 获取当前 li 的index 属性 的 值
            for (var i = 0; i < div.length; i++) {
                div[i].style.display = 'none';
                div[inde].onmouseover = function() {
                    this.style.display = 'block';
                }
            }
        }
    }
    //粘性定位  2微码
    var fixed = document.querySelector('.fixed');
    var ulf = fixed.querySelector('ul');
    var di = ulf.querySelector('div');
    ulf.children[0].onmouseover = function() {
        di.style.display = 'block';
    }
    ulf.children[0].onmouseout = function() {
            di.style.display = 'none';
        }
        //粘性定位  换背景图————————————————————————————————————————————————————————————
        // var imgs = fixed.querySelectorAll('img');
        // var liimg = ulf.querySelectorAll('li');
        // var arr = ['a1', 'b1', 'c1', 'd1', 'e1', 'totop_hover'];
        // for (var i = 0; i < liimg.length; i++) {
        //     console.log(i);

    //     liimg[i].onmouseover = function() {
    //         imgs[i].src = 'images/' + arr[i] + '.png';
    //         console.log(i);
    //     }
    // }
    // 回到顶部 带动画效果————————————————————————————————

    // pageXOffset 和 pageYOffset 属性返回文档在窗口左上角水平和垂直方向滚动的像素。

    // pageXOffset 设置或返回当前页面相对于窗口显示区左上角的 X 位置。pageYOffset 设置或返回当前页面相对于窗口显示区左上角的 Y 位置。

    // pageXOffset 和 pageYOffset 属性相等于 scrollX 和 scrollY 属性。

    // 这些属性是只读的。
    var back = this.document.querySelector('.goback');
    this.document.addEventListener('scroll', function() { //当页面滚动执行函数

            if (window.pageYOffset > 700) { //当页面文档 头部卷去1000px时执行

                back.style.display = 'block';
            } else {

                back.style.display = 'none';
            }
        })
        // 点击 回到顶部 按钮  执行 animates 缓动函数
    back.addEventListener('click', function() {
        animates(window, 0);
    })

    function animates(obj, target, callback) {
        // console.log(callback);  callback = function() {}  调用的时候 callback()
        // 先清除以前的定时器，只保留当前的一个定时器执行
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            // 步长值写到定时器的里面
            // 把我们步长值改为整数 不要出现小数的问题
            var step = (target - window.pageYOffset) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            // window.pageYOffset页面被卷去的距离
            if (window.pageYOffset == target) {
                // 停止动画 本质是停止定时器
                clearInterval(obj.timer);
                // 回调函数写到定时器结束里面
                // if (callback) {
                //     // 调用函数
                //     callback();
                // }
                callback && callback();
            }
            // window.scroll(x , y) 滚动到 窗口的 某个位置 XY 不用带单位
            // 因为 target - window.pageYOffset 是一个小数 所有
            // window.pageYOffset + step 是不断减小的 在实际效果中 是 页面不断
            // 往上部移动————————————————————
            window.scroll(0, window.pageYOffset + step)
        }, 15);
    }

    // 米家 ————热门——————————————————————————————————————————————
    var mi = document.querySelector('.mihome');
    var ul = mi.querySelector('ul');
    var a = ul.querySelectorAll('a');
    for (var i = 0; i < a.length; i++) {
        a[i].onmouseover = function() {
            for (var i = 0; i < a.length; i++) {
                a[i].className = '';
            }
            this.className = 'ahover';
        }
    }
    // _________________________________________________________
    // _____________   倒计时模块  ______________________________
    // _________________________________________________________
    var timeh = this.document.querySelector('.time-h');
    var timem = this.document.querySelector('.time-m');
    var times = this.document.querySelector('.time-s');

    timerr(); //先调用一下 防止刷新时有空白
    setInterval(timerr, 1000); //定时器 1 s 刷新一次
    function timerr() {
        var oDate = new Date(); //获取时间
        function toDub(n) {
            if (n < 10) {
                return '0' + n;
            } else {
                return '' + n;
            }
        }
        timeh.innerHTML = toDub(oDate.getHours());
        timem.innerHTML = toDub(oDate.getMinutes());
        times.innerHTML = toDub(oDate.getSeconds());
    }
    // slideToggle___________________________________
    // $(".nav-text").hover(function() {
    //     $(".mask").stop().slideToggle();
    // })



    $(".nav-text li").hover(function() {
        var index = $(this).index();
        $(".slide div").eq(index).stop().slideToggle();
    })
    $(".slide div").hover(function() {
        $(this).stop().slideToggle();
    })



}