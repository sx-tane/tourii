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

### TODO
- [ ] Clear, Clouds, Rain, Drizzle, Thunderstorm, Snow for weatherName
  - [ ] A helper function to convert weatherName to weather icon
  - [ ] use lucide react and create helper for it
    - [ ] Clear, Clouds, Rain, Drizzle, Thunderstorm, Snow for weatherName
- [ ] Redesign and match the style with story page