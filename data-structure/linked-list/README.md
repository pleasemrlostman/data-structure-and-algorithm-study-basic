# Linked List

- 연결리스트를 구현해보고 어떤식으로 작동하는지 상세한 설명을 작성하는 것을 목적으로 해당 문서를 작성하겠다.<br>
- 해당 문서는 눈으로만 읽어도 이해할 수 있게 작성하는 것을 원칙으로 하겠다.

```js
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}
```

연결리스틀 만들기 이전에 먼저 `Node`를 만들어야한다. `Node`는 `class`를 이용해서 객체로 제작하도록하자<br>

> class 문법에 익숙하지 않는다면 객체를 만들어주는 틀이라고 생각하면 편하다. `constructor` 메서드는 해당 클래스로 제작될 객체의 프로퍼티 값을 정해주는 함수라고 생각하면 편하다. 해당 클래스를 통해 만들어진 객체값에는 `data`와 `next`라는 프로퍼티를 가지고 `next`의 기본값은 `null`이라고 설정한다.

그렇다면 이제 `Node`를 생성해보자

```js
let node1 = new Node(1);
let node2 = new Node(2);
let node3 = new Node(3);
```

이렇게 노드를 작성해주면<br>
`ndoe1`에는 `{data:1, next:null}`<br>
`node2`에는 `{data:2, next:null}`<br>
`node3`에는 `{data:3, next:null}` 값이 부여된다<br>
그리고 next 속성을 통해 값들을 연결해주기위해<br>
`node1.next = node2` `node2.next = node3` 해당 코드를 작성해주고 `node.js`를 실행시키면

```js
Node {
  data: 1,
  next: Node { data: 2, next: Node { data: 3, next: null } }
}
Node { data: 2, next: Node { data: 3, next: null } }
Node { data: 3, next: null }
```

해당 값들이 생성된다 그러면 지금부터 진짜 연결리스틀 구현해보도록 하자 먼저 코드부터 살펴보자

---

```js
class LinkedList {
  constructor() {
    this.head = null;
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
  }

  insertAt(index, data) {
    if (index > this.count || index < 0) {
      throw new Error("범위를 넘어갔습니다.");
    }

    let newNode = new Node(data);
    if (index == 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let currentNode = this.head;
      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }
      newNode.next = currentNode.next;
      currentNode.next = newNode;
    }
    this.count++;
  }
}

export { Node, LinkedList };
```

---

## insertAt(index, data)

가장먼저 `LinkedList` 클래스를 생성해준다. 해당 클래스에서 나온 객체를 통해 연결 리스트를 만들 수 있다.<br>
우선 연결리스트의 `head` 프로퍼티 즉 첫번째 `Node`값을 `null`으로 초기화 시켜주고 해당 연결리스트의 갯수룰 `count`라는 프로퍼티로 제작 후 0개로 세팅했다.<br><br>

자 이제 연결리스트의 삽입을 만들어보자 `LinkedList` 클래스에 `inserAt` 메서드 즉 연결리스트에 노드를 추가해주는 메서드를 만들어주자<br>
inertAt은 두개의 인자를 받는다 첫 번째 인자는 몇번 index에 해당 노드를 넣을것인지, 두 번째로 어떤값을 넣을것인지 (여기서 data는 크게 중요하지 않음)<br><br>

우선 연결리스트는 0번부터 시작하기 때문에 index가 0이하이거나 또는 연결리스트의 갯수보다 더 큰 index에 삽입할 수 없기 때문에

```js
if (index > this.count || index < 0) {
  throw new Error("범위를 넘어갔습니다.");
}
```

해당 조건을 걸어둔다 해당 조건을 넘어가면

```js
let newNode = new Node(data);
```

`data`값을 받아 newNode를 만들어주고 (아직 여기서 `next`값은 `null`이다)
만약에 index 값이 0이란 말은 연결리스트의 최초값을 만들어준거기 떄문에

```js
if (index == 0) {
  newNode.next = this.head;
  this.head = newNode;
} else {
  let currentNode = this.head;
  for (let i = 0; i < index - 1; i++) {
    currentNode = currentNode.next;
  }
  newNode.next = currentNode.next;
  currentNode.next = newNode;
}
this.count++;
```

해당 코드에 의거하여 해당 `newNode.next`는 `this.head`로 (`null` 이다) 그리고 `this.head`즉 연결리스트 객체의 첫번째 값을 `index`값이 0인 noewNode로 할당된다. 그리고 `this.count`를 +1 해줘 해당 연결리스트에 1개의 `Node`가 값이 들어간걸 표현해준다.

이를 코드로 작성하면

```js
let list = new LinkedList(); // list라는 연결리스트를 생성한다 해당 list의 head값은 null이고 count도 0이다
list.insertAt(0, 0); // index즉 첫번째가 연결리스트를 생성해주고 그 값을 0으로 넣어준다


// 이렇게되면 list의 head는 {data:1, next:null} 값인 node 객체이고 count는 +1되서 1이다


❌ list.insertAt(1, 1)
/*
inserAt의 첫번째 인자를 0으로 넣어주지않고 바로 1을 넣어주면
list의 count값이 0이기 때문에 범위를 넘어갔습니다. 라는 에러가 발생한다.
*/

```

이후

`list.insertAt(1, 1);` `list.insertAt(2, 2);` 을 작성해보도록 하자<br>
현재 연결리스트인 `list` 의 count는 1이기 때문에 1보다 크지 않고 같기 때문에 if문에 걸리지않는다 그리고 index가 1이기 때문에 `if (index == 0)` 해당 조건문
에 걸리지 않고 else절로 넘어간다

```js
let newNode = new Node(data);
.
.
.
else {
      let currentNode = this.head;
      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }
      newNode.next = currentNode.next;
      currentNode.next = newNode;
}
```

그러나 `index`가 1이므로 `for` 반복문절에는 가지않는다<br>
현재 `head`값은 `{data:1, next:null}` 객체이다 그러므로 `newNode` `next` 값에 `currnetNode.next` 값인 `null` 할당되고
그러면 currnetNode는 새롭게 만들어진 newNode 즉 `{value:1, next:null}`이되고 `count`는 +1이 되어 2가되고 참고로 head값은 index값이 0일 때 설정되므로 바뀌지 않는다.

그러면 마지막으로 `list.insertAt(2, 2)` 명령어까지 봐보자<br>

```js
const list = LinkedList {
  head: Node { data: 0, next: Node { data: 1, next: null } },
  count: 2
}
```

현재 list `LinkedList`는 위의 코드처럼 구성되어있다. 이런 상황에서 `list.insertAt(2, 2)` 코드를 실행시키면

```js
let newNode = new Node(data);
.
.
.
else {
      let currentNode = this.head;
      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }
      newNode.next = currentNode.next;
      currentNode.next = newNode;
}
```

다시 해당 코드로 오게되고 `currnetNode는` 맨 첫 `head`값으로 오게된다

> 여기가 정말 중요한 부분인데 연결리스트의 삽입은 첫번째 노드로 와서 내가 삽입하고 싶은 index까지 반복문을 이용해서 n번째 index까지 이동한다 그래서 `big o(n)` 이라고 한다.

그리고 index 값이 2이므로 for문에 들어오고 cunnretNode는 currentNode의 next 즉 `{value:1,next:null}` 노드로 할당된다<br>
그리고 i가 1이되므로 for문을 나와서 newNode의 next값을 currnetNode의 next 즉 null값을 할당해주고 currnetNode의 next값 즉 원래 null이였던 값을 newNode 즉
`{value: 2, next: null}` 값으로 할당해준다. 이렇게 연결리스트의 삽입이 완성됐다.

---

## printAll()

`printAll()` 메서드는 삽입 메서드를 이해했으면 어렵지 않다. <br>

```js
list.insertAt(0, 0);
list.insertAt(1, 1);
list.insertAt(2, 2);
```

위의 코드처럼 연결리스트를 생성했다고 하자<br>

현재의 `currnetNode` 는 `this.head` 즉 `{data:0, next:{data:1,next:{data:2,next:null}}}` 이다.<br>

처음의 `text`는 `[` 이고 `while` 반복문을 돈다 `currentNode` 가 `null`이 아니므로 `text+=` 하여 `currentNode.data` 즉 `1` 그러므로 `[1` 이된다.<br>

그리고 `currentNode`는 현재 `currentNode`의 `next`값이 되니까 `{data:1,next:{data:2,next:null}}` 이되어 `currentNode !== null` 조간에 만족하므로 `text`는 `[1,`가 된다.<br>

그리고 다시 `while`문으로 돌아오면 `currnetNode`는 여전히 `{data:1,next:{data:2,next:null}}` 이기 때문에 `text`는 `2`가 더해져서 `[1,2` 가 되고 `currentNode`는 `{data:2,next:null}`로 변하게 된다.<br>

`null` 이 아니기 때문에 `,` 가 더해져서 `[1,2,`가되고 다시 `while`문을 한번 더 돌아서 `value`가 더해져 `[1,2,3` 이고 되고 currentNode가 null 이 됐기 때문에 `while`문을 나와 `]` 더해져서 `[1,2,3]` 이 됐다.

---

## insertLast()

연결리스트 마지막에 `Node`를 추가하는 메서드이다, 처음에 내가 생각했던 로직은 head에서 부터 `next`가 `null`이 될 때 까지 반복을하고 연결리스트 마지막
노드에 `next`값을 새로 추가된 `Node`로 변경해주고 추가된 `Node`에 `next`를 `null`로 변경해주는 로직을 생각했다.

```js
let newNode = new Node(data);
let currentNode = this.head;
while (currentNode.next !== null) {
  currentNode = currentNode.next;
}
currentNode.next = newNode;
```

위의 로직이 구현했던 로직이다, 물론 해당 로직이 틀린건 아니지만 더 간단히 구현하는 방법이 있다. 그건 바로 `insertAt()` 메서드를 재활용하는것이다.

```js
insertLast(data) {
  this.insertAt(this.count, data);
}
```

해당 로직 처럼 구현하면 자동으로 반복문을 돌아 마지막에 새로운 노드가 추가된다.

---

## deleteAt()

특정한 `index`의 `Node`를 삭제하는 방법이다.<br><br>

지우는건 가장 첫 `Node`를 지우는 케이스와 그 외의 케이스를 나누어서 작성해야한다.<br>
우선 가장 첫 번째 `Node`를 지우는 방법을 코드를 먼저 봐보자<br>

```js
if (index >= this.count || index < 0) {
  throw new Error("제거할 수 없습니다.");
}

let currentNode = this.head;
if (index == 0) {
  let deletedNode = this.head;
  this.head = this.head.next;
  this.count--;
  return deletedNode;
}
```

count보다 큰 영역과 0보다 작으면 삭제할 수 없으므로 우선 에러를 발생시켜주고<br>
현재 head값 즉 0번쨰 `Node`를 `currnetNode`로 설정해주고 `head`값 즉 가장 첫 `Node`를 삭제시켜줄 예정으로 해당 값을 `deletedNode` 변수에 할당해준다
그리고 `head` 값을 지금 `head` 값의 `next`로 수정해주고 `count` 값을 `-1`해주고 `deletedNode`값을 리턴해주면 완료<br><br>

두 번째로 `index`가 `0`이 아닌 경우를 살펴보자

해당 방법은 삭제하고 싶은 `Node` 직전까지 반복문을 돌고<br>
그 노드의 `next` 값을 삭제하고 싶은 `Node`의 `next` 값으로 변경해준다 (삭제하고싶은 `Node`의 다음 다음 값으로 수정해줘도 된다.)<br>
그리고 `count`값을 -1하고 삭제하고 싶은 `Node`를 `return` 해주면 된다.<br>
해당 코드는 처음 작성했던 코드 (잘못 작성 한 코드)와 정상적인 코드를 함께 보도록 하자.

```js
let deletedNode;
for (let i = 0; i < index - 1; i++) {
  currentNode = currentNode.next;
  deletedNode = currentNode.next;
  currentNode.next = deletedNode.next;
  this.count--;
  return deletedNode;
}
deletedNode = currentNode.next;
currentNode.next = deletedNode.next;
return deletedNode;
```

처음 생각한 코드는 반복문 안에서 나머지 로직을 수행해주고 있었다.<br>이러면 내가 제거하고싶은 값을 제거하고 한번 더 반복문이 실행되서 원하지 않는 값까지 제거 되는 문제가 생긴다.<br><br>가령 나는 `index`가 `3`인 `Node`를 지우고 싶다면 반복문을 `index - 1` 까지 돌아서 삭제하고 싶은 이전 `Node` 까지만 오고 로직을 실행시켜주면 되는데 해당 기능에선 예를들어 `count--` 로직이 두번이나 실행되게 된다.<br><br>

이러한 문제점을 수정한 코드는 아래를 살펴보자

```js
 for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }
      let deletedNode = currentNode.next;
      // currentNode.next = deletedNode.next;
      currentNode.next = currentNode.next.next;
      this.count--;
      return delete
```

만약 현재 `4`개의 `Node`가 있고 `3`번째 노드를 삭제해주고 싶다면 `deleteAt(index)` 메서드 인자에 `2` (`count`는 갯수 `index`값과 구분하자) 을 넣어준다 그러면<br>
`index`는 `count` 보다 작고 (`count` 값은 4이다) `0`보다 크다 <br>
그리고 `0`이 아니기 때문에 위의 로직으로 들어온다 `index - 1`이기 때문에 반복문은 `i`가 `0`일 때 `1`일 때 총 `1`번 돈다 그러면 <br>
`currentNode`는 `1`번째 `index`로 변경된다. `currentNode` `next` 값을 `deletedNode` 변수에 할당한다<br>
그리고 `currentNode` 값의 `next`를 <br> `deleteNode`의 `next`값으로 변경하고 (혹은 `currentNode` 의 `next.next` 값으로 변경)<br>
`deletedNode`값을 `return` 하고 `count`를 `-1`해주면 된다.

---

## deleteLast()

마지막 노드를 제거하는것도 기존의 메서드를 재활용해서 제거가능하다 만약 총 갯수가 4개라면 내가 제거하고싶은 `Node`의 `index` 값은 3이다. 그러므로 `count` 값 보다 `-1` 한 값이 인자로 들어가면 된다. 코드는 아래와 같다.

```js
  deleteLast() {
    console.log("what?", this.count);
    return this.deleteAt(this.count - 1);
  }
```

---

## getNodeAt()

특정 Node를 리턴하는 함수다 이도 어렵지 않게 `head`에서 원하는 `index`를 받아 반복시켜 `currentNode`값을 변경시켜주고 해당 값을 `return` 해주면 된다 코드는 아래와 같다.

```js
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
```
