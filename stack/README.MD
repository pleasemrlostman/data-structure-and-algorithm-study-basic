# Stack

## 정의

- `스택`은 아주 단순한 규칙을 가지고 있는 `리스트`
- `FILO (First in Last Out)` 먼저 들어간 데이터가 나중에 나오는 규칙
- 먼저 들어온 게 나중에 쓰이는 데이터 구조를 `스택`이라고 부른다.
- `스택`은 먼저 들어온 데이터가 나중에 나간다면 어떤 자료구조로 구현하든지 상관없다.

## 필요한 이유

- 차례가 중요할 때는 `스택`은 쓸모 없는 자료구조라고 생각할 수 있다.
- 포토샵의 `CTRL + Z` 기능 같은 경우 작업 내용을 `스택`에 쌓아두면 쉽게 이전 작업으로 돌아 갈 수 있다.
- 자바스크립트의 문법검사기도 `스택` 자료구조를 이용해 구현할 수 있다. (괄호 체크)

## 구현과정

`스택`의 구현은 `연결리스트`만 만들어 두면 어렵지 않게 구현할 수 있다. 구현 코드를 보면서 어떤 방식으로 구현 했는지 살펴보자. <br>

---

### stack class 선언

```js
class Stack {
  constructor() {
    this.list = new LinkedList();
  }
}
```

스택 구현은 연결리스트를 통해서 구현가능하므로 해당 인스턴스의 프로퍼티인 `list` 값을 연결리스트로 할당해주자

---

### push()

```js
class Stack {
  .
  .
  .
  push(data) {
    this.list.insertAt(0, data);
  }
}

```

스택은 새로 들어온게 항상 0번째 index 자리로 들어온다 그러므로 연결리스트의 insertAt() 메소드를 이용해 항상 0번째 index값에 data를 넣어 주면된다

---

### pop()

```js
class Stack {
    .
    .
    .
    pop() {
        try {
        return this.list.deleteAt(0);
        } catch (e) {
        return null;
        }
    }
}
```

`스택`은 처음에 들어온 요소가 가장 나중에 나가는 `FILO` 규칙이다.<br>
그러므로 삭제할 때도 가장 나중에 들어온 `0`번째 `index`값을 삭제 해주면 된다. 연결리스트에서 `deleteAt()` 메서드를 이용해서 삭제해주면 되는데 만약 연결리스트의 `count`값이 `0`인 경우 `error`를 리턴하니 `try/catch` 문을 이용해서 `error`값을 핸들링해 주도록 하자

### peek() / isEmpty()

```js
class Stack {
   .
   .
   .
  peek() {
    return this.list.getNodeAt(0);
  }
  isEmpty() {
    return this.list.count == 0;
  }
}
```

`peek()` 메서드는 `스택`의 `Top`에 있는 데이터 즉 `index`가 `0`번째인 데이터를 참조만한다.<br>
`isEmpty()` 메서드는 `스택`이 비어있는지 아닌지 판단하는데 사용하므로 `스택`에서 사용중인 연결리스트의 `count`값을 확인하여 알아 볼 수 있다.
