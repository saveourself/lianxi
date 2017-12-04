var gulp=require('gulp');
var webserver=require("gulp-webserver");
var url=require("url");
var fs=require("fs");
var path=require("path");
var ziphtml=require("gulp-htmlmin");
var zipcss=require("gulp-minify-css");
var zipjs=require("gulp-uglify")

gulp.task("webserver",function(){
    gulp.src(".").pipe(webserver({
        port:8880,
        middleware:function(req,res,next){
            var obj=url.parse(req.url);
            var pathname=obj.pathname;
            var method=req.method;
            if(pathname==="/"){
                res.end(fs.readFileSync(path.join(__dirname,"main.html")))
            }else if(pathname==="/getdata"){
                res.end(fs.readFileSync(path.join(__dirname,"data.json")))
            }else{
                next();
            }

        }
    }))
})
gulp.task("ziphtml",function(){
    gulp.src("./*.html").pipe(ziphtml({
        removeComments:true,
        collapseWhitespace:true,
        removeScriptTypeAttributes:true,
        removeStyleLinkTypeAttributes:true,
        minifyCSS:true,
        minifyJS:true
    }))
    .pipe(gulp.dest("./html/"))
})
gulp.task("zipcss",function(){
    gulp.src("./*.css").pipe(zipcss()).pipe(gulp.dest("./css/"))
})
gulp.task("zipjs",function(){
    gulp.src("./*.js").pipe(zipjs()).pipe(gulp.dest("./js/"))
})

