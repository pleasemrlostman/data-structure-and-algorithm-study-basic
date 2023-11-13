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