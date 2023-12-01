# 병합 정렬

병합정렬은 재귀로 정렬하는 알고리즘<br>


## 구현

```js
function MergeSort(arr, leftIndex, rightIndex) {
    //  배열의 시작 인덱스를 나타내는 leftIndex
    //  배열의 마지막 인덱스를 나타내는 rightIndex를 만들어 줍니다.
    //  leftIndex와 rightIndex는 재귀를 호출 할 때 필요하다.
    if(leftIndex < rightIndex) {
        let midIndex = parseInt((leftIndex + rightIndex) / 2);
            MergeSort(arr, leftIndex, midIndex);
            MergeSort(arr, midIndex + 1, rightIndex);
            Merge(arr, leftIndex, midIndex, rightIndex);
    }
}


function Merge(arr, leftIndex, midIndex, rightIndex) {
    let leftAreaIndex = leftIndex;
    let rightAreaIndex = midIndex + 1;

    let tempArr = [];
    tempArr.length = rightIndex + 1;
    tempArr.fill(0, 0, rightIndex + 1);

    let tempArrIndex = leftIndex;
    while (leftAreaIndex <= midIndex && rightAreaIndex <= rightIndex) {
        if(arr[leftAreaIndex] <= arr[rightAreaIndex]) {
            tempArr[tempArrIndex] = arr[leftAreaIndex++]; 
        } else {
            tempArr[tempArrIndex] = arr[rightAreaIndex++]; 
        }
        tempArrIndex++
    }

    if(leftAreaIndex > midIndex) {
        for (let i = rightAreaIndex; i <= rightIndex; i++) {
            tempArr[tempArrIndex++] = arr[i]
        }
    } else {
        for (let i = leftAreaIndex; i <= midIndex; i++) {
            tempArr[tempArrIndex++] = arr[i]
        }
    }

    for (let i = leftIndex; i <= rightIndex; i++) {

        arr[i] = tempArr[i]
        
    }

}
```

## 성능

병합정렬에서 성능을 평가하는 부분은 `Merge()` 함수 내 흩어진 배열을 합치는 부분입니다.<br>
```js
    while (leftAreaIndex <= midIndex && rightAreaIndex <= rightIndex) {
        if(arr[leftAreaIndex] <= arr[rightAreaIndex]) {
            tempArr[tempArrIndex] = arr[leftAreaIndex++]; 
        } else {
            tempArr[tempArrIndex] = arr[rightAreaIndex++]; 
        }
        tempArrIndex++
    }
```
하나의 데이터와 하나의 데이터가 두 개로 합쳐질 때 비교 연산을 두 번 합니다.<br>
마찬가지로 두 개의 데이터와 두 개의 데이터가 네 개로 합쳐질 때는 비교가 네 번 이루어진다.<br>
각 단계를 거칠 때 마다 영역의 수가 반으로 줄기 때문에 `logn`으로 말할 수 있다.<br><br>

분할된 배열을 병합할 때는 `n`개의 데이터를 `n`번 비교하므로 `n`과 `logn`을 곱해서 `O(nlogn)`의 성능이 나온다.

## 장단점
|장점|단점|
|--|--|
|재귀적인 기법으로 이해하기가 조금 어렵다.|성능이 `O(nlogn)` 이전의 정렬보다 좋다.|
