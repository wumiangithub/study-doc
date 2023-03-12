# nginx

```nginx
user root;
worker_processes 1;
events {
    worker_connections 1024;
}
http {
    include mime.types;
    default_type application/octet-stream;
    sendfile on;
    keepalive_timeout 65;
    server {
        listen 80;
        server_name www.qibi.work localhost;
        root /root/qibi/code/qibi-client-pc/dist;
        location / {
            try_files $uri $uri/ /index.html;
            index index.html index.htm;
            proxy_cookie_path / /;
        }
        location @router {
            rewrite ^.*$/index.html last;
        }
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root /root/qibi/code/qibi-client-pc/dist/;
        }
    }
    server {
        listen 443 ssl;
        server_name www.qibi.work localhost;
        ssl_certificate /root/qibi/cert/8250636_www.qibi.work.pem;
        ssl_certificate_key /root/qibi/cert/8250636_www.qibi.work.key;
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout 5m;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;
        root /root/qibi/code/qibi-client-pc/dist;
        location / {
            try_files $uri $uri/ /index.html;
            index index.html index.htm;
            proxy_cookie_path / /;
        }
        location @router {
            rewrite ^.*$/index.html last;
        }
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root /root/qibi/code/qibi-client-pc/dist/;
        }
        gzip on; #开启gzip
        gzip_min_length 10k; #低于10kb的资源不压缩
        gzip_comp_level 5; #压缩级别1-9，越大压缩率越高，同时消耗cpu资源也越多，建议设置在5左右。
        #需要压缩哪些响应类型的资源，多个空格隔开。不建议压缩图片
        gzip_types text/plain  application/javascript application/x-javascript  text/css    application/xml;
        gzip_vary on; #是否添加“Vary: Accept-Encoding”响应头
        gzip_disable "MSIE [1-6]\."; #配置禁用gzip条件，支持正则。此处表示ie6及以下不启用gzip（因为ie低版本不支持）
    }

    # NODE  server  虽然可以和yqq一样使用方向代理，但是算了没必要，让前端自己带上端口号吧，因为80和443都被前端nginx服务器占用了
    # 方式一：ok
    # upstream nodejs {
    #     server 127.0.0.1:4000;
    #     keepalive 64;
    # }
    # server {
    #     listen 443;
    #     server_name node.yuanquanquan.vip;
    #     location / {
    #         proxy_set_header X-Real-IP $remote_addr;
    #         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    #         proxy_set_header Host $http_host;
    #         proxy_set_header X-Nginx-Proxy true;
    #         proxy_set_header Connection "";
    #         proxy_pass http://nodejs;
    #     }
    # }
}
```
