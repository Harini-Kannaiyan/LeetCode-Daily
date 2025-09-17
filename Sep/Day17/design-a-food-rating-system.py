class FoodRatings:

    def __init__(self, foods: List[str], cuisines: List[str], ratings: List[int]):
        self.foodMap = {}  # food -> (rating, cuisine)
        self.cuisineMap = defaultdict(list)  # cuisine -> max heap [(-rating, food)]

        for i in range(len(foods)):
            food, cuisine, rating = foods[i], cuisines[i], ratings[i]
            self.foodMap[food] = (rating, cuisine)
            heapq.heappush(self.cuisineMap[cuisine], (-rating, food))  # maxHeap
        

    def changeRating(self, food: str, newRating: int) -> None:
        oldRating, cuisine = self.foodMap[food]
        # update foodMap
        self.foodMap[food] = (newRating, cuisine)
        # push new rating into cuisine heap (lazy update)
        heapq.heappush(self.cuisineMap[cuisine], (-newRating, food))
            
        

    def highestRated(self, cuisine: str) -> str:
        heap = self.cuisineMap[cuisine]
        # Lazy deletion: pop until the top matches the actual rating
        while heap:
            rating, food = heap[0]
            if -rating == self.foodMap[food][0]:  # valid entry
                return food
            heapq.heappop(heap)  # discard stale entry
        


# Your FoodRatings object will be instantiated and called as such:
# obj = FoodRatings(foods, cuisines, ratings)
# obj.changeRating(food,newRating)
# param_2 = obj.highestRated(cuisine)