class Solution {
  longestPalin(S) {
    let longest_S = "";
    let longest = 0;

    for (let i = 0; i < S.length; i++) {
      for (let j = i; j < S.length; j++) {
        let test_S = S.substring(i, j + 1);

        if (this.check_Palindrome(test_S)) {
          if (test_S.length > longest) {
            longest = test_S.length;
            longest_S = test_S;
          }
        }
      }
    }

    return longest_S;
  }

  check_Palindrome(S) {
    const Sarr = S.split("");
    const Rarr = [...Sarr].reverse().join("");

    if (RS === S) {
      return true;
    }

    return false;
  }
}
