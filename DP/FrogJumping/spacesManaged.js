(main =_=> {

    const steps = [30, 10, 60, 10, 60, 80];
    let prev1 = 0, prev2 = Math.abs(steps[0] - steps[1]);

    for (let i = 2; i < steps.length; i++) {
        let step1 = prev2 + Math.abs(steps[i] - steps[i - 1]);
        let step2 = prev1 + Math.abs(steps[i] - steps[i - 2]);
        prev1 = prev2;
        prev2 = Math.min(step1, step2);
    }
    console.log(prev2);
})();