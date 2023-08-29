const findBestWay = (ind, steps, dp) => {
    if (ind === 0) {
        return ind;
    }
    if (dp[ind] !== -1) {
        return dp[ind];
    }
    let left = findBestWay(ind - 1, steps, dp) + Math.abs(steps[ind] - steps[ind - 1]);
    let right = 123456789;
    if (ind > 1) {
        right = findBestWay(ind - 2, steps, dp) + Math.abs(steps[ind] - steps[ind - 2]);
    }
    return dp[ind] = Math.min(left, right);
}

(() => {

    const steps = [30, 10, 60, 10, 60];
    const dp = new Array(steps.length).fill(-1);

    console.log(findBestWay(steps.length - 1, steps, dp));
})();