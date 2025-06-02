## 2025-05-28
Model Route Response Dto
```json
{
    "modelRouteId": "MRT202505-b006c5-262350-06b2f5-BAAA",
    "storyId": "STO202505-6a6c20-262350-662aeb-BAAA",
    "routeName": "The Awakening Route",
    "region": "Bungo Ono",
    "regionLatitude": 32.9783415,
    "regionLongitude": 131.5843317,
    "regionBackgroundMedia": "/video/bungo-ono.mp4",
    "regionWeatherInfo": {
        "touristSpotName": "Bungo Ono",
        "temperatureCelsius": 14.68,
        "weatherName": "Clouds",
        "weatherDesc": "broken clouds"
    },
    "delFlag": false,
    "insUserId": "admin",
    "insDateTime": "20250526 23:50",
    "updUserId": "admin",
    "updDateTime": "20250526 23:50"
}
```
### TODO
  - [x] list need to show out how many tourist spot, style just all same like story, but just different color then is ok
  - [ ] Clear, Clouds, Rain, Drizzle, Thunderstorm, Snow for weatherName
  - [ ] use lucide react and create helper for it
  - [ ] Region page only shows the region name, region background media, region weather info

## 2025-05-29
- [x] Done basic logic of region page
- [x] list need to show out how many tourist spot, style just all same like story, but just different color then is ok

## 2025-05-31
### TODO
- [X] Add the Quest Response Dto
- [X] Change the Proceed Button to Read Now Button (Standardize)
- [X] Clear, Clouds, Rain, Drizzle, Thunderstorm, Snow for weatherName
  - [X] A helper function to convert weatherName to weather icon
  - [X] use lucide react and create helper for it
    - [X] Clear, Clouds, Rain, Drizzle, Thunderstorm, Snow for weatherName
- [X] Redesign and match the style with story page

## 2025-06-01
- [X] Add route page the folder path is [region]/page.tsx
- [ ] Add model route selection page
      - [X] Pass the data from the region page to the model route selection page
      - [X] Split Component based on the sample image
      - [X] Check is the properties for model route is enough

## 2025-06-02
- [ ] Animation for Model Route Selection Page
      - [X] Make the animation expand work
      - [X] Only Image Expand and not word expand
      - [X] Fix the Route Card first
      - [X] Create Location Info

## 2025-06-03
- [ ] Navigation Banner to change the route card
- [ ] Phone Size
- [ ] Release PR