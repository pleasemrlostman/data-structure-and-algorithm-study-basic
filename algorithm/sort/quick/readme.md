# 퀵 정렬

## 정의

### 구현 설명
퀵 정렬은 이전에 알아본 병합 정렬과 같이 분할 정복 알고리즘에 속합니다.<br>
그러므로 당연히 재귀를 사용합니다.<br>

만약 `[5, 3, 7, 2, 6, 4, 9, 1, 8]` 같이 정렬이 되지 않은 배열이 있다고 가정해보자.<br>
퀵 정렬에서는 정렬하기 전에 배열에 있는 숫자중 하나를 `피벗`으로 설정해줍니다.<br>

피벗을 선택하는 방법은 여러 가지가 있는데 여기서는 쉬운 이해를 위해서 배열의 가장 왼쪽에 있는 값을 피벗으로 설정해주겠습니다.<br>
지금 이 배열에서 피벗은 `5`입니다. 그리고 배열의 시작과 끝을 가리키는 `left`와 `right`가 있습니다.<br>
배열의 시작 인덱스는 `5`가 들어있는 `0번 인덱스`입니다. 배열의 끝인 `right`는 `8`이 들어있는 `8번 인덱스` 입니다.<br>
마지막으로 하나만 더 추가하면 피벗을 제외한 배열의 양쪽에서 값을 비교하기 위한 변수가 필요합니다.<br>
왼쪽에서 오른쪽으로 이동하는 변수를 `leftStartIndex`라고하고, 오른쪽에서 왼쪽으로 이동하는 변수를 `rightStartIndex`라고 하자.<br>
이제 퀵 정렬을 진행할 준비가 끝났다. 가장먼저 `leftStartIndex`가 이동한다.<br>
하지만 조건이 있다. `leftStartIndex`는 오른쪽으로 이동하다가 피벗보다 큰 값을 만나면 첨춘다<br>
해당 배열에서는 `7`이 `5`보다 크니까 멈추고 이제 `rightStartIndex`가 움직일 차례이다 `rightStartIndex`는 왼쪽으로 이동하다가 피벗보다 작은 값을 만나면 멈춘다.<br>
`leftStartIndex`와 `rightStartIndex`가 멈추면 이 둘의 값을 교환해줍니다. 그리고 다시 `leftStartIndex`가 이동합니다.<br>
그러면 `6이` 피벗인 `5`보다 크기 때문에 멈추고 다시 `rightStartIndex`가 움직이면 `4`는 피벗인  `5보다` 작기 때문에 멈춘다.<br>
그리고 값을 교환해준다. 그리고 두 값을 교환해준다. 그리고 다시 `leftStartIndex`가 이동한다. `6`이 피벗인 `5`보다  크기 때문에 멈춘다.<br>
이제 `rightStartIndex`가 이동합니다. `4`는 피벗인 `5`보다 작기 때문에 멈췄다.<br>
`leftStartIndex`와 `rightStartIndex`가 서로의 방향으로 이동하다 보면 결국엔 서로 지나치게 된다. 그럼 더 이상 이동하지 않고 멈춘다. `leftStartIndex`는 `rightStartIndex`의 오른쪽에 있게되고 `rightStartIndex`는 `leftStartIndex`의 왼쪽에 있게 됩니다. 이 상태에서 피벗과 `rightStartIndex`의 값을 교환해줍니다.<br>
그러면 `5`를 기준으로 왼쪽에 있는 값들은 전부 `5`보다 작은 값이고 오른쪽에 있는 값들은 전부 `5`보다 큰 값입니다. 즉 다른 숫자는 몰라도 `5`는 정렬이 된거임 그러면 `5`를 기준으로 왼쪽의 배열을 지금과 똑같은 방식으로 진행하고 `5`를 기준으로 있는 오른쪽 값들도 똑같은 방식으로 진행하면 모든 값들이 정렬된다.<br>

퀵 정렬은 이렇게 한 번 진행될 떄마다 피벗이 정렬되고 정렬된 배열을 좌우로 나눠서 같은 방식으로 재귀호출 해 모든 배열을 정렬합니다.

## 구현

```js
function quickSort(arr, left, right) {
    if(left <= right) {
        let pivot = divide(arr, left, right); // 정렬된 피벗의 위치를 리턴 값이 아니라 위치의 index다
        quickSort(arr, left, pivot - 1)
        quickSort(arr, pivot + 1, right)
    }
}

function divide(arr, left, right) {
    let pivot = arr[left];
    let leftStartIndex = left + 1;
    let rightStartIndex = right;
    while (leftStartIndex <= rightStartIndex) {
        while(leftStartIndex <= right && pivot >= arr[leftStartIndex]) {
            leftStartIndex++
        }
        while (rightStartIndex >= (left + 1) && pivot <= arr[rightStartIndex]) {
            rightStartIndex--
        }

        if(leftStartIndex <= rightStartIndex) {
            swap(arr, leftStartIndex, rightStartIndex);
        }
    }

    swap(arr, left, rightStartIndex);
    return rightStartIndex;
}

function swap(arr, index1, index2) {
    let temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp;
}
```

## 성능

퀵 정렬은 피벗을 기준으로 배열을 반으로 나눕니다. 즉 데이터가 한 개가 될 때까지 반으로 나누므로 `logn` 성능<br>
그리고 이렇게 나뉘어진 배열을 원소 수 n만큼 진행해야 하니 n을 곱해서 `nlongn`입니다.<br>
피벗이 매번 배열을 반으로 가르는 경우는 `θ(nlogn)`<br>
하지만 이 성능은 평균적인 경우를 나타냅니다. 최악의 경우는 피벗이 중간이 아닌 한쪽으로 치우친 경우로 `O(n^2)`의 성능 보일 수도 있다.<br>그래서 최악의 경우를 표현하자면 `O(n^2)`이다.<br>
하지만 퀵 정렬은 대부분의 경우 좋은 피벗을 선택하고 최악의 경우가 발생할 확률이 극히 낮아서 평균적인 성능을 말합니다.<br>
따라서 퀵 정렬은 `θ(nlogn)`의 성능을 가진다.<br>
성능만 보면 병합 정렬이 더 좋다고 볼 수 있는데 실제로 병합 정렬과 비교하면 퀵 정렬이 더 적은 비교와 더 적은 메모리 공간을 차지하기 때문에 더 좋은 알고리즘으로 평가 받는다.

## 장단점
|장점|단점|
|--|--|
|재귀적인 기법으로 이해하기가 조금 어렵다.|성능이 `θ(nlogn)` 이전의 정렬보다 좋다.|
