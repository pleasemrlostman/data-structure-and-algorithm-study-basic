function SelctionSort(arr) {

    for (let i = 0; i < arr.length - 1; i++) {
        let minValueIndex = i; 
        // 배열의 시작으로 0이 아닌 i를 넣어준 이유는 이 반복문을 한번 진행할 때 마다 최솟값이 하나 정렬되기 때문에
        // 정렬된 영역은 반복에서 제외하기 위한 것;
        // 즉 만약 [1, 4, 2, 3] 이란 배열에서 1은 정렬된거면 일단 [4, 2 ,3]을 돌아야하는대 이 때 minValueIndex는 1이란 의미
        for (let j = i + 1; j < arr.length; j++) {
            if(arr[j] < arr[minValueIndex]) {
                minValueIndex = j;
            }   
        }


        let temp = arr[i];
        arr[i] = arr[minValueIndex];
        arr[minValueIndex] = temp;

    }

}


let arr = [4, 2, 3, 1];

console.log("========== 정렬 전 ===========")
console.log(arr);

SelctionSort(arr);
console.log("========== 정렬 후 ===========")
console.log(arr)