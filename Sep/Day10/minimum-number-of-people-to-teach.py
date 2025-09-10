#  Time: O(M * N)  ::  Space: O(M + N)
class Solution:
    def minimumTeachings(self, n: int, languages: List[List[int]], friendships: List[List[int]]) -> int:
        intersectionOfLang = set()
        
        for friendship in friendships:
            langMap = {}
            isCommon = False
            for lang in languages[friendship[0]-1]:
                langMap[lang] = 1
            for lang in languages[friendship[1]-1]:
                if lang in langMap:
                    isCommon = True
                    break
            if not isCommon:
                intersectionOfLang.add(friendship[0]-1)
                intersectionOfLang.add(friendship[1]-1)
        
        maxPeopleKnownLang = 0
        countOfPeopleKnownLang = [0]*(n+1)

        for friendship in intersectionOfLang:
            for lang in languages[friendship]:
                countOfPeopleKnownLang[lang]+=1
                maxPeopleKnownLang = max(countOfPeopleKnownLang[lang], maxPeopleKnownLang)
        
        return len(intersectionOfLang) - maxPeopleKnownLang
        
        