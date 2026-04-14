项目总包
前后端仓库在其内部分别管理，所以git取消监听具体代码
仅保存docker配置

### 数据库
关系型非关系型都保存一下
这个文件明文保存账号密码（自用，以后考虑写成配置文件）

### 后台
使用dev和其他的分支开发
使用master分支在提交或者合并的时候，将内容传给指定docker-data/back中
使用docker打包的pm2进行重启（需要排除静态文件或者图片文件的重启，在pm2中配置）

### 前端
在使用build后，手动（自动）放入nginx文件中
**不知为何，nginx在docker-compose无法正常生成文件，这里手动填入数据**
```
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```