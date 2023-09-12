import type { ControlPosition, IControl, Map } from 'maplibre-gl'

export type ScaleDefinition = {
  id: string
  title?: string
  titleStart?: string
  titleEnd?: string
  unit?: string
  scale: ScaleEntryDefinition[]
}

export interface ScaleEntryDefinition {
  color: string
  label: string
  value?: number
  min?: number
  max?: number
  unit?: string
  range?: number[]
}

export type ScaleLegendOptions = {
  direction?: string
}

export class ScaleLegendControl implements IControl {
  
  private controlContainer: HTMLElement | undefined;
  private map?: Map;
  private scaleContainer: HTMLElement | undefined;
  private scaleButton: HTMLButtonElement | undefined;
  private scales: ScaleDefinition[];
  
  constructor(scales?: ScaleDefinition[], options?: ScaleLegendOptions | string) {
    this.scales = scales || [];
  }

  public getDefaultPosition(): ControlPosition {
    const defaultPosition = "top-right";
    return defaultPosition;
  }

  public onAdd(map: Map): HTMLElement {
    this.map = map;
    this.controlContainer = document.createElement("div");
    this.controlContainer.classList.add("maplibregl-ctrl");
    this.controlContainer.classList.add("maplibregl-ctrl-group");
    this.scaleContainer = document.createElement("div");
    this.scaleButton = document.createElement("button");
    this.scaleButton.type = "button";
    this.scaleContainer.classList.add("scale-list");
    for (const scale of this.scales) {
        const scaleElement = document.createElement("div");
        scaleElement.id = scale.id;
        scaleElement.title = scale.title || "";
        scaleElement.classList.add(scale.id.replace(/[^a-z0-9-]/gi, '_'));
        for (const scaleEntry of scale.scale) {
          const entryElement = document.createElement("span");
          entryElement.classList.add("scale-entry");
          entryElement.style.backgroundColor = scaleEntry.color;
          entryElement.innerText = "&nbsp;";
          scaleElement.appendChild(entryElement);
        }
        this.scaleContainer.appendChild(scaleElement);
    }
    this.scaleButton.classList.add("maplibregl-ctrl-icon");
    this.scaleButton.classList.add("scale-legend");

    this.controlContainer.appendChild(this.scaleButton);
    this.controlContainer.appendChild(this.scaleContainer);
    return this.controlContainer;
  }

  public onRemove(): void {
    if (!this.controlContainer || !this.controlContainer.parentNode || !this.map || !this.scaleButton) {
      return;
    }
    this.controlContainer.parentNode.removeChild(this.controlContainer);
    this.map = undefined;
  }

  public showScale(scaleId: string): void {
    if (!this.scaleContainer) {
      return;
    }
    const scaleElements = this.scaleContainer.querySelectorAll("div");
    for (const scaleElement of Array.from(scaleElements)) {
      if (scaleElement.id === scaleId) {
        scaleElement.classList.add("active");
      } else {
        scaleElement.classList.remove("active");
      }
    }
  }

}