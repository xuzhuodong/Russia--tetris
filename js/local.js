var Local = function() {
  //游戏对象
  var game;

  //时间间隔
  var INTERVAL = 200;

  //定时器 初始化为null
  var timer = null;

  //时间计数器
  var timeCount = 0;
  //时间
  var time = 0;

  //绑定键盘事件，首先完成向下功能
  var bindKeyEvent = function() {
    document.onkeydown = function(e) {
      if (e.keyCode == 38) {
        //up上
        game.rotate();
      } else if (e.keyCode == 39) {
        //right右
        game.right();
      } else if (e.keyCode == 40) {
        //down下
        game.down();
      } else if (e.keyCode == 37) {
        //left左
        game.left();
      } else if (e.keyCode == 32) {
        //space空格
        game.fall();
      }
    };
  };

  //定义移动move
  var move = function() {
      timeFunc();
    //让这个方块下落。调用game.down
    // game.down();
    //在它下落到底部后(原来还可以左右移动，不能旋转)，我们要把它固定住，不能在左右移动了
    //在河里还要去判断一下它能否再继续下降
    if (!game.down()) {
      game.fixed();
      //当达到一定条件后，方块会自动消去，例如某一行全部都是方块的时候
      var line = game.checkClear();
      if(line) {
          game.addScore(line);
      }
      //游戏结束：当方块到达顶部的时候游戏结束
      var gameOver = game.checkGameOver();
      if(gameOver) {
          game.gameover(false);
          stop();
      } else {
        game.performNext(generateType(), generateDir());
      }
    //   game.performNext(generateType(), generateDir());
    }
  }
  //计时开始
  var timeFunc = function() {
      timeCount = timeCount + 1;
      if(timeCount == 5) { //已经达到1s了
        timeCount = 0;
        time = time + 1;
        game.setTime(time);
      }
  }
  //随机生成分开
  var generateType = function() {
    return Math.ceil(Math.random() * 7) - 1; //生成0到6的整数
  };
  //随机生成旋转分开种类
  var generateDir = function() {
    return Math.ceil(Math.random() * 4) - 1; //生成0到3的整数
  };

  //开始
  var start = function() {
    //构造doms
    var doms = {
      gameDiv: document.getElementById("game"),
      nextDiv: document.getElementById("next"),
      timeDiv: document.getElementById("time"),
      scoreDiv: document.getElementById("score"),
      resultDiv: document.getElementById("gameover")
    };
    //构造后再给它初始化一下
    game = new Game();
    game.init(doms, generateType(), generateDir()); //调用game.js中的init函数。
    bindKeyEvent(); //调用向下函数，完成向下功能
    //在定时器开始之前调用game.performNext();
    game.performNext(generateType(), generateDir());
    timer = setInterval(move, INTERVAL);
  };

  //结束
  var stop = function() {
      //关掉定时器
      if(timer) {
          clearInterval(timer);
          timer = null;
      }
      //再清掉键盘事件
      document.onkeydown = null;
  }
  //还需要导出API
  this.start = start;
};
