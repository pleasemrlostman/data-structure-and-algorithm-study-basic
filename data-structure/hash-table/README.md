# HashTable

## 정의

- 해시 테이블은 해시와 테이블이 합쳐진 자료구조이다.

## 특징

- 해시 테이블은 프로그래밍 언어에 따라서 조금씩 다른 이름을 가지고 있다. (해시, 맵, 해시맵, 딕셔너리)

- 테이블을 구현하는 방법은 배열로 만들어 주면된다 => 매우 간단하지만 단점이 존재한다.
- 특정 경우에는 특정한 인덱스에 빈 공간이 발생할 수 있다. 만약 마지막 `index`가 `99`인데 `10`번 `index` 부터 데이터가 없다면 `11 ~ 98` 까지는 낭비되는 공간이 발생한다.
- 이럴 경우 특정 `index` 를 `해시 함수`를 통해 낭비되는 메모리 없이 배열에 꽉 채우게 한다.
- 하지만 중복되는 `index`에 할당되는 경우가 있는데 이를 `Collision` 이 났다고 한다
- 이러한 충돌을 해결하기 위해 해당 인덱스를 연결 리스트로 구성해 데이터를 연결한다.
- 만약 어떠한 데이터를 찾을려면 처음에는 배열의 인덱스로 접근 이 때는 `O(1)`의 성능을 갖고 이후 해당 인덱스의 연결리스트로 데이터를 찾을 때는 `O(n)`의 성능을 가진다.
- 그러므로 해시 테이블은 해시 함수의 역할이 매우 중요하다.

## 장점

- 빠른 데이터 읽기, 삽입, 삭제

## 단점

- 메모리를 많이 차지함
- 뛰어난 해시 함수의 구현은 필수

## 추상 자료형

- set - 데이터 삽입
- get - 데이터 읽기
- remove - 데이터 제거

## 구현

해시 테이블 데이터 구현을 이전과 마찬가지로 코드 한 줄 한 줄 살펴 보도록 하겠다. 목표는 글로만 읽고도 해당 자료구조를 이해할 수 있음으로 한다.

### HashData

가장 먼저 `HashData` `class`를 생성해준다.<br>
`key` 값은 중복이 가능하며 (나중에 `해시 함수`가 해당 데이터를 구분해준다) `value` 는 원하는 값을 넣어준다.<br><br>

```js
class HashData {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}
```

---

### HashTable

이후 `해시 테이블` 클래스를 생성해준다 가장 먼저 생성자 함수를 통해 `해시 테이블`을 만들어준다.

`해시 테이블` 은 배열을 이용하기 때문에 가장 먼저 빈 배열을 생성해준다.<br>
그리고 각 배열 요소에 `이중 연결리스트`를 생성해줘야 한다<br>
그러므로 해당 코드에서는 `0 ~ 9`까지의 `index` 값을 가진 배열을 만들고<br>
각 배열 요소에 `이중 연결리스트` 인스턴스를 할당 해준다.<br><br>

```js
class HashTable {
  constructor() {
    this.arr = [];
    for (let i = 0; i < 10; i++) {
      this.arr[i] = new DoublyLinkedList();
    }
  }
}
```

---

### hashFunction

그리고 해시 함수를 만들어 준다 해당 해시 테이블에서는 `key` 값을 `10`으로 나눈 나머지 값을 배열의 `index` 값에 할당한다. (만약 중복된 `key` 값을 가지면 연결리스트를 통해 연결 한다.)

```js
class HashTable {
  hashFunction(number) {
    return number % 10;
  }
}
```

---

### set()

그러면 각 배열 `index`의 할당된 `이중 연결리스트`에 알맞은 데이터를 넣는 `set()` 함수를 만들도록 하자<br>
`set(key, value)` 함수는 `key`와 `value`를 인자로 갖는데 `key` 값은 `해시 함수`에 의해 알맞은 값 (여기서는 `10`으로 나눈 나머지)으로 변경되어 그 값에 일치하는 `index`를 찾을 수 있게한다. 그리고 해당 `index`의 `이중 연결리스트`를 통해 `new HashData`를 통해 만들어진 `instance` 데이터를 삽입한다 (여기서는 항상 `head`값에 `data`를 넣는다.)<br><br>

아래의 코드를 살펴보면 `this.arr`는 현재 `0`부터 `9`까지 `이중 연결리스트`가 존재하는 상태다.<br>
만약 `key`값을 `21` `value`를 `21-a`라고 넣으면 key 값인 `21`이 해시 함수에 의해서 `1`을 리턴한다.<br>
그러면 `this.arr`의 `1`번쨰 `index`의 연결리스트를 가리키고 해당 `이중 연결리스트`에 원래의 key 값인 `21`과 `value`인 `21-a`를 넣은 `new HashData(21, "21-a")`값 즉 `{key:21, value: "21-a"}`이 할당된다.

```js
class HashTable {
  set(key, value) {
    this.arr[this.hashFunction(key)].insertAt(0, new HashData(key, value));
  }
}
```

이를 테이블로 표현하면
|index|data|
|---|---|
|0|DoublyLinkedList|
|1|DoublyLinkedList `{head: data:{key:21, value: "21-a"}; next:null; prev:null}`|
|2|DoublyLinkedList|
|3|DoublyLinkedList|
|5|DoublyLinkedList|
|6|DoublyLinkedList|
|7|DoublyLinkedList|
|8|DoublyLinkedList|
|9|DoublyLinkedList|

즉 어렵게 생각할 것 없이 이전에는 `head`의 `data`값에 단순한 `number`값이 들어갔다면 지금은 객체가 들어갔다.

---

### get()

그 다음으로 해당 데이터를 가져오는 `get(key)` 메서드를 구현해보자.

```js
class HashTable {
  get(key) {
    let currentNode = this.arr[this.hashFunction(key)].head;
    while (currentNode != null) {
      if (currentNode.data.key == key) {
        return currentNode.data.value;
      }
      currentNode = currentNode.next;
    }
    return null;
  }
}
```

가장 먼저 내가 넘겨준 `key` 값에 일치하는 `index` 자리를 찾기 위해 이전과 동일하게 `해시 함수`를 사용한다. `this.arr[this.hashFunction(key)]` 그리고 해당 위치의 `이중 연결리스트`의 `head` 값을 `currentNode` 변수에 할당한다.<br><br>

그리고 값을 찾을 때 까지 계속 반복하기 위해 `currentNode` 가 `null`이 될 때 까지 while 문을 통해 반복 해주고 `currentNode`의 `data`의 `key`값과 내가 넘긴 `key`값이 일치하면 해당 `currentNode`의 `data`의 `value`값을 `return` 해주고 그렇지 않을 경우 `currentNode` 값을 `currentNode.next` 값으로 옮겨준다.<br><br>

만약 찾는 값이 없다면 `null`을 리턴 해준다.

---

### remove()

마지막으로 `key`값이 일치하는 요소를 제거해주는 `remove` 메서드를 만들어주자 우선 `key` 값에 해당하는 배열의 `index`값을 해시 함수를 통해 찾는다 `let list = this.arr[this.hashFunction(key)];` 삭제는 `O(n)` 의 성능을 가지므로 `list.head`값을 `currentNode`에 할당해주고 삭제할 `index` 번호를 처음에 `0`으로 세팅해준다.

그리고 내가 넘긴 `key`값이 연결리스트의 `data`의 `key`값과 일치 할 때 까지 반복문을 돌리는데 해당 반복문은 `currentNode`가 `null`이 될 떄 까지 돌린다.

만약 그리고 `key` 값이 다르다면 `deletedIndex` 값을 `+1` 해준다. 그리고 일치한다면 이중 연결리스트의 `deleteAt` 메서드를 이용해 일치하는 `index`값의 요소를 삭제해준다.

```js
class HashTable {
  remove(key) {
    let list = this.arr[this.hashFunction(key)];
    let currentNode = list.head;
    let deletedIndex = 0;
    while (currentNode !== null) {
      if (currentNode.data.key == key) {
        return list.deleteAt(deletedIndex);
      }
      currentNode = currentNode.next;
      deletedIndex++;
    }
    return null;
  }
}
```

---
