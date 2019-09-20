//1.初始化数据
var hashA = init()
var keys = hashA['keys']
var hash = hashA['hash']

//2.生成键盘
//遍历 keys，生成kbd标签
generateKeyboard(keys, hash)

//3.监听用户动作
ListenToUser(hash)

//////////////////////////////////////////////////////////////////
//下面是（私有的）工具函数
function getFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name) || 'null')
}

function tag(tagName) {
    return document.createElement(tagName)
}

function createSpan(textContent) {
    var span = tag('span') //创建span标签
    span.textContent = textContent
    span.className = "text"
    return span
}

function createButton(id) {
    var button = tag('button') //创建button标签
    button.textContent = '编辑'
    button.id = id
    button.onclick = function (wangxixin) {   //button点击事件
        //button被点击时执行里面代码
        //wangxixin['target'] 就是用户点击的元素
        var button2 = wangxixin['target']
        var img2 = button2.previousSibling
        var key = button2['id'] //被用户点击的那个按钮  q  w e r
        var x = prompt('给我一个网址')  //eg:qq.com
        hash[key] = x  //hash 变更
        img2.src = 'http://' + x + '/favicon.ico'
        img2.onerror = function (xxx) {
            xxx.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
        }
        localStorage.setItem('zzz', JSON.stringify(hash))
        // console.log(hash)
    }
    return button
}

function createImg(domain) {
    var img = tag('img')  //创建img标签
    if (domain) {
        img.src = 'http://' + domain + '/favicon.ico'
    } else {
        img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
    }
    img.onerror = function (xxx) {
        xxx.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
    }
    return img
}

function init() {
    var keys = {
        '0': {0: 'q', 1: 'w', 2: 'e', 3: 'r', 4: 't', 5: 'y', 6: 'u', 7: 'i', 8: 'o', 9: 'p', length: 10},
        '1': {0: 'a', 1: 's', 2: 'd', 3: 'f', 4: 'g', 5: 'h', 6: 'j', 7: 'k', 8: 'l', length: 9},
        '2': {0: 'z', 1: 'x', 2: 'c', 3: 'v', 4: 'b', 5: 'n', 6: 'm', length: 7},
        // 0: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        // 1: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        // 2: ['z','x','c','v','b','n','m'],
        length: 3
    }
    var hash = {
        'q': 'www.qq.com',
        'w': 'www.weibo.com',
        'e': 'www.ele.me',
        'r': 'www.renren.com/',
        't': 'www.tomford.com',
        'y': 'www.yahoo.com',
        'u': 'www.uc.cn',
        'i': 'www.iqiyi.com/',
        'o': 'www.opera.com',
        'p': 'popkart.tiancity.com',
        'a': 'www.apple.com',
        's': 'www.yslbeautycn.com',
        'd': 'www.duzhe.com',
        'f': undefined,
        'g': 'www.guazi.com',
        'h': 'www.haier.com/cn',
        'j': 'www.juejin.im',
        'k': 'www.kikocosmetics.com',
        'l': 'www.lol.qq.com',
        'z': 'www.zhihu.com',
        'x': undefined,
        'c': 'www.cctv.com',
        'v': 'www.vivo.com',
        'b': 'www.baidu.com',
        'n': 'www.ntce.neea.edu.cn',
        'm': 'www.mcdonalds.com.cn'
    }
    //取出localStorage 中的 zzz 对应的 hash
    var hashInLocalStorage = getFromLocalStorage('zzz')
    if (hashInLocalStorage) {
        hash = hashInLocalStorage
    }
    return {
        "keys": keys,
        "hash": hash
    }
}

function generateKeyboard(keys, hash) {
    for (var index = 0; index < keys['length']; index = index + 1) {
        var div = tag('div')  //创建div标签
        div.className = 'row'   //给div设置class

        main.appendChild(div)  //给id为div的 添加一个kbd孩子

        var row = keys[index]  //第一个数组 第一个数组 第一个数组
        // console.log(row)
        for (var index2 = 0; index2 < row['length']; index2 = index2 + 1) {
            var span = createSpan(row[index2])

            var button = createButton(row[index2])

            var img = createImg(hash[row[index2]])

            var kbd = tag('kbd')  //创建kbd标签
            kbd.className = 'key'   //给kbd设置class

            kbd.appendChild(span)
            kbd.appendChild(img)
            kbd.appendChild(button)

            div.appendChild(kbd)
        }
    }
}

function ListenToUser(hash) {
    document.onkeypress = function (wangxixin) {
        var key = wangxixin['key']  //拿到用户按的哪个键
        var website = hash[key]//得到键对应的网站
        //把当前地址变成新的网站地址    在当前页面打开：
        //location.href = 'http://' + website   //当前地址栏地址   location全局变量  href：地址栏里的地址
        //在新窗口打开  模拟用户新开一个页面
        window.open('http://' + website, '_blank')
    }
}