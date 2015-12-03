## bugList

- 端口异常 _exceptionWithHostPort
- fs.readFile(path,encode,Fn);

    > 在读取图片文件的时候，切不可以把编码方式设置为utf-8；

- Error: Unexpected field

    > 在使用multer插件的时候，出现该问题，可能是上传文件的数量超过限制