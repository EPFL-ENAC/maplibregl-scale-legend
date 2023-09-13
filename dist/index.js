"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScaleLegendControl = void 0;
class ScaleLegendControl {
    constructor(scales, options) {
        this.scales = scales || [];
    }
    getDefaultPosition() {
        const defaultPosition = "top-right";
        return defaultPosition;
    }
    onAdd(map) {
        this.map = map;
        this.controlContainer = document.createElement("div");
        this.controlContainer.classList.add("maplibregl-ctrl");
        this.controlContainer.classList.add("maplibregl-ctrl-group");
        this.scaleButton = document.createElement("button");
        this.scaleButton.type = "button";
        this.scaleButton.classList.add("maplibregl-ctrl-icon");
        this.scaleButton.classList.add("scale-legend");
        this.scaleContainer = document.createElement("div");
        this.scaleContainer.classList.add("scale-list");
        for (const scale of this.scales) {
            const scaleElement = document.createElement("div");
            scaleElement.id = scale.id;
            scaleElement.title = scale.title || "";
            scaleElement.classList.add("scale", scale.id.replace(/[^a-z0-9-]/gi, '_'));
            const captionElement = document.createElement("div");
            captionElement.classList.add("scale-caption");
            if (scale.title) {
                const captionTitleElement = document.createElement("div");
                captionTitleElement.classList.add("scale-caption-title");
                captionTitleElement.innerHTML = scale.title;
                if (scale.unit) {
                    captionTitleElement.innerHTML += " (" + scale.unit + ")";
                }
                captionElement.appendChild(captionTitleElement);
            }
            if (scale.titleStart || scale.titleEnd) {
                const captionStartEndElement = document.createElement("div");
                if (scale.titleStart) {
                    const captionStartElement = document.createElement("span");
                    captionStartElement.classList.add("scale-caption-start");
                    captionStartElement.innerHTML = scale.titleStart;
                    captionStartEndElement.appendChild(captionStartElement);
                }
                if (scale.titleEnd) {
                    const captionEndElement = document.createElement("span");
                    captionEndElement.classList.add("scale-caption-end");
                    captionEndElement.innerHTML = scale.titleEnd;
                    captionStartEndElement.appendChild(captionEndElement);
                }
                captionElement.appendChild(captionStartEndElement);
            }
            scaleElement.appendChild(captionElement);
            for (const scaleEntry of scale.scale) {
                const entryElement = document.createElement("span");
                entryElement.classList.add("scale-entry");
                entryElement.style.backgroundColor = scaleEntry.color;
                let label = scaleEntry.label;
                if (label === undefined) {
                    if (scaleEntry.range) {
                        if (scaleEntry.range[0].length > 0 && scaleEntry.range[1].length > 0)
                            label = scaleEntry.range.join(" - ");
                        else if (scaleEntry.range[0].length > 0)
                            label = "> " + scaleEntry.range[0];
                        else if (scaleEntry.range[1].length > 0)
                            label = "< " + scaleEntry.range[1];
                    }
                }
                if (label !== undefined) {
                    if (scaleEntry.unit) {
                        label += " " + scaleEntry.unit;
                    }
                    else if (scale.unit) {
                        label += " " + scale.unit;
                    }
                }
                entryElement.title = label !== null && label !== void 0 ? label : "";
                entryElement.innerHTML = "&nbsp;";
                scaleElement.appendChild(entryElement);
            }
            this.scaleContainer.appendChild(scaleElement);
        }
        this.controlContainer.appendChild(this.scaleContainer);
        return this.controlContainer;
    }
    onRemove() {
        if (!this.controlContainer || !this.controlContainer.parentNode || !this.map || !this.scaleButton) {
            return;
        }
        this.controlContainer.parentNode.removeChild(this.controlContainer);
        this.map = undefined;
    }
    showScale(scaleId) {
        if (!this.scaleContainer) {
            return;
        }
        const scaleElements = this.scaleContainer.querySelectorAll("div");
        for (const scaleElement of Array.from(scaleElements)) {
            if (scaleElement.id === scaleId) {
                scaleElement.classList.add("active");
            }
            else {
                scaleElement.classList.remove("active");
            }
        }
    }
}
exports.ScaleLegendControl = ScaleLegendControl;
//# sourceMappingURL=index.js.map