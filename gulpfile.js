var gulp = require('gulp');
var gulpWebpack = require('webpack-stream');
var webpack = require('webpack');
var rename = require('gulp-rename');
var rimraf = require('rimraf');
var imgmin = require('gulp-imagemin');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var fs = require('fs');
var rev = require('gulp-rev');
var path = require('path');
var exec = require('child_process').exec;
var named = require('vinyl-named');
var util =require('util');
var sass = require('gulp-ruby-sass');
gulp.task('clear', function() {
	rimraf('./dist', function() {
		console.log('clear success');
	});
});
gulp.task('pack', function() {
    var targetDir = gulp.env.dir.toString();
    //rimraf删除wx下面的文件
	rimraf('./dist/static/*/'+targetDir, function() {
        //压缩图片开始
        gulp.src(['./assets/static/images/'+targetDir+'/*'])
			.pipe(imgmin({
				optimizationLevel: 2,
				progressive: true,
				interlaced: true
			}))
			.pipe(gulp.dest('./dist/static/images/'+targetDir+'/'));
        //压缩图片结束
        //压缩公共css开始
		gulp.src(['./assets/static/css/'+targetDir+'/common/common.css'])
			.pipe(minifyCss())
			.pipe(gulp.dest('./dist/static/css/'+targetDir+'/common/'));
        //压缩公共css结束
        //压缩css开始
		gulp.src(['./assets/static/css/'+targetDir+'/*.css'])
			//.pipe(concat('wx.min.css'))
			.pipe(minifyCss())
			.pipe(gulp.dest('./dist/static/css/'+targetDir+'/'));
        //压缩css结束
        //压缩js开始
		gulp.src('./assets/static/js/'+targetDir+'/*.js')
        //names()是根据assets上得文件名在dist上生成一个一样名字的
		.pipe(named())
		.pipe(gulpWebpack({
        //根据引入会找到相同的模块打包成common的文件夹
			plugins: [
                new webpack.optimize.CommonsChunkPlugin('common/common.js')
            ],
			module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'jsx-loader?insertPragma=React.DOM&harmony'
                }, {test: /\.jsx$/,
                    loader: 'jsx-loader?insertPragma=React.DOM&harmony'
                }]
			},resolve: {
                extensions: ['', '.js', '.jsx']
            }
		}))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/static/js/'+targetDir+'/'));
	});
    //压缩js结束
});
gulp.task('copyDistwx',function() {
    var sourcePath = path.join(__dirname, './dist/*'),
        desPath = path.join(__dirname, './st/');
    if (fs.existsSync(desPath)) {
        var commond = util.format('cp -r %s %s', sourcePath, desPath);
        exec(commond, function() {
            console.log('copy mall rev dist file to st success...');
        });
    } else {
        console.log('target svn file is not exist....');
    }
});

