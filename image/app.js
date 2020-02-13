var images = require("images");

images("./img/001.png").save("./output/001.png", {               //Save the image to a file, with the quality of 50
  quality : 50                    //保存图片到文件,图片质量为50
});     