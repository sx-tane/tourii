export interface RegionSelection {
    region: string;
    temperatureCelsius: number | undefined;
    weatherName: string | undefined;
    routeCount: number;
    isSelected: boolean;
}
