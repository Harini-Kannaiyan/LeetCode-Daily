#include <bits/stdc++.h>
using namespace std;

class FoodRatings {
    unordered_map<string, pair<int, string>> foodMap; // food -> {rating, cuisine}
    unordered_map<string, priority_queue<pair<int, string>>> cuisineMap; // cuisine -> maxHeap {(-rating, food)}

public:
    FoodRatings(vector<string>& foods, vector<string>& cuisines, vector<int>& ratings) {
        for (int i = 0; i < foods.size(); i++) {
            string food = foods[i], cuisine = cuisines[i];
            int rating = ratings[i];
            foodMap[food] = {rating, cuisine};
            cuisineMap[cuisine].push({-rating, food}); // min-heap trick: negative rating
        }
    }

    void changeRating(string food, int newRating) {
        auto [oldRating, cuisine] = foodMap[food];
        foodMap[food] = {newRating, cuisine};
        cuisineMap[cuisine].push({-newRating, food}); // lazy push
    }

    string highestRated(string cuisine) {
        auto &heap = cuisineMap[cuisine];
        while (!heap.empty()) {
            auto [negRating, food] = heap.top();
            int actualRating = foodMap[food].first;
            if (-negRating == actualRating) return food;
            heap.pop(); // stale entry
        }
        return "";
    }
};
