const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
 
(async () => {
    const files = await imagemin(['img/*.{jpg,png}'], {
        destination: 'build/',
        plugins: [
			imageminMozjpeg(),
            imageminJpegtran({
                progressive: true,
                arithmetic: true
            }),
            imageminPngquant({
                quality: [0.8, 1]
            })
        ]
    });
 
    // console.log(files);
    //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
})();