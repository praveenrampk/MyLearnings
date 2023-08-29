class Shape {
    // base class for all shapes
  }
  
  class Rectangle extends Shape {
    constructor(width, height) {
        super();
      this.width = width;
      this.height = height;
    }
  }
  
  class Circle extends Shape {
    constructor(radius) {
      super();
      this.radius = radius;
    }
  }
  
  function calculateArea(shape) {
    console.log(shape instanceof Circle);
    if (shape instanceof Rectangle) {
      return shape.width * shape.height;
    } else if (shape instanceof Circle) {
      return Math.PI * shape.radius * shape.radius;
    } else {
      console.log(new Error("Unsupported shape"));
    }
  }
  
  const rect = new Rectangle(4, 5);
  const circle = new Circle(3);
  const shape = new Shape();

  console.log("Rectangle area:", calculateArea(rect)); // output: Rectangle area: 20
  console.log("Circle area:", calculateArea(circle)); // output: Circle area: 28.274333882308138
  console.log('Shape: ', calculateArea(shape));
  