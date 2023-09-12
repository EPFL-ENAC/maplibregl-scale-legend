import type { ControlPosition, IControl, Map } from 'maplibre-gl';
export type ScaleDefinition = {
    id: string;
    title?: string;
    titleStart?: string;
    titleEnd?: string;
    unit?: string;
    scale: ScaleEntryDefinition[];
};
export interface ScaleEntryDefinition {
    color: string;
    label: string;
    unit?: string;
    range?: string[];
}
export type ScaleLegendOptions = {
    direction?: string;
};
export declare class ScaleLegendControl implements IControl {
    private controlContainer;
    private map?;
    private scaleContainer;
    private scaleButton;
    private scales;
    constructor(scales?: ScaleDefinition[], options?: ScaleLegendOptions | string);
    getDefaultPosition(): ControlPosition;
    onAdd(map: Map): HTMLElement;
    onRemove(): void;
    showScale(scaleId: string | undefined): void;
}
