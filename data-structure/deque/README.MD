# Deque

## 정의

- `deque`은 데이터의 삽입과 제거를 `head` 와 `tail` 동시에 할 수 있는 자유로운 자료구조이다.
- `deque`은 이러한 특성을 가지고 있기 때문에 `stack`과 `queue`를 전부 구현 할 수도 있다.

## 추상자료형

| 메서드      | 정의                   |
| ----------- | ---------------------- |
| printAll    | 모든 데이터 출력       |
| addFirst    | `head`에 데이터 삽입   |
| removeFirst | `head`에서 데이터 제거 |
| addLast     | `tail`에 데이터 삽입   |
| removeLast  | `tail`에서 데이터 제거 |
| isEmpty     | 리스트가 비었는지 체크 |

## 구현

이전에 이중연결리스트에서 모든 기능을 구현했기 때문에 쉽게 만들 수 있다.

### printAll()

이중연결리스트의 `printAll` 메서드를 이용하면 된다.

```js
  printAll() {
    this.list.printAll();
  }
```

### addFirst()

`head` 삽입은 `index`를 `0`으로 주고 `inserAt`메서드를 이용하면 `O(1)` 성능으로 구현 가능하다.

```js
  addFirst(data) {
    this.list.insertAt(0, data);
  }
```

### removeFirst()

리스트의 `deleteAt` 함수의 `index`를 `0`으로 주고 호출하면 `O(1)` 성능으로 구현 가능하다.

```js
  removeFirst() {
    return this.list.deleteAt(0);
  }

```

### addLast()

마지막 `index`에 추가 역시 tail을 이용해서 `O(1)` 성능으로 구현 가능하다. 리스트의 inertAt 메서드의 `index`로 현재 리스트의 `count`를 넣어주면 마지막 원소의 삽입을 의미한다.

```js
  addLast(data) {
    this.list.insertAt(this.list.count, data);
  }
```

### removeLast()

`deleteLast` 메서드를 통해 얻은 값을 `return`해준다

```js
  removeLast() {
    return this.list.deleteLast();
  }
```

### isEmpty()

`deque`가 비었는지 아닌지 확인하는 함수를 구현하겠다.

```js
  isEmpty() {
    return this.list.count == 0;
  }
```
