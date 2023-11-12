class Node {
  constructor(data, next = null, prev = null) {
    this.data = data;
    this.next = next;
    this.prev = prev; // 이전값도 받아야 하기 때문에 prev 프로퍼티 추가
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null; // 큐를 구현하기 위해 리스트의 끝을 가리키는 프로퍼티도 추가
    this.count = 0;
  }

  printAll() {
    let currentNode = this.head;
    let text = "[";
    while (currentNode !== null) {
      text += currentNode.data;
      currentNode = currentNode.next;
      if (currentNode !== null) {
        text += ", ";
      }
    }

    text += "]";

    console.log(text);
  }

  clear() {
    this.head = null;
    this.count = 0;
  }

  insertAt(index, data) {
    if (index > this.count || index < 0) {
      throw new Error("범위를 넘어갔습니다.");
    }

    let newNode = new Node(data);
    if (index == 0) {
      newNode.next = this.head;
      if (this.head !== null) {
        this.head.prev = newNode; // 만약 헤드에 추가한다면 기존의 헤드의 prev값을 새로 추가한 노드 값으으로 할당해준다
      }
      this.head = newNode;
    } else if (index == this.count) {
      // 맨 마지막에 삽입하는 경우도 추가 해줘야함
      newNode.next = null;
      newNode.prev = this.tail;
      this.tail.next = newNode;
    } else {
      let currentNode = this.head;
      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }
      newNode.next = currentNode.next;
      newNode.prev = currentNode; // 새로 삽입한 노드의 이전을 현재 노드로 해주고 (반복문을 -1 만큼 돌리기 때문)

      currentNode.next = newNode;
      newNode.next.prev = newNode; // 새로 삽입한 노드의 이전 노드를 새로 삽입한 노드로 변경해준다
    }

    if (newNode.next == null) {
      this.tail = newNode;
    }

    this.count++;
  }

  insertLast(data) {
    this.insertAt(this.count, data);
  }

  deleteAt(index) {
    if (index >= this.count || index < 0) {
      throw new Error("제거할 수 없습니다.");
    }

    let currentNode = this.head;
    if (index == 0) {
      let deletedNode = this.head;
      if (this.head.next == null) {
        // head와 tail이 똑같은 경우
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.head.prev = null;
      }
      this.count--;
      return deletedNode;
    } else if (index == this.count - 1) {
      let deletedNode = this.tail;

      this.tail.prev.next = null;
      this.tail = this.tail.prev;
      this.count--;
      return deletedNode;
    } else {
      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }
      let deletedNode = currentNode.next;
      currentNode.next = currentNode.next.next;
      currentNode.next.prev = currentNode;
      this.count--;
      return deletedNode;
    }
  }
  deleteLast() {
    return this.deleteAt(this.count - 1);
  }

  getNodeAt(index) {
    if (index >= this.count || index < 0) {
      throw new Error("범위를  넘어갔습니다.");
    }

    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
}

export { Node, DoublyLinkedList };
