class SortingNodes {
  data;
  count;
  next;

  constructor(data) {
    this.data = data;
    this.count = 1;
    this.next = null;
  }
}
let head = null,
  tail = null;

const isExisted = (data, node) => {
  if (node.data === data) {
    node.count++;
    return node;
  } else {
    isExisted(data, node.next);
  }

  return null;
};

const createNodes = (data) => {
  let newNode;
  if (!head) {
    newNode = new SortingNodes(data);
  } else {
    newNode = isExisted(data, head);
  }
  newNode ? (tail = tail.next = newNode) : (head = tail = newNode);
};

const displayNodes = () => {
  tail = head;

  while (tail) {
    console.log(tail.data, tail.count);
    tail = tail.next;
  }
};

((driverMethod) => {
  const array = [1, 2, 1, 2, 3, 4, 5, 3, 2, 3, 1, 43, 4, 4, 3];
  array.forEach((value) => createNodes(value));

  displayNodes();
})();
