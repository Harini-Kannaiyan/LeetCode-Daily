import java.util.*;

class FoodRatings {
    static class Pair {
        int rating;
        String cuisine;
        Pair(int r, String c) { rating = r; cuisine = c; }
    }

    Map<String, Pair> foodMap; // food -> (rating, cuisine)
    Map<String, PriorityQueue<String>> cuisineMap; // cuisine -> heap of foods

    public FoodRatings(String[] foods, String[] cuisines, int[] ratings) {
        foodMap = new HashMap<>();
        cuisineMap = new HashMap<>();

        for (int i = 0; i < foods.length; i++) {
            String food = foods[i], cuisine = cuisines[i];
            int rating = ratings[i];
            foodMap.put(food, new Pair(rating, cuisine));

            cuisineMap.putIfAbsent(cuisine, new PriorityQueue<>((a, b) -> {
                int r1 = foodMap.get(a).rating, r2 = foodMap.get(b).rating;
                if (r1 != r2) return r2 - r1; // higher rating first
                return a.compareTo(b); // lexicographically smaller first
            }));
            cuisineMap.get(cuisine).offer(food);
        }
    }

    public void changeRating(String food, int newRating) {
        Pair p = foodMap.get(food);
        p.rating = newRating;
        String cuisine = p.cuisine;
        cuisineMap.get(cuisine).offer(food); // lazy insert
    }

    public String highestRated(String cuisine) {
        PriorityQueue<String> heap = cuisineMap.get(cuisine);
        while (!heap.isEmpty()) {
            String topFood = heap.peek();
            Pair p = foodMap.get(topFood);
            boolean valid = true;
            for (String candidate : heap) {
                Pair q = foodMap.get(candidate);
                if ((q.rating > p.rating) || 
                    (q.rating == p.rating && candidate.compareTo(topFood) < 0)) {
                    valid = false;
                    break;
                }
            }
            if (valid) return topFood;
            heap.poll();
        }
        return "";
    }
}
