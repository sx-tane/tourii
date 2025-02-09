class createIdGenerator {
    private routeNumber: number;
    private stopNumber: number;
    private destinationNumber: number;
    private chapterNumber: number;
    private chapterImageNumber: number;
    private prologueNumber: number;
    private storyId: number;
  
    constructor(
      routeStart: number,
      stopStart: number,
      destinationStart: number,
      chapterIdStart: number,
      chapterImageStart: number,
      prologueStart: number,
      storyIdStart: number
    ) {
      this.routeNumber = routeStart;
      this.stopNumber = stopStart;
      this.destinationNumber = destinationStart;
      this.chapterNumber = chapterIdStart;
      this.chapterImageNumber = chapterImageStart;
      this.prologueNumber = prologueStart;
      this.storyId = storyIdStart;
    }
  
    generateRouteDetailId(): string {
        return `RouteDetail ${++this.routeNumber}`;
      }
    
    generateStopId(): string {
    return `stop ${++this.stopNumber}`;
    }

    generateDestinationId(): string {
    return `destination${++this.destinationNumber}`;
    }

    generateBungoOnoChapterId(): string {
    return `bungoOnoChapterId${++this.chapterNumber}`;
    }

    generateChapterImageId(): string {
    return `chapter${++this.chapterImageNumber}.png`;
    }

    generatePrologueChapterId(): string {
        return `prologueChapterId${++this.prologueNumber}`;
    }

    generateStoryId(): string {
        return `storyId${++this.storyId}`;
    }
  }
  
  export default createIdGenerator;
  