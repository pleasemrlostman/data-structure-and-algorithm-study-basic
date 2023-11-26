function InsertionSort(arr) {

    for (let i = 1; i < arr.length; i++) { // i가 1부터 시작하는 이유는 0번째 인덱스는 정렬 됐다고 보기때문에
        let inseringData = arr[i]; // 정렬되지 않은 데이터의 가장 첫번째 데이터     
        let j
        for(j = i - 1; j >= 0; j--){
            if(arr[j] > inseringData) {
                arr[j + 1] = arr[j];
            } else {
                break;
            }
        }
        arr[j + 1] = inseringData
    }   
}



let arr = [4, 1, 5, 3, 6, 2];

console.log("========== 정렬 전 ===========")
console.log(arr);

InsertionSort(arr);
console.log("========== 정렬 후 ===========")
console.log(arr)