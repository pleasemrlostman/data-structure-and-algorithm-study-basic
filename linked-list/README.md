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
## 삽입 - insertAt(index, data)

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

## 보여주기 - printAll()

`printAll()` 메서드는 삽입 메서드를 이해했으면 어렵지 않다. <br>
```js
list.insertAt(0, 0);
list.insertAt(1, 1);
list.insertAt(2, 2);
```

위의 코드처럼 연결리스트를 생성했다고 하자<br>

현재의 `currnetNode` 는 `this.head` 즉 `{data:0, next:{data:1,next:{data:2,next:null}}}` 이다.<br>

처음의 `text`는 `[` 이고 `while` 반복문을 돈다 `currentNode` 가 `null`이 아니므로  `text+=` 하여 `currentNode.data` 즉 `1` 그러므로 `[1` 이된다.<br>

그리고 `currentNode`는 현재 `currentNode`의 `next`값이 되니까 `{data:1,next:{data:2,next:null}}` 이되어 `currentNode !== null` 조간에 만족하므로 `text`는 `[1,`가 된다.<br>

 그리고 다시 `while`문으로 돌아오면 `currnetNode`는 여전히 `{data:1,next:{data:2,next:null}}` 이기 때문에 `text`는 `2`가 더해져서 `[1,2` 가 되고 `currentNode`는 `{data:2,next:null}`로 변하게 된다.<br>
 
 `null` 이 아니기 때문에 `,`  가 더해져서 `[1,2,`가되고 다시 `while`문을 한번 더 돌아서 `value`가 더해져 `[1,2,3` 이고 되고 currentNode가 null 이 됐기 때문에 `while`문을 나와 `]` 더해져서 `[1,2,3]` 이 됐다.