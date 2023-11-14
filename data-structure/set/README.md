# Set

## 정의

- 데이터의 중복을 허용하지 않는 자료구조
- 해시 테이블을 이용한다고 해서 해시 셋 이라고도 부른다.
- 셋은 해시 테이블의 `value` 값은 사용하지 않고 `key`만 사용해서 구현합니다.
  - `key` 가 `key`임과 동시에 데이터로 사용

## 추상자료형

- add(data) - 데이터 삽입
- isContain(data) - 데이터 체크
- remove(data) - 데이터 제거
- clear() - 셋 비우기
- isEmpty() - 셋이 비었는지 체크
- printAll() - 모든 데이터 출력

## 구현

해시 셋 구현을 이전과 마찬가지로 코드 한 줄 한 줄 살펴 보도록 하겠다. 목표는 글로만 읽고도 해당 자료구조를 이해할 수 있음으로 한다.

---

### constructor

`해시 테이블`을 이용해서 구현하기 때문에 `해시 테이블` 인스턴스를 할당해주도록 하자.

```js
class HashSet {
  constructor() {
    this.hashTable = new HashTable();
  }
}
```

---

### add()

`해시 셋`의 `add`의 인자 `data` 는 `해시 테이블`의 `key`값이라고 생각하자. 만약 해당 하는 값이 있으면 값을 추가하지않고 값이 없을 때만 데이터를 추가 한다

```js
class HashSet {
  add(data) {
    if (this.hashTable.get(data) == null) {
      this.hashTable.set(data, -1);
    }
  }
}
```

---

### isContain()

해당 값이 `set`에 있는지 확인하는 메서드이다. 마찬가지로 `hashTable.get(data)`를 이용하도록 하자

```js
class HashSet {
  isContain(data) {
    return this.hashTable.get(data) !== null;
  }
}
```

---

### remove()

제거 역시 `해시 테이블`의 `remove` 메서드를 이용하고 지우고 싶은 값을 넘기면 된다. (여기서는 `index` 값을 찾아 해당 `index`에 해당하는 값을 지울 것이다.)

```js
class HashSet {
  remove(data) {
    this.hashTable.remove(data);
  }
}
```

---

### clear()

`set` 을 전부 삭제하는 `clear` 메서드는 각 `index`에 할당된 `이중 연결리스트`를 삭제하는 `clear` 메서드를 반복문을 통해 사용해주면 된다. (`index` 값에 할당된 값이 `이중 연결리스트` 이므로 `head` 값만 삭제해줘도 `이중 연결리스트`가 비어버리게 된다.)

```js
class HashSet {
  clear() {
    for (let i = 0; i < this.hashTable.arr.length; i++) {
      this.hashTable.arr[i].clear();
    }
  }
}
```

---

### isEmpty()

`set`이 비어있는지 확인하는 메서드이다. 처음에 `empty`값을 `true`로 할당하고 각 index에 할당된 이중 연결리스트에 `count` 값이 `0` 이상인지 확인하고 이상이라면 `empty` 값을 false로 바꾸고 해당 값을 `return` 해준다.

```js
class HashSet {
  isEmpty() {
    let empty = true;
    for (let i = 0; i < this.hashTable.arr.length; i++) {
      if (this.hashTable.arr[i].count > 0) {
        empty = false;
        break;
      }
    }

    return empty;
  }
}
```

---

### printAll()

요소의 모든 값들을 (여기서는 각 `index`의 할당된 `이중 연결리스트`의 `head`값이다 왜냐하면 `set` 자료 구조는 중복을 허용하지 않기 때문이다.)

`해시 테이블`의 `length` 값 만큼 반복문을 돌려주고 해당 `해시 테이블`의 `이중 연결리스트`의 `head` 값을 `currentNode`로 할당 해주고 `currentNode.data.key` 값을 콘솔로 찍어준다

```js
class HashSet {
  printAll() {
    for (let i = 0; i < this.hashTable.arr.length; i++) {
      let currentNode = this.hashTable.arr[i].head;
      while (currentNode !== null) {
        console.log(currentNode.data.key);
        currentNode = currentNode.next;
      }
    }
  }
}
```

---
