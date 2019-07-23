var Square1 = function () {
    Square.call(this)
    /* 
        //方块数据   4x4的二维数组
        this.data = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        //原点，是一个对象，初始化为零
        this.origin = {
            x: 0,
            y: 0
        };
        //旋转方向
        this.dir = 0; //默认是0
    */
    //定义一个旋转数组  包含旋转的四种状态
    this.rotates = [
        [[0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0]],
        [[0, 0, 0, 0], [2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0]],
        [[0, 0, 0, 0], [2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0]]
    ];
};
Square1.prototype = Square.prototype;

//Square2和Square1唯一不同的事旋转速度
//Square2
var Square2 = function() {
    Square.call(this)
    this.rotates = [
      [
        [0, 2, 0, 0], 
        [2, 2, 2, 0], 
        [0, 0, 0, 0], 
        [0, 0, 0, 0]
      ],
      [
        [2, 0, 0, 0], 
        [2, 2, 0, 0], 
        [2, 0, 0, 0], 
        [0, 0, 0, 0]
      ],
      [
        [2, 2, 2, 0], 
        [0, 2, 0, 0], 
        [0, 0, 0, 0], 
        [0, 0, 0, 0]
      ],
      [
        [0, 2, 0, 0], 
        [2, 2, 0, 0], 
        [0, 2, 0, 0], 
        [0, 0, 0, 0]
      ]
    ];
  };
Square2.prototype = Square.prototype;
  
//Square3
var Square3 = function() {
    Square.call(this)
    //旋转数组
    this.rotates = [
      [
        [2, 2, 2, 0], 
        [0, 0, 2, 0], 
        [0, 0, 0, 0], 
        [0, 0, 0, 0]
      ],
      [
        [0, 2, 0, 0], 
        [0, 2, 0, 0], 
        [2, 2, 0, 0], 
        [0, 0, 0, 0]
      ],
      [
        [2, 0, 0, 0], 
        [2, 2, 2, 0], 
        [0, 0, 0, 0], 
        [0, 0, 0, 0]
      ],
      [
        [2, 2, 0, 0], 
        [2, 0, 0, 0], 
        [2, 0, 0, 0], 
        [0, 0, 0, 0]
      ]
    ];
  };
Square3.prototype = Square.prototype;

//Square4
var Square4 = function() {
    Square.call(this)
    //旋转数组
    this.rotates = [
      [
        [2, 2, 2, 0], 
        [2, 0, 0, 0], 
        [0, 0, 0, 0], 
        [0, 0, 0, 0]
      ],
      [
        [2, 2, 0, 0], 
        [0, 2, 0, 0], 
        [0, 2, 0, 0], 
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 2, 0], 
        [2, 2, 2, 0], 
        [0, 0, 0, 0], 
        [0, 0, 0, 0]
      ],
      [
        [2, 0, 0, 0], 
        [2, 0, 0, 0], 
        [2, 2, 0, 0], 
        [0, 0, 0, 0]
      ]
    ];
  };
Square4.prototype = Square.prototype;

//Square5
var Square5 = function() {
    Square.call(this)
    //旋转数组
    this.rotates = [
      [
        [2, 2, 0, 0], 
        [2, 2, 0, 0], 
        [0, 0, 0, 0], 
        [0, 0, 0, 0]
      ],
      [
        [2, 2, 0, 0], 
        [2, 2, 0, 0], 
        [0, 0, 0, 0], 
        [0, 0, 0, 0]
      ],
      [
        [2, 2, 0, 0], 
        [2, 2, 0, 0], 
        [0, 0, 0, 0], 
        [0, 0, 0, 0]
      ],
      [
        [2, 2, 0, 0], 
        [2, 2, 0, 0], 
        [0, 0, 0, 0], 
        [0, 0, 0, 0]
      ]
    ];
  };
Square5.prototype = Square.prototype;

//Square6
var Square6 = function() {
    Square.call(this)
    //旋转数组
    this.rotates = [
      [
        [0, 2, 2, 0], 
        [2, 2, 0, 0], 
        [0, 0, 0, 0], 
        [0, 0, 0, 0]
      ],
      [
        [2, 0, 0, 0], 
        [2, 2, 0, 0], 
        [0, 2, 0, 0], 
        [0, 0, 0, 0]
      ],
      [
        [0, 2, 2, 0], 
        [2, 2, 0, 0], 
        [0, 0, 0, 0], 
        [0, 0, 0, 0]
      ],
      [
        [2, 0, 0, 0], 
        [2, 2, 0, 0], 
        [0, 2, 0, 0], 
        [0, 0, 0, 0]
      ]
    ];
  };
Square6.prototype = Square.prototype;

//Square7
var Square7 = function() {
    Square.call(this)
    //旋转数组
    this.rotates = [
      [
        [2, 2, 0, 0], 
        [0, 2, 2, 0], 
        [0, 0, 0, 0], 
        [0, 0, 0, 0]
      ],
      [
        [0, 2, 0, 0], 
        [2, 2, 0, 0], 
        [2, 0, 0, 0], 
        [0, 0, 0, 0]
      ],
      [
        [2, 2, 0, 0], 
        [0, 2, 2, 0], 
        [0, 0, 0, 0], 
        [0, 0, 0, 0]
      ],
      [
        [0, 2, 0, 0], 
        [2, 2, 0, 0], 
        [2, 0, 0, 0], 
        [0, 0, 0, 0]
      ]
    ];
  };
Square7.prototype = Square.prototype;

//方块工厂
var SquareFactory = function() {

}
//在他的原型链上定义一个方法  制造方块的
SquareFactory.prototype.make = function(index,dir) {
  //index代表的是七种方块的种类。dir代表它旋转的方向
  var s;
  index = index + 1;  //因为index是从零开始的，所以要+1
  switch(index) {
    case 1:
      s = new Square1();
      break;
    case 2:
      s = new Square2();
      break;
    case 3:
      s = new Square3();
      break;
    case 4:
      s = new Square4();
      break;
    case 5:
      s = new Square5();
      break;
    case 6:
      s = new Square6();
      break;
    case 7:
      s = new Square7();
      break;
    default:
      break;
  }
  //接着定义它的原点
  s.origin.x = 0;
  s.origin.y = 3;
  s.rotate(dir);
  return s;
}