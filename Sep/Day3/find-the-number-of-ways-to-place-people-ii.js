//  Time: O(N ^ 2)  ::  Space: O(1)
/**
 * @param {number[][]} points
 * @return {number}
 */
// TC: O(N^2)
var numberOfPairs = function(points) {
    points.sort((a, b) => {
        if (a[0] !== b[0]) {
            return a[0] - b[0];
        }
        return b[1] - a[1];
    });

    let count = 0;
    for (let i = 0; i < points.length; i++) {
        let xMaxLimit = Infinity;
        let yMinLimit = -Infinity;

        for (let j = i + 1; j < points.length; j++) {
            if (
                points[j][0] >= points[i][0] &&
                points[j][0] < xMaxLimit &&
                points[j][1] <= points[i][1] &&
                points[j][1] > yMinLimit
            ) {
                count++;
                xMaxLimit = points[j][0];
                yMinLimit = points[j][1];
            }
        }
    }
    return count;
};

// Example usage:
const points = [[1,1],[2,2],[3,3]];
console.log("Number of pairs:", numberOfPairs(points));