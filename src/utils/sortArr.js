export function quickSort(arr, name, name2, snum) {
    // 如果数组<=1,则直接返回
    if (arr.length <= 1) {
        return arr;
    }
    let pivotIndex = Math.floor(arr.length / 2);
// 找基准，并把基准从原数组删除
    let pivot = arr.splice(pivotIndex, 1)[0];
    let middleNum = pivot[name] || pivot[name2];
// 定义左右数组
    let left = [];
    let right = [];
//  比基准小的放在left，比基准大的放在right
    if (snum) {
        for (let i = 0; i < arr.length; i++) {
            if (Number(arr[i][name]) >= Number(middleNum) || Number(arr[i][name2]) >= Number(middleNum)) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
    } else {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j][name] >= middleNum || arr[j][name2] >= middleNum) {
                left.push(arr[j]);
            } else {
                right.push(arr[j]);
            }
        }
    }
// 递归,返回所需数组
    return quickSort(left, name, name2, snum).concat([pivot], quickSort(right, name, name2, snum));
};
