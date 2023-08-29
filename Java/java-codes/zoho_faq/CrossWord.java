package zoho_faq;

public class CrossWord {
    static char[][] crossWords = {
            { 'q', 'p', 'r', 'd' },
            { 'e', 'v', 'a', 'h' },
            { 'e', 'z', 'o', 'j' },
            { 'n', 'r', 'h', 'o' },
            { 'o', 'p', 'q', 'x' },
    };
    static int n = crossWords.length, m = crossWords[0].length;

    public static void main(String[] args) {
        System.out.println(checkFirstIndex("praveen"));
    }

    static boolean checkFirstIndex(String word) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (crossWords[i][j] == word.charAt(0) && isWordPresent(word, i, j, 0)) {
                    return true;
                }
            }
        }
        return false;
    }

    static boolean isWordPresent(String word, int row, int col, int level) {
        if (level == word.length()) {
            return true;
        } else if (row < 0 || col < 0 || row >= n || col >= m) {
            return false;
        } else if (crossWords[row][col] == word.charAt(level)) {
            char temp = crossWords[row][col];
            crossWords[row][col] = '#';
            boolean isMatch = isWordPresent(word, row + 1, col, level + 1)
                    || isWordPresent(word, row - 1, col, level + 1)
                    || isWordPresent(word, row, col + 1, level + 1)
                    || isWordPresent(word, row, col - 1, level + 1)
                    || isWordPresent(word, row + 1, col + 1, level + 1)
                    || isWordPresent(word, row - 1, col - 1, level + 1)
                    || isWordPresent(word, row + 1, col - 1, level + 1)
                    || isWordPresent(word, row - 1, col + 1, level + 1);

            crossWords[row][col] = temp;
            return isMatch;
        } else {
            return false;
        }
    }
}
