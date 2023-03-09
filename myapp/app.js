const express = require('express')

const app = express()

// 引入fs模块
const fs = require('fs')
// 阿里云oss
//引入co异步处理模块
let co = require('co');
//引入OSS模块
let OSS = require('ali-oss');

//设置阿里oss
var client = new OSS({
    region: 'oss-cn-beijing', //地域
    accessKeyId: '', //keyid
    accessKeySecret: '', //密钥
    bucket: '' //仓库名字
});

var ali_oss = {
    bucket: 'kuangjing', //仓库名字
    endPoint: 'oss-cn-beijing.aliyuncs.com', //物理服务器
}



// 文件上传
const formidable = require('formidable');


// 引入加密模块
const crypto = require('crypto');
//引入session
const session = require('express-session')
app.use(session({
    secret: 'keyboard cat', //参与加密的字符串（又称签名）
    saveUninitialized: false, //是否为每次请求都设置一个cookie用来存储session的id
    resave: true, //是否在每次请求时重新保存session      把session信息存储在cookie
    cookie: {
        maxAge: 3600000
    } //session的过期时间,单位为毫秒 
}))


const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 引入cookie-parser
let cookieParser = require("cookie-parser")
// 使用cookie-parser
app.use(cookieParser())
//引入mysql
let mysql = require('mysql')
//配置mysql
let conn = mysql.createConnection({
    host: 'localhost',//主机
    user: 'root',//用户名
    password: '123456',//密码
    database: 'yuliner'//数据库
});

conn.connect();
// 加载静态资源
app.use(express.static('node_modules'))
app.use(express.static('public'))
app.use(express.static('uploads'))

// 自定义模板引擎类型
app.set('view engine', 'pug')

// 设置视图文件存放目录
app.set('views', './views')

// 设置路由
// 后台首页
app.get('/adminindex', checkLogin, (req, res) => {
    let sql = `select count(*) as num from admin_user`
    conn.query(sql, (error, results, fields) => {

        if (error) {
            throw error
        }

        // console.log(results);

        let [count] = results
        let {
            num
        } = count

        var xAxis = ["管理员", "用户", "入驻商家", "商家食品", "订单"];
        var series = [num, 10, 20, 30, 40];
        res.render('./Adminindex/adminindex', {
            title: '后台首页',
            uname: req.session.uname,
            xAxis: xAxis,
            series: series
        })
        res.end()

    })


})

// 这是管理员添加模块的路由
app.get('/adminuseradd', checkLogin, (req, res) => {
    res.render('./AdminUser/adminuseradd', { title: '管理员添加', uname: req.session.uname })
})

app.post('/adminuserdoadd', checkLogin, (req, res) => {
    // 获取表单数据 post
    // console.log(req.body);
    // res.end()
    let { uname, pwd } = req.body
    pwd = getsha1(pwd)
    // 存入到数据库
    let sql = `insert into admin_user(uname,pwd) values('${uname}','${pwd}')`
    conn.query(sql, (error, results, fields) => {
        let { affectedRows } = results
        if (error) {
            throw error
        } else {
            if (affectedRows > 0) {
                res.redirect('/adminuserlist')
            } else {
                res.redirect('/adminuseradd')
            }
        }
    });

})
//管理员列表
app.get('/adminuserlist', checkLogin, (req, res) => {
    let sql = `select * from admin_user order by id desc`
    conn.query(sql, (error, results, fields) => {
        // console.log(results);
        res.render('./AdminUser/adminuserlist', {
            datas: results,
            uname: req.session.uname
        })
    })

})
// 管理员的删除操作
app.get('/adminuserdel', checkLogin, (req, res) => {
    let { id } = req.query
    // 删除数据库中的数据
    let sql = `delete from admin_user where id = ${id}`
    conn.query(sql, (error, results, fields) => {
        let { affectedRows } = results
        if (error) {
            throw error
        } else {
            if (affectedRows > 0) {
                res.redirect('/adminuserlist')
            } else {
                res.send()
            }
        }
    });
})


// 管理员修改操作
app.get('/adminuserupdate', checkLogin, (req, res) => {
    let {
        id
    } = req.query
    let sql = `select * from admin_user where id=${id}`
    conn.query(sql, (error, results, fields) => {
        // console.log(results);

        res.render('./AdminUser/adminuserupdate', {
            datas: results[0],
            id: id,
            uname: req.session.uname

        })
    })
})
// 管理员更新修改操作
app.post('/adminuserdoupdate', checkLogin, (req, res) => {
    // console.log(req.body);
    let { uname, pwd, id } = req.body
    //密码加密
    pwd = getsha1(pwd)
    // 修改数据库中的数据

    let sql = `update admin_user set uname='${uname}',pwd='${pwd}' where id=${id}`
    conn.query(sql, (error, results, fields) => {
        let {
            affectedRows
        } = results
        if (affectedRows > 0) {
            res.redirect('/adminuserlist')
        } else {
            res.redirect('/adminuserupdate')
        }
    });
})

// 会员列表
app.get('/users', checkLogin, (req, res) => {
    let sql = `select * from users`
    // 获取学生信息
    conn.query(sql, (error, results, fields) => {
        res.render('./Users/users', {
            title: '会员列表',
            datas: results,
            uname: req.session.uname
        })

    })

})

// 会员搜索信息
app.get('/usersearch', checkLogin, (req, res) => {
    let {
        keyword
    } = req.query
    let sql = `select * from users where username like '%${keyword}%' `
    // 获取学生信息
    conn.query(sql, (error, results, fields) => {
        // console.log(results);
        res.render('./Users/users', {
            title: '会员列表',
            datas: results,
            uname: req.session.uname
        })
    })
})

// 会员详细信息查询
app.get('/usersinfo', checkLogin, (req, res) => {
    let {
        username
    } = req.query
    let sql = `select * from user_info where username="${username}" `
    // 获取学生信息
    conn.query(sql, (error, results, fields) => {
        console.log(results);
        res.render('./Users/usersinfo', {
            title: '会员详细信息',
            data: results[0],
            uname: req.session.uname
        })
    })
})

// 查询会员收货地址
app.get('/usersaddress', checkLogin, (req, res) => {

    let {
        username
    } = req.query


    let sql = `select * from address where username='${username}'`
    // 获取学生信息
    conn.query(sql, (error, results, fields) => {
        // console.log(results);
        // res.end()
        res.render('./Users/address', {
            title: '会员收获地址信息',
            datas: results,
            uname: req.session.uname
        })

    })
})
// 商家列表
app.get('/adminshoplist', checkLogin, (req, res) => {
    let page = (req.query.page == undefined) ? 0 : req.query.page;
    //当前页
    let pages = parseInt(page) + 1;
    //获取起始数据 跳过指定页数前面的页数条数
    let startPage = page * 2;

    // 从数据库获取数据，然后渲染到show页面
    let count = 'select count(*) as count from shoplists';
    let sql = `select * from shoplists limit ${startPage},2`;

    conn.query(count, function (error, results, fields) {
        if (error) throw error;
        // console.log(results);
        let countNum = results[0].count;
        conn.query(sql, function (error, results, fields) {
            //加载一个模板 shoplist.ejs  同时分配数据results
            res.render('./AdminShop/adminshoplist', {
                title: '入驻商家列表信息',
                datas: results,
                count: countNum,
                page: page,
                pages: pages,
                uname: req.session.uname
            });
        });

    })
})

// 商家入驻页面
app.get('/adminshopadd', (req, res) => {

    // 展示视图
    res.render('./AdminShop/adminshopadd', {
        title: '商家入驻页面'
    })
})


// 存储商家入驻信息
app.post('/adminshopdoadd', (req, res) => {
    const form = formidable({
        multiples: true,
        // 上传文件存放地址
        uploadDir: './uploads',
        //保留上传文件的后缀名
        keepExtensions: true
    });
    form.parse(req, (err, fields, files) => {
        if (err) {
            throw err
        }
        let { shopname, content, fee } = fields
        let { newFilename, filepath } = files.logo


        //执行阿里oss上传
        co(function* () {
            // 选择存储的仓库名称
            client.useBucket(ali_oss.bucket);
            //pic 上传文件名字    filePath 上传文件路径
            var result = yield client.put(newFilename, filepath);
            //上传之后删除本地文件         
            fs.unlinkSync(filepath);
            //   res.setHeader('content-type','text/html;charset=utf-8');
            res.end(JSON.stringify({
                status: '100',
                msg: '上传成功'
            }));

        }).catch(function (err) {
            //   res.setHeader('content-type','text/html;charset=utf-8');
            res.end(JSON.stringify({
                status: '101',
                msg: '上传失败',
                error: JSON.stringify(err)
            }));

        });
        // 添加数据
        let sql = `insert into shoplists(shopname,logo,content,fee) values('${shopname}','${newFilename}','${content}','${fee}')`
        // console.log(sql);
        conn.query(sql, (error, results, fields) => {
            // console.log(error);
            let {
                affectedRows
            } = results
            if (affectedRows > 0) {
                res.redirect('/adminshoplist')
            } else {
                res.redirect('/adminshopadd')
            }
        })
    });

})

//商家删除
app.get('/adminshopdel', (req, res) => {
    let {
        id
    } = req.query
    // 删除操作
    let sql = `delete from shoplists where id=${id}`
    conn.query(sql, (error, results, fields) => {
        let {
            affectedRows
        } = results
        if (affectedRows > 0) {
            res.redirect('/adminshoplist')
            res.end()
        }
    })
})

// 商家信息的修改
app.get('/adminshopupdate', checkLogin, (req, res) => {
    let {
        id
    } = req.query
    let sql = `select * from shoplists where id = ${id}`
    conn.query(sql, (error, results, fields) => {
        res.render('./AdminShop/adminshopupdate', {
            title: '商家修改展示页面',
            data: results[0],
            uname: req.session.uname
        })
    })
})

// 执行商家修改操作
app.post('/adminshopdoupdate', (req, res) => {
    const form = formidable({
        multiples: true,
        // 上传文件存放地址
        uploadDir: './uploads',
        //保留上传文件的后缀名
        keepExtensions: true
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            throw err
        }

        // console.log(fields);
        // console.log(files);
        // res.end()

        let {
            shopname,
            content,
            fee,
            sid
        } = fields
        let {
            newFilename,
            filepath,
            size
        } = files.logo

        if (size > 0) { // 更新logo
            //执行阿里oss上传
            co(function* () {
                // 选择存储的仓库名称
                client.useBucket(ali_oss.bucket);
                //pic 上传文件名字    filePath 上传文件路径
                var result = yield client.put(newFilename, filepath);
                //上传之后删除本地文件         
                fs.unlinkSync(filepath);
                //   res.setHeader('content-type','text/html;charset=utf-8');
                res.end(JSON.stringify({
                    status: '100',
                    msg: '上传成功'
                }));

            }).catch(function (err) {
                //   res.setHeader('content-type','text/html;charset=utf-8');
                res.end(JSON.stringify({
                    status: '101',
                    msg: '上传失败',
                    error: JSON.stringify(err)
                }));

            });

            // 添加数据
            let sql = `update shoplists set shopname='${shopname}',logo='${newFilename}',content="${content}",fee="${fee}" where id=${sid}`
            // console.log(sql);
            conn.query(sql, (error, results, fields) => {
                // console.log(error);
                let {
                    affectedRows
                } = results
                if (affectedRows > 0) {
                    res.redirect('/adminshoplist')
                } else {
                    res.redirect('/adminshopadd')
                }
            })

        } else {
            let sql = `update shoplists set shopname='${shopname}',content="${content}",fee="${fee}" where id=${sid}`
            // console.log(sql);
            conn.query(sql, (error, results, fields) => {
                // console.log(error);
                let {
                    affectedRows
                } = results
                if (affectedRows > 0) {
                    res.redirect('/adminshoplist')
                } else {
                    res.redirect('/adminshopadd')
                }
            })
        }


    });
})

// 食品列表
app.get('/admingoodslist', checkLogin, (req, res) => {
    // 多表联查 两张表
    let sql = `select goods.id,goods.foodname,goods.descr,goods.price,goods.foodpic,shoplists.shopname from goods,shoplists where goods.shoplist_id = shoplists.id`
    // 获取学生信息
    conn.query(sql, (error, results, fields) => {
        // console.log(results);
        // res.end()
        res.render('./AdminGoods/admingoodslist', {
            title: '商家食品列表信息',
            datas: results,
            uname: req.session.uname
        })

    })
})


// 食品添加页面
app.get('/admingoodsadd', (req, res) => {

    let sql = `select id,shopname from shoplists`
    conn.query(sql, (error, results, fields) => {
        res.render('./AdminGoods/admingoodsadd', {
            title: '商家食品添加页面',
            datas: results,
            uname: req.session.uname
        })

    })
})

//食品添加操作
app.post('/admingoodsdoadd', (req, res) => {
    const form = formidable({
        multiples: true,
        // 上传文件存放地址
        uploadDir: './uploads',
        //保留上传文件的后缀名
        keepExtensions: true
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            throw err
        }

        let {
            foodname,
            descr,
            price,
            shoplist_id
        } = fields
        let {
            newFilename,
            filepath
        } = files.foodpic
        //执行阿里oss上传
        co(function* () {
            // 选择存储的仓库名称
            client.useBucket(ali_oss.bucket);
            //pic 上传文件名字    filePath 上传文件路径
            var result = yield client.put(newFilename, filepath);
            //上传之后删除本地文件         
            fs.unlinkSync(filepath);
            //   res.setHeader('content-type','text/html;charset=utf-8');
            res.end(JSON.stringify({
                status: '100',
                msg: '上传成功'
            }));

        }).catch(function (err) {
            //   res.setHeader('content-type','text/html;charset=utf-8');
            res.end(JSON.stringify({
                status: '101',
                msg: '上传失败',
                error: JSON.stringify(err)
            }));

        });

        // 添加数据
        let sql = `insert into goods(foodname,descr,price,shoplist_id,foodpic) values('${foodname}','${descr}','${price}',${shoplist_id},'${newFilename}')`
        // console.log(sql);
        conn.query(sql, (error, results, fields) => {
            // console.log(error);
            let {
                affectedRows
            } = results
            if (affectedRows > 0) {
                res.redirect('/admingoodslist')
            } else {
                res.redirect('/admingoodsadd')
            }
        })


    });
})

// 食品信息的修改
app.get('/admingoodsupdate', checkLogin, (req, res) => {

    // let {
    //     id
    // } = req.query
    // let sql = `select * from shoplists where id = ${id}`
    // conn.query(sql, (error, results, fields) => {
    res.render('./AdminGoods/admingoodsupdate', {
        title: '商家修改展示页面',
        // data: results[0],
        // uname: req.session.uname
    })
    // })
})


// 商品删除
app.get('/admingoodsdel', (req, res) => {
    let {
        id
    } = req.query
    let sql = `delete from goods where id=${id}`
    conn.query(sql, (error, results, fields) => {
        let {
            affectedRows
        } = results
        if (affectedRows > 0) {
            res.redirect('/admingoodslist')
            res.end()
        }
    })
})

// 订单信息展示
app.get('/adminorderslist', checkLogin, (req, res) => {
    let sql = `select * from orders`
    // 获取订单信息
    conn.query(sql, (error, results, fields) => {
        // console.log(results);
        res.render('./AdminOrders/orders', {
            title: '订单列表',
            datas: results,
            uname: req.session.uname
        })

    })
})
//订单信息详细
app.get('/adminorderinfo', checkLogin, (req, res) => {
    let { id } = req.query
    let sql = `select * from orders_goods where orders_id = ${id}`
    // 获取学生信息
    conn.query(sql, (error, results, fields) => {
        // console.log(results);
        // res.end()
        res.render('./AdminOrders/orderinfo', {
            title: '订单商品详情表',
            datas: results,
            uname: req.session.uname
        })

    })
})



// 登录页面
app.get('/adminlogin', (req, res) => {
    res.render('./AdminLogin/adminlogin', { title: '登录页面' })
})

// 登录操作
app.post('/admindologin', (req, res) => {
    let {
        uname,
        pwd
    } = req.body

    // 密码加密
    pwd = getsha1(pwd)
    let sql = `select * from admin_user where uname='${uname}'`
    conn.query(sql, (error, results, fields) => {
        if (results.length <= 0) {
            res.send(`<script>alert('管理员名称错误~');location.href="/adminlogin"</script>`)
        } else {
            // 验证密码
            if (pwd !== results[0].pwd) {
                res.send(`<script>alert('密码错误~');location.href="/adminlogin"</script>`)
            } else {
                //将用户名存储在session中
                req.session.uname = uname
                res.send(`<script>alert('登录成功~');location.href="/adminindex"</script>`)
            }
        }
    })
})
// 中间件 检测是否登录 
function checkLogin(req, res, next) {
    if (!req.session.uname) {
        res.send(`<script>alert('请先登录~~~');location.href="/adminlogin"</script>`)
    } else {
        next()
    }
}


// 密码加密
function getsha1(pwd) {
    // 对密码进行加密
    let sha = crypto.createHash('sha1')
    let newPwd = sha.update(pwd).digest('hex')
    return newPwd

}

//开放vue前端接口
//开放给vue项目商家列表数据json格式
app.get("/shoplists", function (req, res) {
    // console.log('1111');
    // res.end();
    conn.query('select * from shoplists', function (error, results, fields) {
        if (error) throw error;
        //设置字符集
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.write(JSON.stringify(results));
        res.end();
    });
});
//用户模块 登录注册开放接口
//注册
app.get("/registeruser", (req, res) => {
    //获取表单的提交数据
    let name = req.query.name;
    let pass = req.query.pass;

    //数据的入库
    //mysql预处理
    //准备sql语句
    let sql = "insert into users(username,pass)values('" + name + "','" + pass + "')";
    //执行
    conn.query(sql, (error, results, fields) => {
        // console.log(results);
        //判断
        if (results.affectedRows > 0) {
            res.cookie('name', name, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
            res.write(JSON.stringify({ 'msg': 'ok' }));
            res.end();
        } else {
            // res.redirect("/add");
            res.write(JSON.stringify({ 'msg': 'error' }));
            res.end();
        }

    });

    // });
});
//执行登录
app.post("/loginuser", (req, res) => {
    //获取name和pass
    let name = req.body.name;
    let pass = req.body.pass;
    // console.log(name, pass)
    //把name和pass做对比=》stu数据表做对比
    //对比name和数据库name
    conn.query('select * from users where username="' + name + '"', (error, results, fields) => {
        // console.log(results);

        if (results.length <= 0) {
            //用户名有误
            res.write(JSON.stringify({ 'msg': 'usernameiserror' }));
            res.end();
        } else {
            //用户名ok 检测密码
            if (pass == results[0].pass) {
                res.cookie('name', name, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
                res.write(JSON.stringify({ 'msg': 'ok' }));
                res.end();
            } else {
                res.write(JSON.stringify({ 'msg': 'userpassiserror' }));
                res.end();
            }
        }
    });


});
//根据会话cookie获取用户信息
app.get('/userinfoss', function (req, res) {
    if (!req.cookies.name) {
        res.write(JSON.stringify({ 'msg1': 'no login' }));
        res.end();
    } else {
        res.write(JSON.stringify({ 'msg': req.cookies.name }));
        res.end();
    }
});
//退出接口
app.get("/vuelogout", function (req, res) {
    //cookie清除
    res.clearCookie('name');
    res.write(JSON.stringify({ 'msg': 0 }));
    res.end();
});
//获取单个商家接口
app.get("/shoplistone", function (req, res) {
    let id = req.query.id;
    //获取单个shoplists表数据
    conn.query("select * from shoplists where id=" + id, function (error, results, fields) {
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.write(JSON.stringify(results[0]));
        res.end();
    });

});
//获取单个商家食品列表接口
app.get("/vueshopgoods", function (req, res) {
    let id = req.query.id;
    conn.query("select * from goods where shoplist_id=" + id, function (error, results, fields) {
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.write(JSON.stringify(results));
        res.end();
    });

});
//商家评价列表接口
app.get("/vuecomments", function (req, res) {
    let id = req.query.id;
    conn.query("select * from comments where shoplist_id=" + id, function (error, results, fields) {
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.write(JSON.stringify(results));
        res.end();
    });

});
//添加收货地址接口
app.post("/addaddress", (req, res) => {
    let name = req.body.name;//收货人
    let phone = req.body.phone;//收货电话
    let address = req.body.address;//收货地址
    let username = req.body.username;//登录用户名字
    let sql = "insert into address(realname,phone,address,username)values('" + name + "','" + phone + "','" + address + "','" + username + "')";

    conn.query(sql, (error, results, fields) => {
        // console.log(results);
        if (results.affectedRows > 0) {
            res.write(JSON.stringify({ 'msg': 'ok' }));
            res.end();
        } else {
            res.write(JSON.stringify({ 'msg': 'error' }));
            res.end();
        }

    });

});
//获取用户收货地址
app.get("/useraddress", function (req, res) {
    let username = req.query.username;
    //获取stu表数据
    conn.query("select * from address where username='" + username + "'", function (error, results, fields) {
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.write(JSON.stringify(results));
        res.end();
    });

});
//生成订单接口
app.post("/addorder", (req, res) => {
    let order_num = req.body.order_num;
    let address_id = req.body.address_id;
    let food_totalprice = req.body.food_totalprice;
    let username = req.body.username;
    let shoplist_id=req.body.shoplist_id;
    let sql = "insert into orders(order_num,address_id,food_totalprice,username,shoplist_id)values('" + order_num + "','" + address_id + "','" + food_totalprice + "','" + username + "','" + shoplist_id + "')";

    conn.query(sql, (error, results, fields) => {
        // console.log(results);
        if (results.affectedRows > 0) {
            res.write(JSON.stringify({ 'msg': 'ok', 'insertid': results.insertId }));
            res.end();
        } else {
            res.write(JSON.stringify({ 'msg': 'error' }));
            res.end();
        }

    });

});
//获取登录用户的订单数据接口
app.get("/userorders", function (req, res) {
    let username = req.query.username;
    //获取stu表数据
    conn.query("select * from orders where username='" + username + "'", function (error, results, fields) {
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.write(JSON.stringify(results));
        res.end();
    });

});
//生成订单详情接口
app.post("/addordergoods", (req, res) => {
    let foodname = req.body.foodname;
    let pic = req.body.pic;
    let count = req.body.count;
    let orders_id = req.body.orders_id;
    let sql = "insert into orders_goods(foodname,pic,count,orders_id)values('" + foodname + "','" + pic + "','" + count + "','" + orders_id + "')";
    conn.query(sql, (error, results, fields) => {
        // console.log(results);
        if (results.affectedRows > 0) {
            res.write(JSON.stringify({ 'msg': 'ok', 'insertid': results.insertId }));
            res.end();
        } else {
            res.write(JSON.stringify({ 'msg': 'error' }));
            res.end();
        }

    });

});
//获取订单登录用户的详情数据
app.get("/orderinfos", function (req, res) {
    let orders_id = req.query.orders_id;
    //获取stu表数据
    conn.query("select * from orders_goods where orders_id=" + orders_id, function (error, results, fields) {
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.write(JSON.stringify(results));
        res.end();
    });

});
//获取用户详情信息接口
app.get("/usermessage", function (req, res) {
    let name = req.query.name;
    //获取单个shoplists表数据
    conn.query("select * from user_info where username='" + name + "'", function (error, results, fields) {
        //    console.log(results);
        if (results.length == 0) {
            res.setHeader('content-type', 'text/html;charset=utf-8');
            res.write(JSON.stringify({ "realname": "" }));
            res.end();
        } else {
            res.setHeader('content-type', 'text/html;charset=utf-8');
            res.write(JSON.stringify(results[0]));
            res.end();
        }

    });

});
//插入用户详情
app.post("/insertuserinfo", (req, res) => {
    let realname = req.body.realname;
    let phone = req.body.phone;
    let email = req.body.email;
    let hobby = req.body.hobby;
    let username = req.body.username
    // console.log(realname,phone,email,hobby,username)
    let sql = "insert into user_info(realname,phone,email,hobby,username)values('" + realname + "','" + phone + "','" + email + "','" + hobby + "','" + username + "')";
    console.log(sql)
    conn.query(sql, (error, results, fields) => {
        console.log(results);
        if (results.affectedRows > 0) {
            res.write(JSON.stringify({ 'msg': 'ok', 'insertid': results.insertId }));
            res.end();
        } else {
            res.write(JSON.stringify({ 'msg': 'error' }));
            res.end();
        }

    });

});
//修改用户详情接口
app.post("/updateuserinfo", (req, res) => {
    let realname = req.body.realname;
    let phone = req.body.phone;
    let email = req.body.email;
    let hobby = req.body.hobby;
    let username = req.body.username
    let sql = "update user_info set realname='" + realname + "',phone='" + phone + "',email='" + email + "',hobby='" + hobby + "' where username='" + username + "'";
    conn.query(sql, (error, results, fields) => {
        // console.log(results);
        if (results.affectedRows > 0) {
            res.write(JSON.stringify({ 'msg': 'ok' }));
            res.end();
        } else {
            res.write(JSON.stringify({ 'msg': 'error' }));
            res.end();
        }

    });

});
//修改用户头像详情接口
app.post("/updateuserpic", (req, res) => {
    let pic = req.body.pic;
    let username = req.body.username
    let sql = "update user_info set pic='" + pic + "' where username='" + username + "'";
    conn.query(sql, (error, results, fields) => {
        // console.log(results);
        if (results.affectedRows > 0) {
            res.write(JSON.stringify({ 'msg': 'ok' }));
            res.end();
        } else {
            res.write(JSON.stringify({ 'msg': 'error' }));
            res.end();
        }

    });

});
// 搜索页的搜索信息
app.get("/shopsearch", (req, res) => {
    let { keyword } = req.query;
    let sql = `select * from shoplists where shopname like '%${keyword}%'`
    conn.query(sql, (error, results, fields) => {
        console.log(results)
        if (results.length == 0) {
            res.setHeader('content-type', 'text/html;charset=utf-8');
            res.write(JSON.stringify({ "shopname": "" }));
            res.end();
        } else {
            res.setHeader('content-type', 'text/html;charset=utf-8');
            res.write(JSON.stringify(results));
            res.end();
        }

    })
});
// 订单页的评价信息接口
app.post("/commentsinfo", (req, res) => {
    let comments_user=req.body.comments_user;
    let content = req.body.content;
    let shoplist_id=req.body.shoplist_id;
    let userpic=req.body.userpic;
  
    let sql = "insert into comments(comments_user,content,shoplist_id,userpic)values('" + comments_user + "','" + content + "','" + shoplist_id + "','" + userpic + "')";
    console.log(sql)
    conn.query(sql, (error, results, fields) => {
        // console.log(results);
        if (results.affectedRows > 0) {
            res.write(JSON.stringify({ 'msg': 'ok', 'insertid': results.insertId }));
            res.end();
        } else {
            res.write(JSON.stringify({ 'msg': 'error' }));
            res.end();
        }

    });

});
// 退出登录
app.get('/admindologout', (req, res) => {
    req.session.uname = ''
    res.redirect('/adminlogin')
})

app.listen(8005, () => {
    console.log('server is running at port 8005');
})
