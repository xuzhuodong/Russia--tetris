var Game = function() {
  //dom元素
  var gameDiv;
  var nextDiv; //分别对应这index.html里面个那两个元素。
  var timeDiv;
  var scoreDiv;
  var resultDiv;
  //分数
  var score = 0;

  //游戏矩阵 一开始初始化清零
  var gameData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  // divs
  var nextDivs = [];
  var gameDivs = [];
  //初始化Div
  var initDiv = function(container, data, divs) {
    for (var i = 0; i < data.length; i++) {
      var div = [];
      for (var j = 0; j < data[0].length; j++) {
        var newNode = document.createElement("div");
        newNode.className = "none";
        newNode.style.top = i * 20 + "px";
        newNode.style.left = j * 20 + "px";
        container.appendChild(newNode);
        div.push(newNode);
      }
      divs.push(div);
    }
  };
  //刷新Div
  var refreshDiv = function(data, divs) {
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[0].length; j++) {
        if (data[i][j] == 0) {
          divs[i][j].className = "none";
        } else if (data[i][j] == 1) {
          divs[i][j].className = "done";
        } else if (data[i][j] == 2) {
          divs[i][j].className = "current";
        }
      }
    }
  };

  //当前方块
  var cur;
  //下一个方块
  var next;

  //检测点：判断移动的过程中，方块是否出了游戏区域(是否合法)
  var check = function(pos, x, y) {
    //pos其实就是位置，也就是方块的原点 ==cur.origin
    //x和y就是cur.data这个二维数组他的一个投影，对应就是i和j
    if(pos.x + x < 0) { //说明这个点是在上面，超出了上边界
      return false;
    } else if(pos.x + x >= gameData.length) { //说明超出了下边界
      return false;
    } else if(pos.y + y < 0) { //说明超出了左边界
      return false
    } else if(pos.y + y >= gameData[0].length) { //说明超出了右边界
      return false
    } else if(gameData[pos.x + x][pos.y + y] == 1) {
      //如果gameData里面的数据等于1的话，也就是说这个位置已经有一个落下来的方块了，
      //那么这个地方同样不合法(这个位置已经被占了)。
      return false
    } else {  //除了上面这五种情况以外，其他的就是合法了
      return true
    }
  }
  //检测数据是否合法    是否可以下降
  var isValid = function(pos,data) {
    //pos对应的是origin原点，data对应的是方块的数据。
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[0].length; j++) {
        if(data[i][j] != 0) { //如果这里的点不是0的话，说明这个位置是有方块存在的
          if(!check(pos,i ,j)) { //再去判断
            return false;
          }
        }
      }
    }
    return true
  }

  //清除原来的数据，否则移动的时候原来的数据还在的话，就会导致方块变长或者变宽。
  var clearData = function() {
    //和设置数据正好相反
    for (var i = 0; i < cur.data.length; i++) {
      for (var j = 0; j < cur.data[0].length; j++) {
        //在清除原来数据之前，判断一下是否合法。合法就清除数据，否则返回
        if(check(cur.origin, i, j)) {
          gameData[cur.origin.x + i][cur.origin.y + j] = 0;
        }
      }
    }
  }
  //设置数据
  var setData = function() {
    for (var i = 0; i < cur.data.length; i++) {
      for (var j = 0; j < cur.data[0].length; j++) {
        //在设置数据之前，判断一下是否合法。
        if(check(cur.origin, i, j)) {
          gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
        }
      }
    }
  }
  //定义下移
  var down = function() {
    //在下降的时候，判断一下他是否可以下降，否则都到底部了你还下降的话那就不见了(在square.js里设置)
    if (cur.canDown(isValid)) {
      //别忘记导出
      //在下移之前先把数据清零，再去设置它的原点
      clearData();
      //如何下移呢？原理是什么？
      // cur.origin.x = cur.origin.x + 1; //相当于把它的原点向下移动一位。
      cur.down();
      setData(); //别忘记刷新
      refreshDiv(gameData, gameDivs);
      //如果还能向下，true
      return true;
    } else {
      return false
    }
  }
  //定义左移
  var left = function() {
    if (cur.canLeft(isValid)) {
      clearData();
      cur.left();
      setData(); //别忘记刷新
      refreshDiv(gameData, gameDivs);
    }
  }
  //定义右移
  var right = function() {
    if (cur.canRight(isValid)) {
      clearData();
      cur.right();
      setData(); 
      refreshDiv(gameData, gameDivs);
    }
  }
  //定义旋转
  var rotate = function() {
    if (cur.canRotate(isValid)) {
      clearData();
      cur.rotate();
      setData(); 
      refreshDiv(gameData, gameDivs);
    }
  }
 
  //下落到底部后固定住   别忘记导出
  var fixed = function() {
    for(var i=0; i<cur.data.length; i++) {
      for(var j=0; j<cur.data[0].length; j++) {
        //检查这个点合不合法,合法后还要再去判断这个位置
        if(check(cur.origin, i, j)) {
          if(gameData[cur.origin.x +i][cur.origin.y +j] == 2) {
            gameData[cur.origin.x +i][cur.origin.y +j] = 1;
          }
        }
      }
    }
    //在循环结束后
    refreshDiv(gameData, gameDivs);
  }

  //消行  记得导出
  var checkClear = function() {
    var line = 0; //记住所消的行数，以后记分用的
    //从gameData的底部往上检查，当某一行满足这个消行条件后，就把它消除，然后它上面的所有方块都往下移一格。
    for(var i = gameData.length -1; i>=0; i--) {
      var clear = true;
      for(var j=0; j<gameData[0].length; j++) {
        if(gameData[i][j] != 1) {
          clear = false; //如果这一行不为1的话，就不能消除
          break;
        }
      }
      if(clear) {
        line = line +1;
        for(var m=i; m>0; m--) {
          for(var n=0; n<gameData[0].length; n++) {
            gameData[m][n] = gameData[m-1][n];
          }
        }
        for(var n=0; n<gameData[0].length; n++) {
          gameData[0][n] = 0;
        }
        i++;
      }
    }
    return line;
  }

  //检查游戏结束  记得导出
  var checkGameOver = function() {
    var gameOver = false;
    for(var i=0; i<gameData[0].length; i++) {
      if(gameData[1][i] == 1) {
        gameOver = true;
      }
    }
    return gameOver;
  }

  //使用下一个方块  记得导出
  var performNext = function(type,dir) {
    cur = next;
    //setData就是让当前数据反映到gameData数组里面去，然后next方块再去生成一个新的
    setData();
    next = SquareFactory.prototype.make(type,dir);
    refreshDiv(gameData, gameDivs);
    refreshDiv(next.data,nextDivs);
  }

  //设置时间
  var setTime = function(time) {
    timeDiv.innerHTML = time;
  }
  //加分
  var addScore = function(line) {
    var s = 0;
    switch(line) {
      case 1:
        s = 10;
        break;
      case 2:
        s = 30;
        break;
      case 3:
        s = 60;
        break;
      case 4:
        s = 100;
        break;
      default:
        break;
    }
    score = score + s;
    scoreDiv.innerHTML = score;
  }

  //游戏结束信息
  var gameover = function(win) {
    if(score >= 10) { //这里的参数原来是win， 我把它改为score >= 10;
      resultDiv.innerHTML = "你赢了！恭喜";
    } else {
      resultDiv.innerHTML = "很遗憾，你输了，再来一次吧";
    }
  }

  //初始化   
  var init = function(doms, type, dir) {
    gameDiv = doms.gameDiv;
    nextDiv = doms.nextDiv;
    timeDiv = doms.timeDiv;
    scoreDiv = doms.scoreDiv;
    resultDiv = doms.resultDiv;
    // cur = SquareFactory.prototype.make(2,2); //这两个不能写死，否则每次刷新都会是它，我们应该让他随机出现的
    next = SquareFactory.prototype.make(type, dir); //这两个不能写死，否则每次刷新都会是它，我们应该让他随机出现的

    initDiv(gameDiv, gameData, gameDivs);
    initDiv(nextDiv, next.data, nextDivs);

    //这里是手动的添加游戏区域方块，通过for循环来输出
    // cur.origin.x = 10;
    // cur.origin.y = 5;

    // setData()
  
    // refreshDiv(gameData, gameDivs);
    refreshDiv(next.data, nextDivs);
  };
  //导出API  在local中进行调用。在外面就可以通过init来调用这里的init函数了。
  this.init = init;
  this.down = down;
  this.left = left;
  this.right = right;
  this.rotate = rotate;
  this.fall = function() {  while(down());  }
  this.fixed = fixed;
  this.performNext = performNext;
  this.checkClear = checkClear;
  this.checkGameOver = checkGameOver;
  this.setTime = setTime;
  this.addScore = addScore;
  this.gameover = gameover;
};
