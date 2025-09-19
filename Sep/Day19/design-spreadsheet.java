import java.util.*;
import java.util.regex.*;

class Spreadsheet {
    private Map<String, Integer> cellMap;

    public Spreadsheet(int rows, boolean prepopulate) {
        cellMap = new HashMap<>();
        if (prepopulate) {
            for (int i = 1; i <= rows; i++) {
                for (char c = 'A'; c <= 'Z'; c++) {
                    String cell = "" + c + i;
                    cellMap.put(cell, 0);
                }
            }
        }
    }

    private List<String> extractTokens(String formula) {
        List<String> tokens = new ArrayList<>();
        Pattern pattern = Pattern.compile("[A-Z]+\\d+|\\d+");
        Matcher matcher = pattern.matcher(formula);
        while (matcher.find()) {
            tokens.add(matcher.group());
        }
        return tokens;
    }

    public void setCell(String cell, int value) {
        cellMap.put(cell, value);
    }

    public void resetCell(String cell) {
        if (cellMap.containsKey(cell)) {
            cellMap.put(cell, 0);
        }
    }

    public int getValue(String formula) {
        List<String> tokens = extractTokens(formula);
        return resolve(tokens.get(0)) + resolve(tokens.get(1));
    }

    private int resolve(String token) {
        if (token.matches("\\d+")) {
            return Integer.parseInt(token);
        }
        return cellMap.getOrDefault(token, 0);
    }
}
