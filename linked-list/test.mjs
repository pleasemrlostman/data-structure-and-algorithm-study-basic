import { Node, LinkedList } from "./LinkedList.mjs";

let node1 = new Node(1);
let node2 = new Node(2);
let node3 = new Node(3);

node1.next = node2;
node2.next = node3;

// console.log(node1);
// console.log(node2);
// console.log(node3);
// console.log(node1.data);
// console.log(node1.next.data);
console.log(node1.next.next.data);

let list = new LinkedList();
console.log("======= insertAt() 다섯 번 호출 =======");
list.insertAt(0, 0);
list.insertAt(1, 1);
list.printAll();
console.log("list", list);
