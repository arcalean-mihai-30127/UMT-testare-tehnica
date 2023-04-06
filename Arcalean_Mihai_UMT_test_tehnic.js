function splitArray(A) {
  
  // Get the length of the array.
  const len = A.length;

  // Initialize variables to keep track of the current sum and count.
  let currSum = 0;
  let currCount = 0;

  // Initialize a Set to store already visited states of startIndex, targetSum and targetCount.
  const memo = new Set();

  // Define a recursive function to check if the array can be split into equal parts.
  function canSplit(startIndex, targetSum, targetCount) {
    
    // Base case: if targetCount is 0, return true if targetSum is also 0.
    if (targetCount === 0) {
      return targetSum === 0;
    }
    
    // Check if the current state of startIndex, targetSum and targetCount has already been visited.
    if (memo.has(startIndex + "," + targetSum + "," + targetCount)) {
      return false;
    }

    // Iterate through the array starting from the given startIndex.
    for (let i = startIndex; i < len; i++) {
      currSum += A[i];
      currCount++;

      // If the current sum and count match the target sum and count, return true.
      if (currSum === targetSum && currCount === targetCount) {
        return true;
      }

      // If the current sum is less than the target sum and the current count is less than the target count,
      // recursively call the function with the next index and the same target sum and count.
      if (currSum < targetSum && currCount < targetCount) {
        const result = canSplit(i + 1, targetSum, targetCount);
        if (result) {
          return true;
        }
      }

      // Backtrack by subtracting the current element from the current sum and count.
      currSum -= A[i];
      currCount--;
    }

    // Add the current state to the set of visited states.
    memo.add(startIndex + "," + targetSum + "," + targetCount);
    return false;
  }

  // Get the total sum of the array elements.
  const totalSum = A.reduce((acc, val) => acc + val, 0);

  // If the total sum is odd, the array cannot be split into equal parts.
  if (totalSum % 2 !== 0) {
    return false;
  }

  // Iterate through all possible counts of the first part of the split.
  for (let i = 1; i < len; i++) {
    
    // If the total sum multiplied by i is not divisible by the length of the array, skip to the next iteration.
    if ((totalSum * i) % len !== 0) {
      continue;
    }
    
    // Calculate the target sum for the first part of the split.
    const targetSum = (totalSum * i) / len;
    
    // Call the canSplit function to check if the array can be split into parts with the given target sum and count.
    if (canSplit(0, targetSum, i)) {
      // If the array can be split, calculate the sum and count of the second part of the split,
      // and check if the average of the two parts is the same.
      const otherSum = totalSum - targetSum;
      const otherCount = len - i;
      const avg1 = targetSum / i;
      const avg2 = otherSum / otherCount;
      return avg1 === avg2;
    }
  }

  // If no split is possible, return false.
  return false;
}
console.log(splitArray([1,2,3,4,5,6,7,8]));
  