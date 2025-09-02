//  Time: O(N ^ 3)  ::  Space: O(1)


class Solution {
    numberOfPairs(points) {
        let count = 0;
        const n = points.length;

        for (let i = 0; i < n; i++) {
            const pointA = points[i];
            for (let j = 0; j < n; j++) {
                const pointB = points[j];
                if (i === j || !(pointA[0] <= pointB[0] && pointA[1] >= pointB[1])) {
                    continue;
                }
                if (n === 2) {
                    count++;
                    continue;
                }

                let isPresentInside = false;
                for (let k = 0; k < n; k++) {
                    if (k === i || k === j) continue;
                    const pointC = points[k];

                    const isXPresentInside = (pointC[0] >= pointA[0] && pointC[0] <= pointB[0]);
                    const isYPresentInside = (pointC[1] <= pointA[1] && pointC[1] >= pointB[1]);

                    if (isXPresentInside && isYPresentInside) {
                        isPresentInside = true;
                        break;
                    }
                }
                if (!isPresentInside) {
                    count++;
                }
            }
        }
        return count;
    }
}
