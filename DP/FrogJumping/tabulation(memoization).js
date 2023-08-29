(main =_=> {

    // find the minimum possible way to the frog for jump
    const steps = [30, 10, 60, 10, 60, 50];
    const dp = new Array(steps.length).fill(0);
    dp[1] = Math.abs(steps[0] - steps[1]);

    for (let i = 2; i < steps.length; i++) {
        let step1 = dp[i - 1] + Math.abs(steps[i] - steps[i - 1]);
        let step2 = dp[i - 2] + Math.abs(steps[i] - steps[i - 2]);
        dp[i] = Math.min(step1, step2);
    }
    console.log(dp[steps.length - 1])
    console.log(dp);
})();