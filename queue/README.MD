# Queue

## 정의

- FIFO (First In First Out) 먼저 들어간 데이터가 먼저 나오는 규칙을 따른다. (먼저 들어간게 나중에 나오는 스택과는 반대)
- `Queue`는 운영체제에서도 쓰인다.
  - 운영체제가 프로세스의 작업요청을 들어온 순서대로 큐에 넣고 CPU가 순서대로 처리 (이를 FIFO 스케줄링이라고 한다.)
- 일상생활에서 질서를 위해 서는 줄은 모두 `Queue`

## 구현방법

- 데이터 1, 2, 3, 4를 순서대로 삽입한다면 `head`에 삽입하면 된다
- 그리고 가장 뒤에서 부터 데이터를 제거하면 된다.
- 삽입에는 큰 문제가 없다. 하지만 가장 뒤의 노드를 제거하려면 가장 앞의 `head` 노드부터 순서대로 타고 가야한다. 즉 `O(n)` 의 성능
- 성능을 위해서 우리는 `tail` 이라는 변수를 만들어준다.
- `head`는 가장 앞에 있는 `Node` `tail`은 가장 뒤에있는 `Node`를 가리킨다.
  - 이렇게 되면 `tail`을 이용해서 데이터를 `O(1)`의 성능으로 제거할 수 있다.
- `tail` 이 가리키는 `Node`는 삭제하면 그만이지만 삭제된 `Node`의 이전 `Node`를 다시 `tail`로 설정해야 한다
  - 우리가 만든 연결리스트는 단 방향 연결리스트 이기 때문에 `tail`로 이전 `Node`를 참조하는 것은 불가능하다.
  - 만약 `head`에서 또 마지막 `Node`를 찾는다면 성능은 `O(n)`으로 복귀한다.
  - 그렇기 때문에 이중연결리스트로 이전 `Node`를 참조할 수 있게 수정해야 한다.

## 이중연결리스트 구현

`Queue`를 구현하기 전에 연결리스트를 이중연결리스트로 변경하여 `head`값 말고도 `tail` 값을 이용해 `O(n)`의 성능을 `O(1)`의 성능으로 만들도록 하자

### 생성자 함수 수정

- 가장 먼저 `Node` `class`에 `prev`란 값을 만들어주자. 각각의 `Node`가 이전 `Node`를 참조해야 하므로 생성자함수에 `prev`값을 추가해주고 기본 값을 `null`로 할당해준다

```js
class Node {
  constructor(data, next = null, prev = null) {
    this.data = data;
    this.next = next;
    this.prev = prev; // 이전값도 받아야 하기 때문에 prev 프로퍼티 추가
  }
}
```

---

### inserAt()

우선 `inserAt()` 코드를 수정하도록 하자 가장먼저 `index == 0` 일 떄를 보자 `index`가 `0`일 때는 두가지 경우로 나눌 수 있다.<br>

첫 번째로 `head`가 `null`인 경우 즉 해당 연결리스트에 아무런 요소도 없는 경우다. 이 경우에는 `this.head`를 `newNode`에 할당하고 `newNode.next` 즉 요소가 1개 밖에 없다면 `tail`값도 동일하게 수정해줘야 한다.<br>

두 번째로 `head`가 `null`이 아닌경우가 있다. 즉 이경우는 `count`값이 `1`이상인 상태에서 `head`값을 변경해주고 기존 `head`의 `prev`값을 변경된 `head`로 할당해주면 된다

```js
  insertAt(index, data) {
    ...
    let newNode = new Node(data);
    if (index == 0) {
      newNode.next = this.head;
      if (this.head !== null) {
        this.head.prev = newNode;
        // 만약 헤드에 추가한다면 기존의 헤드의 prev값을 새로 추가한 노드 값으으로 할당해준다
      }
      this.head = newNode;
    }

    if (newNode.next == null) {
      this.tail = newNode;
    }

    this.count++;
  }

```

그리고 `index`가 `this.count` 값과 동일 할때 즉 맨 마지막에 삽입하는 경우를 추가해줘야 한다.<br>
새롭게 생긴 `Node` 즉 `NewNode`의 `next` 값은 `null`로 해준다 (왜냐하면 더 이상 `next`값이 없으므로) 그리고 `NewNode`의 `prev`값은 현재의 `tail`값으로 해주고 현재 `tail`값의 `next` 값을 `NewNode`로 변경해준다 그러면 `NewNode`의 `next`값이 `null`이기 때문에 `tail`을 `NewNode`로 변경해주면 된다.<br><br>

```js
  insertAt(index, data) {
    ...
    let newNode = new Node(data);

    .
    .
    .

    else if (index == this.count) {
      // 맨 마지막에 삽입하는 경우도 추가 해줘야함
      newNode.next = null;
      newNode.prev = this.tail;
      this.tail.next = newNode;
    }
    if (newNode.next == null) {
      this.tail = newNode;
    }
    this.count++;
  }
```

마지막으로 중간에 삽입하는 경우도 코드를 수정해줘야 한다 왜냐하면 `prev` 값을 할당 해야하기 때문이다.<br>

우선 추가하려는 `index`의 직전의 `Node`를 `currentNode`에 할당해준다. 그리고 `NewNode`의 `next`값을 `currentNode`의 `next` 값으로 할당하고 그리고 `NewNode`의 `prev`값을 `currentNode`값으로 할당한다. 그리고 `currentNode`의 `next`를 `newNode`로 할당하고 `NewNode`의 `next`의 즉 기존 `currentNode`의 `next`값의 `prev`를 `newNode`로 할당한다.

```js
  insertAt(index, data) {
    ...
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
      newNode.prev = currentNode; // 새로 삽입한 노드의 이전을 현재 노드로 해주고 (반복문을 -1 만큼 돌리기 때문)

      currentNode.next = newNode;
      newNode.next.prev = newNode; // 새로 삽입한 노드의 이전 노드를 새로 삽입한 노드로 변경해준다
    }
    if (newNode.next == null) {
      this.tail = newNode;
    }
    this.count++;
  }
```

---

### deleteAt()

제거하는 경우도 마찬가지로 `prev`값의 할당을 수정해줘야 하기 때문에 기존의 코드를 수정해야한다 `insertAt`과 마찬가지로 `head`를 지울 때 즉 지우는 `index`번호가 `0`번 일 때를 살펴보도록 하자<br><br>

우선 `0` 을 지운다는건 `deletedNode`가 `this.head`가 된다는걸 의미한다. 그리고 `this.head.next`가 `null`인 경우 즉 `count`값이 `1`이고 해당 연결리스트 요소가 한개 밖에 없는 경우는 `this.head` 와 `this.tail`을 `null`로 변경해주고 `this.count`를 `-1` 해주면 된다.<br><br>
만약 그렇지 않을경우 `this.head`는 현재 `head`의 `next`값으로 변경해주고 변경된 `this.head.prev`값을 `null`로 할당해주면 된다.<br><br>

```js
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
    }
  }
```

두 번째로 마지막 요소를 지울 경우를 수정 해야한다. 이 경우 `deletedNode`는 `this.tail`이 된다
그리고 마지막 요소의 이전값의 다음값을 `null`로 수정해주고 `this.tail.prev.next = null` `this.tail`은 현재 마지막 요소의 이전값으로 변경해준다 (`this.tail = this.tail.prev`) 그리고 `count`를 `-1` 해주고 `deletedNode`를 리턴해준다

```js
deleteAt(index) {
    if (index >= this.count || index < 0) {
      throw new Error("제거할 수 없습니다.");
    }

    let currentNode = this.head;
    else if (index == this.count - 1) {
      let deletedNode = this.tail;

      this.tail.prev.next = null;
      this.tail = this.tail.prev;
      this.count--;
      return deletedNode;
    }
  }
```

마지막으로 중간의 요소를 제거해주는 경우도 수정해줘야 한다. 수정해줄 `index` 이전값으로 `currentNode`를 옮겨주고 `deletedNode`는 `currentNode`의 `next`값으로 할당 해준다. 그리고 그리고 `currentNode`의 `next`는 `currentNode`의 `next`의 `next` 값으로 할당해주고 변경된 `currentNode`의 `next`의 `prev` 값은 `currentNode`로 수정해준다. 그리고 `count`값을 `-1`해주고 `deletedNode`를 `return` 해준다
