# 병합 정렬

병합정렬은 재귀로 정렬하는 알고리즘<br>


## 정의
가장 먼저 `MergeSort` 함수를 만들어주면서 정렬할 배열이 담긴 매개변수 `arr`, 배열의 시작 인덱스를 나타내는 `leftIndex` 배열의 마지막 인덱스를 나타내는 `rightIndex`를 만들어줍니다. `leftIndex`와 `rightIndex`는 재귀로 호출할 때 필요한 매개변수이다.<br>

현 상황에서는 `[3, 5, 2, 4, 1, 7, 8, 6]` 에서 `leftIndex`는 `0` `rightIndex`는 `7`로 가정하자 우리는 `leftIndex`와 `rightIndex`가 같은 값일 때까지 즉 배열의 원소가 1개일 때 까지 분할하기 위해 if문을 넣어줍니다. 그러면 <br>

```js
function MergeSort(arr, leftIndex, rightIndex) {
    if(leftIndex < rightIndex) { // 이 부분이 기저 조건이 된다
        let midIndex = parseInt((leftIndex + rightIndex) / 2); // 배열의 index는 정수만 사용가능하기 떄문에 parseInT로 정수로 변환
            MergeSort(arr, leftIndex, midIndex);
            MergeSort(arr, midIndex + 1, rightIndex);
            Merge(arr, leftIndex, midIndex, rightIndex);
    }
}

// 위와 같은 코드가 구현된다. 정렬을 실제로 구현해주는 Merge 함수를 분석해 보도록 하자.

function Merge (arr, leftIndex, midIndex, rightIndex) {
    let leftAreaIndex = leftIndex // 가장 먼저 왼쪽 영역의 몇 번쨰까지 정렬됐는지 알려주는 leftAreaIndex를 만들어준다.
    let rightAreaIndex = midIndex + 1; // 마찬가지로 오른쪽 영역의 몇 번째까지 정렬됐는지 알려주는 rightAreaIndex를 만들어준다.

    let tempArr = []; // 이제 원본 배열과 길이가 똑같은 0으로 초기화된 배열을 만들어주겠다.
    tempArr.length = rightIndex + 1;
    tempArr.fill(0, 0, rightIndex + 1);

    let tempArrIndex = leftIndex;

    while(leftAreaIndex < midIndex && rightAreaIndex <= rightIndex) {
        if(arr[leftAreaIndex] <= arr[rightAreaIndex]) { // 왼쪽 영역의 데이터가 오른쪽 영역의 데이터보다 작다면
            tempArea[temArrIndex] = arr[leftAreaIndex++];  // 왼쪽 영역의 데이터를 tempArea에 넣어주고 leftAreaIndex을 +1
        } else {
            tempArea[temArrIndex] = arr[rightAreaIndex++]; // 그렇지 않다면 오른쪽 영역의 데이터를 temArea에 넣어주고      rightAreaIndex을 + 1
        }
        tempArrIndex++; // tempArrIndex도 넣어줬으니 tempArrIndex값도 1 올려준다. 
    }

    if(leftAreaIndex > minIndex) { // 오른쪽 영역을 넣어줘야 한다면 즉 왼쪽영역이 중간 이상 왔다면
        for(let i = rightAreaIndex; i <= rightIndex; i++) { // 반복문을 돌려 오른쪽 나머지를 tempArr에 넣어주고
            tempArr[tempArrIndex++] = arr[i];
        }
    } else { // 그 반대로 왼쪽영역을 넣어줘야하면
        for(let i = leftAreaIndex; i <= midIndex; i++) { // 왼쪽영역의 나머지를 즉 minIndex값 전까지를 
            tempArr[tempArrIndex++] = arr[i]; // tempArr에 넣어준다.
        }
    }

    // 마지막으로 tempArr에 있는 데이터를 arr에 옮겨주면 된다.
    for(let i = leftIndex; i<= rightIndex; i++) {
        arr[i] = tempArr[i];
    }

}


```



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
